/**
 * CompanyModel - 管理企業資料、搜尋與篩選狀態的前端 Model
 */
class CompanyModel {
    constructor() {
        this.allCompaniesData = [];
        this.currentFilters = {
            location: 'all',
            category: 'all',
            sortBy: 'default',
            sortDir: 'desc',
            search: ''
        };
        this.listeners = [];
    }

    addChangeListener(listener) {
        this.listeners.push(listener);
    }

    notifyChange() {
        this.listeners.forEach(listener => listener());
    }

    setFilter(key, value) {
        this.currentFilters[key] = value;
        this.notifyChange();
    }

    resetFilters() {
        this.currentFilters = {
            location: 'all',
            category: 'all',
            sortBy: 'default',
            sortDir: 'desc',
            search: ''
        };
        this.notifyChange();
    }

    getFilters() {
        return this.currentFilters;
    }

    parseCapital(capitalStr) {
        if (!capitalStr) return 0;
        const str = capitalStr.toString().replace(/,/g, '');
        let multiplier = 1;
        if (str.includes('億')) {
            multiplier = 100000000;
        } else if (str.includes('萬')) {
            multiplier = 10000;
        }
        const num = parseFloat(str.replace(/[^0-9.]/g, '')) || 0;
        return num * multiplier;
    }

    extractCityFromAddress(address) {
        if (!address) return '其他';
        const match = address.match(/(台北市|新北市|桃園市|台中市|台南市|高雄市|新竹縣|新竹市|苗栗縣|彰化縣|南投縣|雲林縣|嘉義縣|嘉義市|屏東縣|宜蘭縣|花蓮縣|台東縣|澎湖縣|金門縣|連江縣|基隆市)/);
        return match ? match[0] : '其他';
    }

    normalizeData(rawData) {
        return rawData.map(c => {
            const id = parseInt(c.id) || 0;
            const category = c.category || '其他';
            const address = c.address || '無';
            let city = c.city || '';
            if (!city || city === 'all') {
                city = this.extractCityFromAddress(address);
            }

            let salary = 0;
            if (c.salary_avg !== undefined && c.salary_avg !== null) {
                salary = parseInt(c.salary_avg) || 0;
            } else if (c.salary !== undefined && c.salary !== null) {
                salary = parseInt(c.salary.toString().replace(/[^0-9.]/g, '')) || 0;
            }

            let capital = 0;
            if (c.capital !== undefined && c.capital !== null) {
                if (typeof c.capital === 'number') {
                    capital = c.capital;
                } else {
                    capital = this.parseCapital(c.capital);
                }
            }

            let gross_margin = 0;
            let profit = 0;
            if (c.gross_margin !== undefined && c.gross_margin !== null) {
                gross_margin = parseFloat(c.gross_margin) || 0;
                profit = parseFloat(c.profit) || 0;
            } else if (c.profit !== undefined && c.profit !== null) {
                gross_margin = parseFloat(c.profit) || 0;
                profit = 0;
            }

            let stock_price = 0;
            if (c.stock_price !== undefined && c.stock_price !== null) {
                stock_price = parseFloat(c.stock_price) || 0;
            }

            return {
                id,
                name: c.name || '未命名企業',
                category,
                address,
                city,
                products: c.products || '無提供產品描述',
                phone: c.phone || '無',
                email: c.email || '無',
                website: c.website || '無',
                capital,
                gross_margin,
                profit,
                stock_price,
                salary,
                image: c.image || ''
            };
        });
    }

    async loadCompanies() {
        try {
            // 從 API 獲取即時數據 (由於頁面被導向至 html/index.html，API 路徑應改為 ../api.php)
            const response = await fetch('../api.php');
            if (!response.ok) throw new Error('API server returned error code');
            const data = await response.json();

            if (data.error) {
                throw new Error('Database connection failed: ' + JSON.stringify(data.error));
            }

            this.allCompaniesData = this.normalizeData(data);
            return { success: true };
        } catch (error) {
            console.error('API load error:', error);
            this.allCompaniesData = [];
            return { success: false, error: error.message || error };
        }
    }

    getFilteredAndSortedCompanies() {
        let filtered = [...this.allCompaniesData];

        // 1. 關鍵字搜尋篩選
        if (this.currentFilters.search) {
            const query = this.currentFilters.search.toLowerCase();
            filtered = filtered.filter(c =>
                (c.name && c.name.toLowerCase().includes(query)) ||
                (c.products && c.products.toLowerCase().includes(query)) ||
                (c.category && c.category.toLowerCase().includes(query))
            );
        }

        // 2. 地點篩選
        if (this.currentFilters.location !== 'all') {
            filtered = filtered.filter(c => c.city === this.currentFilters.location);
        }

        // 3. 分類篩選
        if (this.currentFilters.category !== 'all') {
            filtered = filtered.filter(c => c.category === this.currentFilters.category);
        }

        // 4. 排序方式
        const sortBy = this.currentFilters.sortBy;
        const sortDir = this.currentFilters.sortDir;

        filtered.sort((a, b) => {
            let valA, valB;
            if (sortBy === 'salary') {
                valA = a.salary;
                valB = b.salary;
            } else if (sortBy === 'capital') {
                valA = a.capital;
                valB = b.capital;
            } else if (sortBy === 'margin') {
                valA = a.gross_margin;
                valB = b.gross_margin;
            } else {
                // 預設按 id 排序
                valA = a.id || 0;
                valB = b.id || 0;
                return valA - valB;
            }

            if (valA === valB) return 0;
            return sortDir === 'asc' ? valA - valB : valB - valA;
        });

        return filtered;
    }

    getAllCompanies() {
        return this.allCompaniesData;
    }
}
