/**
 * CompanyView - 負責企業列表卡片、下拉選單與詳細彈窗渲染的 View
 */
class CompanyView {
    constructor() {
        this.modal = document.getElementById('companyModal');
        this.companyGrid = document.getElementById('companyGrid');
        this.toastNotification = document.getElementById('toastNotification');
    }

    /**
     * 顯示浮動提示框
     * @param {string} message
     */
    showToast(message) {
        if (!this.toastNotification) return;
        this.toastNotification.textContent = message;
        this.toastNotification.classList.add('show');
        setTimeout(() => {
            this.toastNotification.classList.remove('show');
        }, 4000);
    }

    /**
     * 格式化資本額
     */
    formatCapital(num) {
        if (!num) return '-- 億';
        if (num >= 100000000) {
            return (num / 100000000).toFixed(1).replace(/\.0$/, '') + '億';
        } else if (num >= 10000) {
            return (num / 10000).toFixed(0) + '萬';
        }
        return num.toLocaleString();
    }

    /**
     * 格式化薪資
     */
    formatSalary(val) {
        if (!val || val === '--') return '面議';
        const num = parseInt(val);
        if (isNaN(num)) return '面議';
        return 'NT$' + num.toLocaleString();
    }

    /**
     * 格式化股價
     */
    formatStockPrice(val) {
        if (!val) return '未上市';
        const num = parseFloat(val);
        if (isNaN(num) || num <= 0) return '未上市';
        return 'NT$' + num.toFixed(2);
    }

    /**
     * 格式化百分比 (毛利率)
     */
    formatPercent(val) {
        const num = parseFloat(val);
        if (isNaN(num)) return '--%';
        return num.toFixed(1).replace(/\.0$/, '') + '%';
    }

