/**
 * CompanyController - 負責接收事件、調度 Model 與 View 渲染的 Controller
 */
class CompanyController {
    constructor(model, companyView, threeView, dnaView, hudView, uiView) {
        this.model = model;
        this.companyView = companyView;
        this.threeView = threeView;
        this.dnaView = dnaView;
        this.hudView = hudView;
        this.uiView = uiView;
    }

    /**
     * 初始化系統並綁定視圖與事件
     */
    async init() {
        // 初始化次視圖
        this.uiView.init();
        this.dnaView.init();
        this.threeView.init();

        // 監聽 Model 狀態變更事件，進行資料卡重繪
        this.model.addChangeListener(() => {
            this.handleModelChange();
        });

        // 讀取遠端 API
        this.hudView.setSearchingState();
        const loadResult = await this.model.loadCompanies();
        if (loadResult.success) {
            this.companyView.showToast("成功載入即時雲端數據庫");
        } else {
            this.companyView.showToast("載入資料庫失敗：" + loadResult.error);
        }

        // 獲取所有地區與分類，填充篩選下拉選單
        const allData = this.model.getAllCompanies();
        const cities = [...new Set(allData.map(c => c.city))].filter(Boolean).sort();
        const categories = [...new Set(allData.map(c => c.category))].filter(Boolean).sort();

        this.companyView.populateFilters(
            cities,
            categories,
            (loc) => this.model.setFilter('location', loc),
            (cat) => this.model.setFilter('category', cat)
        );

        // 首次畫面繪製
        this.handleModelChange();
        this.uiView.renderMarketInsights(
            allData,
            this.companyView.formatCapital.bind(this.companyView),
            this.companyView.formatPercent.bind(this.companyView),
            this.companyView.formatSalary.bind(this.companyView)
        );

        // 綁定 DOM 事件
        this.bindEvents();
    }

    /**
     * Model 異動時的重新渲染回呼
     */
    handleModelChange() {
        const filteredData = this.model.getFilteredAndSortedCompanies();
        this.companyView.renderCompanies(filteredData);
    }

    /**
     * 綁定使用者交互事件
     */
    bindEvents() {
        const bioSearch = document.getElementById('bioSearch');
        const listSearch = document.getElementById('listSearch');
        const sortButtons = document.querySelectorAll('.sort-options button');
        const sortDirectionBtn = document.getElementById('sortDirectionBtn');

        // 搜尋輸入框即時篩選
        if (bioSearch) {
            bioSearch.addEventListener('input', (e) => {
                this.model.setFilter('search', e.target.value.trim());
                if (listSearch) listSearch.value = e.target.value.trim();
            });
        }
        if (listSearch) {
            listSearch.addEventListener('input', (e) => {
                this.model.setFilter('search', e.target.value.trim());
                if (bioSearch) bioSearch.value = e.target.value.trim();
            });
        }

        // 診斷分析按鈕點選事件
        const analyzeBtn = document.getElementById('analyzeBtn');
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => {
                const query = bioSearch ? bioSearch.value.trim() : '';
                this.runAISimulation(query);
            });
        }

        // 排序按鈕群組事件
        sortButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                sortButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.model.setFilter('sortBy', btn.dataset.sort);
            });
        });

        // 排序升降冪切換事件
        if (sortDirectionBtn) {
            sortDirectionBtn.addEventListener('click', () => {
                const currentFilters = this.model.getFilters();
                const newDir = currentFilters.sortDir === 'desc' ? 'asc' : 'desc';
                sortDirectionBtn.setAttribute('data-dir', newDir);

                // 更新 Lucide 圖示
                if (newDir === 'asc') {
                    sortDirectionBtn.innerHTML = '<i data-lucide="arrow-up-narrow-wide"></i>';
                } else {
                    sortDirectionBtn.innerHTML = '<i data-lucide="arrow-down-narrow-wide"></i>';
                }
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }

                this.model.setFilter('sortDir', newDir);
            });
        }

        // 熱門關鍵字標籤點選事件
        const tags = document.querySelectorAll('.trending-tags .tag');
        tags.forEach(tag => {
            tag.addEventListener('click', () => {
                let text = tag.textContent.trim();
                const parenIndex = text.indexOf('(');
                if (parenIndex !== -1) {
                    text = text.substring(0, parenIndex).trim();
                }
                // 將簡稱與資料庫中的名稱做對照修正
                if (text === "藥華藥") text = "藥華醫藥";
                if (text === "美時") text = "美時化學";
                if (text === "台康") text = "台康生技";

                if (bioSearch) {
                    bioSearch.value = text;
                    this.runAISimulation(text);
                }
                const listSearch = document.getElementById('listSearch');
                if (listSearch) {
                    listSearch.value = text;
                }
            });
        });

        // 首頁重設選單與篩選條件
        const homeNavLink = document.querySelector('a[href="#home"]');
        if (homeNavLink) {
            homeNavLink.addEventListener('click', () => {
                this.model.resetFilters();

                // 重置所有選單與輸入框
                document.querySelectorAll('.location-filter').forEach(sel => sel.value = 'all');
                const catFilter = document.getElementById('categoryFilter');
                if (catFilter) catFilter.value = 'all';
                if (bioSearch) bioSearch.value = '';
                const listSearch = document.getElementById('listSearch');
                if (listSearch) listSearch.value = '';

                sortButtons.forEach(b => {
                    b.classList.toggle('active', b.dataset.sort === 'default');
                });
                if (sortDirectionBtn) {
                    sortDirectionBtn.setAttribute('data-dir', 'desc');
                    sortDirectionBtn.innerHTML = '<i data-lucide="arrow-down-narrow-wide"></i>';
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }
            });
        }

        // 彈窗關閉綁定
        const closeBtn = document.querySelector('.modal-close');
        const overlay = document.getElementById('modalOverlay');
        if (closeBtn) closeBtn.addEventListener('click', () => this.companyView.closeModal());
        if (overlay) overlay.addEventListener('click', () => this.companyView.closeModal());

        // 滑鼠移動時傳遞標準化坐標至 ThreeView
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            this.threeView.updateMousePosition(x, y);
        });
    }

    /**
     * 執行 AI HUD 比對模擬動畫與搜尋
     * @param {string} query
     */
    runAISimulation(query) {
        this.hudView.setSearchingState();
        this.model.setFilter('search', query);

        setTimeout(() => {
            this.hudView.setSuccessState();

            const allData = this.model.getAllCompanies();
            let match = null;
            if (query) {
                const searchQ = query.toLowerCase();
                match = allData.find(c => c.name.toLowerCase().includes(searchQ));
            }
            if (!match && allData.length > 0) {
                const currentFiltered = this.model.getFilteredAndSortedCompanies();
                if (currentFiltered.length > 0) {
                    match = currentFiltered[0];
                }
            }

            this.hudView.updateHudDetails(match);
        }, 800);
    }
}