    /**
     * 動態填充篩選下拉選單並綁定事件
     */
    populateFilters(cities, categories, onLocationChange, onCategoryChange) {
        const locationFilters = document.querySelectorAll('.location-filter');
        const categoryFilter = document.getElementById('categoryFilter');

        locationFilters.forEach(filter => {
            filter.innerHTML = '<option value="all">所有地點</option>';
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                filter.appendChild(option);
            });
            // 綁定位置變更事件
            filter.addEventListener('change', (e) => onLocationChange(e.target.value));
        });

        if (categoryFilter) {
            categoryFilter.innerHTML = '<option value="all">所有領域</option>';
            categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat;
                option.textContent = cat;
                categoryFilter.appendChild(option);
            });
            // 綁定分類變更事件
            categoryFilter.addEventListener('change', (e) => onCategoryChange(e.target.value));
        }
    }

    /**
     * 將企業列表渲染至 DOM
     */
    renderCompanies(companies) {
        if (!this.companyGrid) return;
        this.companyGrid.innerHTML = '';

        if (companies.length === 0) {
            this.companyGrid.innerHTML = '<div class="no-results-message" style="grid-column: span 3; text-align: center; color: var(--text-secondary); padding: 4rem 0;">無符合當前篩選條件之企業。</div>';
            return;
        }

        // 依分類進行分組
        const categories = [...new Set(companies.map(c => c.category))].filter(Boolean);

        categories.forEach(cat => {
            const catSection = document.createElement('div');
            catSection.className = 'card-section';

            const title = document.createElement('h2');
            title.className = 'category__title';
            title.textContent = cat;
            catSection.appendChild(title);

            const cardWrapper = document.createElement('section');
            cardWrapper.className = 'card';

            const catCompanies = companies.filter(c => c.category === cat);
            catCompanies.forEach((company, index) => {
                const article = document.createElement('article');
                article.className = `card__article ${index === 0 ? 'card__active' : ''}`;

                const placeholderImages = [
                    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1614935151651-0bea6508ab6b?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
                ];

                const companyPhotoMap = {
                    '基龍米克斯': 'public/images/companies/基龍米克斯.jpg',
                    '行動基因': 'public/images/companies/行動基因_1.jpg',
                    '華聯生技': 'public/images/companies/華聯生技_1.jpg',
                    '麗寶生醫': 'public/images/companies/麗寶生醫_1.jpg',
                    '創源生技': 'public/images/companies/創源生技_1_改訊連基因數位GGA.jpg',
                    '精拓生技': 'public/images/companies/精拓生技_1.jpg',
                    '維致生醫': 'public/images/companies/維致生醫_1.jpg',
                    '藥華醫藥': 'public/images/companies/藥華醫藥_1.webp',
                    '中裕新藥': 'public/images/companies/中裕新藥_1.jpg',
                    '東洋藥品': 'public/images/companies/東洋藥品_1.jpg',
                    '浩鼎生技': 'public/images/companies/浩鼎生技_1.jpg',
                    '中天生技': 'public/images/companies/中天生技_1.jpg',
                    '逸達生技': 'public/images/companies/逸達生技_1.jpg',
                    '美時化學': 'public/images/companies/美時化學-1.jpg',
                    '太景生技': 'public/images/companies/太景生技_1.png',
                    '亞諾法': 'public/images/companies/亞諾法_1.jpg',
                    '漢康生醫': 'public/images/companies/漢康生醫_1.png',
                    '全福生技': 'public/images/companies/全福生技_1.jpg',
                    '醣基生醫': 'public/images/companies/醣基生醫_1.webp',
                    '旭富製藥': 'public/images/companies/旭富製藥_1.jpg',
                    '台康生技': 'public/images/companies/台康生技_1.jpg',
                    '保瑞藥業': 'public/images/companies/保瑞藥業_1.jpg',
                    '永昕生物': 'public/images/companies/永昕生物_1.jpg',
                    '台灣神隆': 'public/images/companies/台灣神隆_1.jpg',
                    '台灣生物醫藥製造': 'public/images/companies/台灣生物醫藥製造_1.png',
                    '喜康生技': 'public/images/companies/喜康生技_1.jpg',
                    '安美得': 'public/images/companies/安美得_1.png',
                    '訊聯生技': 'public/images/companies/訊聯生技_1.jpg',
                    '亞果生醫': 'public/images/companies/亞果生醫_1.jpg',
                    '基亞生技': 'public/images/companies/基亞生技-基亞生物_1.png',
                    '和訊生技': 'public/images/companies/和訊生技_1.png',
                    '台安生技': 'public/images/companies/台安生技_1.jpg',
                    '國光生技': 'public/images/companies/國光生技_1.jpg',
                    '高端疫苗': 'public/images/companies/高端疫苗_1.webp',
                    '普生': 'public/images/companies/普生_1.png',
                    '光鼎生技': 'public/images/companies/光鼎生技_1.jpg',
                    '立景生技': 'public/images/companies/立景生技_1.jpg',
                    '國鼎生技': 'public/images/companies/國鼎生技_1.jpg',
                    '創益生技': 'public/images/companies/創益生技_1.jpg'
                };

                const imgIndex = (company.id || index) % placeholderImages.length;
                let imageUrl = '';

                // 優先使用資料庫中的圖片欄位
                if (company.image && company.image.trim() !== '') {
                    imageUrl = company.image;
                } else if (companyPhotoMap[company.name]) {
                    // 若資料庫無圖片，則使用本地對照字典
                    imageUrl = companyPhotoMap[company.name];
                } else {
                    // 最後使用 Unsplash 預設圖
                    imageUrl = placeholderImages[imgIndex];
                }

                // 若為本機相對路徑（且不是以 ../ 開頭），自動補上 ../ 以對應 html/ 目錄結構
                if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('../')) {
                    imageUrl = '../' + imageUrl;
                }

                article.innerHTML = `
                    <div class="card__glare"></div>
                    <img src="${imageUrl}" alt="${company.name}" class="card__img">
                    <div class="card__shadow"></div>

                    <div class="card__data">
                        <div class="card__icon">
                            <i data-lucide="building-2"></i>
                        </div>

                        <div class="card__info">
                            <h2 class="card__title">${company.name}</h2>
                            <p class="card__description">${company.products ? company.products.substring(0, 30) : ''}...</p>
                        </div>
                    </div>
                `;

                // 3D Glass Tilt Effect
                const glare = article.querySelector('.card__glare');
                article.addEventListener('mousemove', (e) => {
                    const rect = article.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = ((y - centerY) / centerY) * -10;
                    const rotateY = ((x - centerX) / centerX) * 10;
                    
                    if(typeof gsap !== 'undefined') {
                        gsap.to(article, {
                            rotateX: rotateX,
                            rotateY: rotateY,
                            duration: 0.4,
                            ease: 'power2.out'
                        });
                        
                        gsap.to(glare, {
                            x: x - rect.width/2,
                            y: y - rect.height/2,
                            opacity: 1,
                            duration: 0.1
                        });
                    }
                });
                
                article.addEventListener('mouseleave', () => {
                    if(typeof gsap !== 'undefined') {
                        gsap.to(article, {
                            rotateX: 0,
                            rotateY: 0,
                            duration: 0.6,
                            ease: 'power3.out'
                        });
                        gsap.to(glare, {
                            opacity: 0,
                            duration: 0.6
                        });
                    }
                });

                article.addEventListener('click', () => this.showModal(company));
                cardWrapper.appendChild(article);
            });

            catSection.appendChild(cardWrapper);
            this.companyGrid.appendChild(catSection);
        });

        // 重新初始化 Lucide 圖示
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // GSAP 動態滾動顯示特效
        if (window.cardScrollTriggers) {
            window.cardScrollTriggers.forEach(st => st.kill());
        }
        window.cardScrollTriggers = [];

        if (typeof gsap !== 'undefined') {
            gsap.utils.toArray('.category__title').forEach(title => {
                const anim = gsap.fromTo(title,
                    { opacity: 0, x: -50 },
                    {
                        scrollTrigger: {
                            trigger: title,
                            start: 'top 90%',
                            toggleActions: 'play none none none'
                        },
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: 'power2.out'
                    }
                );
                window.cardScrollTriggers.push(anim.scrollTrigger);
            });

            gsap.utils.toArray('.card').forEach(cardWrapper => {
                const articles = cardWrapper.querySelectorAll('.card__article');
                const anim = gsap.fromTo(articles,
                    { opacity: 0, y: 100 },
                    {
                        scrollTrigger: {
                            trigger: cardWrapper,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        },
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: { amount: Math.min(1.5, articles.length * 0.15) },
                        ease: 'power3.out'
                    }
                );
                window.cardScrollTriggers.push(anim.scrollTrigger);
            });

            if (window.ScrollTrigger) {
                ScrollTrigger.refresh();
            }
        }
    }

    /**
     * 填充彈窗內容並開啟詳細資訊彈窗
     */
    showModal(company) {
        if (!this.modal) return;
        this.modal.querySelector('.category-badge').textContent = company.category;
        this.modal.querySelector('.modal-title').textContent = company.name;
        this.modal.querySelector('.modal-location').innerHTML = `<i data-lucide="map-pin"></i> ${company.address}`;
        this.modal.querySelector('.modal-products').textContent = company.products;

        const contactHtml = `
            <p>聯絡電話: ${company.phone || '無'}</p>
            <p>Email: ${company.email || '無'}</p>
        `;
        this.modal.querySelector('.modal-contact').innerHTML = contactHtml;

        const capitalEl = this.modal.querySelector('.modal-finance-capital');
        const marginEl = this.modal.querySelector('.modal-finance-margin');
        const stockEl = this.modal.querySelector('.modal-finance-stock');
        const salaryEl = this.modal.querySelector('.modal-finance-salary');

        if (capitalEl) capitalEl.textContent = this.formatCapital(company.capital);
        if (marginEl) marginEl.textContent = this.formatPercent(company.gross_margin);
        if (stockEl) stockEl.textContent = this.formatStockPrice(company.stock_price);
        if (salaryEl) salaryEl.textContent = this.formatSalary(company.salary);

        const ctaBtn = this.modal.querySelector('.btn-cta');
        if (ctaBtn) {
            ctaBtn.onclick = () => {
                if (company.website && company.website !== '無' && company.website !== '') {
                    let url = company.website;
                    if (!/^https?:\/\//i.test(url)) {
                        url = 'https://' + url;
                    }
                    window.open(url, '_blank');
                } else {
                    this.showToast("此企業未登錄官網資訊");
                }
            };
        }

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        this.modal.classList.add('active');
        
        // Modal Stagger Animations
        if(typeof gsap !== 'undefined') {
            const elementsToAnimate = [
                this.modal.querySelector('.modal-header'),
                ...this.modal.querySelectorAll('.info-block'),
                ...this.modal.querySelectorAll('.finance-card')
            ].filter(Boolean);
            
            gsap.fromTo(elementsToAnimate, 
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    stagger: 0.1, 
                    ease: 'power3.out',
                    delay: 0.1 
                }
            );
        }
    }

    /**
     * 關閉詳細資訊彈窗
     */
    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('active');
            
            // Reset opacity immediately after closing animation finishes
            setTimeout(() => {
                const elementsToReset = [
                    this.modal.querySelector('.modal-header'),
                    ...this.modal.querySelectorAll('.info-block'),
                    ...this.modal.querySelectorAll('.finance-card')
                ].filter(Boolean);
                
                if(typeof gsap !== 'undefined') {
                    gsap.set(elementsToReset, { opacity: 0 });
                }
            }, 300);
        }
    }
}
