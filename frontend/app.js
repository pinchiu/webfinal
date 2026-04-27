const companiesData = [
    {
        id: 1,
        name: "基龍米克斯",
        category: "基因體與生物資訊",
        product: "次世代定序(NGS)、核酸合成、生物資訊分析",
        address: "新北市汐止區新台五路一段100號14樓",
        location: "New Taipei",
        contact: {
            phone: "02-2696-1658",
            email: "info@genomics.com.tw"
        },
        financials: {
            capital: "5.2B",
            grossProfit: "28%",
            netProfit: "12%",
            stockPrice: "45.2"
        },
        salary: {
            min: 45000,
            max: 85000,
            benchmark: "High"
        }
    },
    {
        id: 2,
        name: "行動基因",
        category: "基因體與生物資訊",
        product: "癌症基因檢測 (ACTOnco)、免疫治療評估",
        address: "台北市內湖區新湖二路345號3樓",
        location: "Taipei",
        contact: {
            phone: "02-2795-3660",
            email: "service@actgenomics.com"
        },
        financials: {
            capital: "3.8B",
            grossProfit: "35%",
            netProfit: "18%",
            stockPrice: "120.5"
        },
        salary: {
            min: 50000,
            max: 120000,
            benchmark: "Very High"
        }
    },
    {
        id: 3,
        name: "華聯生技",
        category: "基因體與生物資訊",
        product: "基因微陣列晶片、RNA定序、臨床分子檢測",
        address: "台北市南港區園區街3號12樓",
        location: "Taipei",
        contact: {
            phone: "02-6616-0001",
            email: "service@welgene.com.tw"
        },
        financials: {
            capital: "2.5B",
            grossProfit: "22%",
            netProfit: "8%",
            stockPrice: "32.8"
        },
        salary: {
            min: 42000,
            max: 75000,
            benchmark: "Medium"
        }
    },
    {
        id: 4,
        name: "麗寶生醫",
        category: "基因體與生物資訊",
        product: "癌症與罕見疾病基因檢測、分子診斷",
        address: "台北市中山區建國北路二段135號14樓",
        location: "Taipei",
        contact: {
            phone: "02-2509-0822",
            website: "libobio.com"
        },
        financials: {
            capital: "1.2B",
            grossProfit: "40%",
            netProfit: "15%",
            stockPrice: "N/A"
        },
        salary: {
            min: 48000,
            max: 95000,
            benchmark: "High"
        }
    },
    {
        id: 5,
        name: "創源生技",
        category: "基因體與生物資訊",
        product: "新生兒篩檢、非侵入性胎兒染色體檢測(NIPT)",
        address: "台北市內湖區新湖一路36巷28號",
        location: "Taipei",
        contact: {
            phone: "02-2795-1777",
            website: "healthgene.bionetcorp.com"
        },
        financials: {
            capital: "0.8B",
            grossProfit: "30%",
            netProfit: "10%",
            stockPrice: "28.5"
        },
        salary: {
            min: 40000,
            max: 70000,
            benchmark: "Medium"
        }
    },
    {
        id: 6,
        name: "即時基因",
        category: "基因體與生物資訊",
        product: "生物資訊大數據運算平台、雲端基因分析",
        address: "台北市中正區羅斯福路二段9號9樓",
        location: "Taipei",
        contact: {
            phone: "02-2396-0120",
            website: "atgenomix.com"
        },
        financials: {
            capital: "0.5B",
            grossProfit: "55%",
            netProfit: "25%",
            stockPrice: "N/A"
        },
        salary: {
            min: 55000,
            max: 150000,
            benchmark: "Top"
        }
    },
    {
        id: 7,
        name: "精拓生技",
        category: "基因體與生物資訊",
        product: "體外腫瘤細胞培養與藥物測試 (E.V.A. 平台)",
        address: "台北市內湖區瑞光路258巷56號3樓之2",
        location: "Taipei",
        contact: {
            phone: "02-2732-2701",
            website: "cancerfree.io"
        },
        financials: {
            capital: "0.3B",
            grossProfit: "45%",
            netProfit: "20%",
            stockPrice: "N/A"
        },
        salary: {
            min: 52000,
            max: 110000,
            benchmark: "High"
        }
    },
    {
        id: 8,
        name: "維致生醫",
        category: "基因體與生物資訊",
        product: "女性疾病體外診斷試劑 (子宮內膜異位症檢測)",
        address: "新竹縣竹北市生醫五路66號9樓之3",
        location: "Hsinchu",
        contact: {
            phone: "03-668-8058",
            website: "vcheckinc.com"
        },
        financials: {
            capital: "0.2B",
            grossProfit: "38%",
            netProfit: "14%",
            stockPrice: "N/A"
        },
        salary: {
            min: 46000,
            max: 88000,
            benchmark: "High"
        }
    },
    {
        id: 9,
        name: "藥華醫藥",
        category: "新藥研發與生物製藥",
        product: "血液腫瘤罕病新藥 (Besremi 百斯瑞明)",
        address: "台北市南港區園區街3號2樓之5",
        location: "Taipei",
        contact: {
            phone: "02-2655-7688",
            email: "info@pharmaessentia.com"
        },
        financials: {
            capital: "32.5B",
            grossProfit: "85%",
            netProfit: "42%",
            stockPrice: "480.0"
        },
        salary: {
            min: 65000,
            max: 200000,
            benchmark: "Top"
        }
    },
    {
        id: 10,
        name: "中裕新藥",
        category: "新藥研發與生物製藥",
        product: "愛滋病單株抗體靶向藥物 (Trogarzo)",
        address: "台北市內湖區瑞光路607號3樓",
        location: "Taipei",
        contact: {
            phone: "02-2658-0058",
            email: "IR@taimedbiologics.com"
        },
        financials: {
            capital: "2.8B",
            grossProfit: "70%",
            netProfit: "30%",
            stockPrice: "85.4"
        },
        salary: {
            min: 60000,
            max: 180000,
            benchmark: "Top"
        }
    },
    {
        id: 11,
        name: "保瑞藥業",
        category: "委託開發暨製造服務 (CDMO)",
        product: "大小分子全方位CDMO (口服、半固體、液體)",
        address: "台北市內湖區行愛路69號6樓",
        location: "Taipei",
        contact: {
            phone: "02-2790-0555",
            email: "info@bora-corp.com"
        },
        financials: {
            capital: "10.2B",
            grossProfit: "45%",
            netProfit: "28%",
            stockPrice: "720.5"
        },
        salary: {
            min: 55000,
            max: 160000,
            benchmark: "Top"
        }
    },
    {
        id: 12,
        name: "國光生技",
        category: "疫苗與檢測試劑",
        product: "流感疫苗、破傷風疫苗、無菌針劑充填CDMO",
        address: "台中市潭子區潭興路一段3號",
        location: "Taichung",
        contact: {
            phone: "04-2538-1220",
            email: "IR@adimmune.com.tw"
        },
        financials: {
            capital: "4.5B",
            grossProfit: "32%",
            netProfit: "18%",
            stockPrice: "38.2"
        },
        salary: {
            min: 42000,
            max: 90000,
            benchmark: "High"
        }
    },
    {
        id: 13,
        name: "台灣神隆",
        category: "委託開發暨製造服務 (CDMO)",
        product: "高致癌性高活性原料藥(API)、針劑CDMO",
        address: "台南市善化區南科八路1號 (南科)",
        location: "Tainan",
        contact: {
            phone: "06-505-2888",
            email: "info@scinopharm.com"
        },
        financials: {
            capital: "7.9B",
            grossProfit: "25%",
            netProfit: "15%",
            stockPrice: "26.5"
        },
        salary: {
            min: 45000,
            max: 95000,
            benchmark: "High"
        }
    },
    {
        id: 14,
        name: "亞果生醫",
        category: "細胞治療與再生醫學",
        product: "超臨界二氧化碳去細胞技術、膠原蛋白生醫材料",
        address: "高雄市路竹區路科二路57號3樓 (高科)",
        location: "Kaohsiung",
        contact: {
            phone: "07-695-5569",
            email: "info@acrobiomedical.com"
        },
        financials: {
            capital: "0.5B",
            grossProfit: "50%",
            netProfit: "22%",
            stockPrice: "42.0"
        },
        salary: {
            min: 48000,
            max: 100000,
            benchmark: "High"
        }
    },
    {
        id: 15,
        name: "訊聯生技",
        category: "細胞治療與再生醫學",
        product: "臍帶血/臍帶儲存、間質幹細胞治療、外泌體",
        address: "台北市內湖區新湖一路36巷28號",
        location: "Taipei",
        contact: {
            phone: "02-2795-1777",
            email: "service@bionetcorp.com"
        },
        financials: {
            capital: "1.5B",
            grossProfit: "35%",
            netProfit: "18%",
            stockPrice: "35.8"
        },
        salary: {
            min: 45000,
            max: 90000,
            benchmark: "High"
        }
    },
    {
        id: 16,
        name: "東洋藥品",
        category: "新藥研發與生物製藥",
        product: "癌症、重症抗感染藥物、微脂體技術平台",
        address: "台北市南港區園區街3-1號3樓",
        location: "Taipei",
        contact: {
            phone: "02-2652-5999",
            email: "info@tty.com.tw"
        },
        financials: {
            capital: "5.8B",
            grossProfit: "42%",
            netProfit: "25%",
            stockPrice: "78.2"
        },
        salary: {
            min: 52000,
            max: 140000,
            benchmark: "Very High"
        }
    },
    {
        id: 17,
        name: "浩鼎生技",
        category: "新藥研發與生物製藥",
        product: "抗乳癌等主動免疫抗癌新藥 (OBI-822)",
        address: "台北市南港區園區街3號7樓",
        location: "Taipei",
        contact: {
            phone: "02-2655-8799",
            email: "info@obipharma.com"
        },
        financials: {
            capital: "4.2B",
            grossProfit: "65%",
            netProfit: "-12%",
            stockPrice: "65.5"
        },
        salary: {
            min: 55000,
            max: 160000,
            benchmark: "Top"
        }
    },
    {
        id: 18,
        name: "永昕生物",
        category: "委託開發暨製造服務 (CDMO)",
        product: "細胞株開發、哺乳類/微生物製程CDMO",
        address: "苗栗縣竹南鎮科研路8號",
        location: "Hsinchu",
        contact: {
            phone: "037-586-988",
            email: "info@mycenax.com.tw"
        },
        financials: {
            capital: "2.5B",
            grossProfit: "28%",
            netProfit: "10%",
            stockPrice: "32.0"
        },
        salary: {
            min: 48000,
            max: 110000,
            benchmark: "High"
        }
    },
    {
        id: 19,
        name: "高端疫苗",
        category: "疫苗與檢測試劑",
        product: "腸病毒71型疫苗、新冠疫苗、四價流感疫苗",
        address: "台北市內湖區基湖路10巷57號7樓",
        location: "Taipei",
        contact: {
            phone: "02-7745-0830",
            email: "info@medigenvac.com"
        },
        financials: {
            capital: "3.2B",
            grossProfit: "55%",
            netProfit: "32%",
            stockPrice: "68.5"
        },
        salary: {
            min: 50000,
            max: 130000,
            benchmark: "Very High"
        }
    },
    {
        id: 20,
        name: "普生",
        category: "疫苗與檢測試劑",
        product: "B肝/C肝體外診斷試劑、自動化核酸檢測設備",
        address: "新竹縣寶山鄉創新一路6號 (竹科)",
        location: "Hsinchu",
        contact: {
            phone: "03-577-9221",
            email: "info@gbc.com.tw"
        },
        financials: {
            capital: "0.9B",
            grossProfit: "30%",
            netProfit: "12%",
            stockPrice: "24.2"
        },
        salary: {
            min: 42000,
            max: 85000,
            benchmark: "Medium"
        }
    }
];

// appState
const appState = {
    companies: companiesData,
    filteredCompanies: [...companiesData],
    activeLocations: [],
    activeSort: null,
    searchQuery: ""
};

// renderCompanyCard
function renderCompanyCard(company) {
    // Determine icon based on category
    let icon = "biotech";
    if (company.category.includes("新藥")) icon = "medication";
    if (company.category.includes("CDMO")) icon = "factory";
    if (company.category.includes("細胞")) icon = "group_work";
    if (company.category.includes("疫苗")) icon = "vaccines";

    return `
        <article class="card group">
            <div class="card-border-accent"></div>
            <div class="card-header">
                <div>
                    <h2 class="card-title">${company.name}</h2>
                    <p class="card-subtitle text-orange">${company.category}</p>
                </div>
                <div class="card-icon-wrapper">
                    <span class="material-symbols-outlined">${icon}</span>
                </div>
            </div>
            <div class="card-body">
                <p class="card-description">
                    ${company.product}
                </p>
                <div class="card-stats">
                    <div>Capital: ${company.financials.capital}</div>
                    <div>Salary: ${company.salary.benchmark}</div>
                </div>
            </div>
            <div class="card-footer">
                <div class="card-location">
                    <span class="material-symbols-outlined" style="font-size: 20px;">location_on</span>
                    <span class="location-text">${company.location}</span>
                </div>
                <button onclick="openProfile(${company.id})" class="btn-text">
                    View Profile <span class="material-symbols-outlined" style="font-size: 18px;">arrow_forward</span>
                </button>
            </div>
        </article>
    `;
}

// renderCompanyGrid
function renderCompanyGrid() {
    const grid = document.getElementById('company-grid');
    if (!grid) return;
    
    grid.innerHTML = appState.filteredCompanies.map(company => renderCompanyCard(company)).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCompanyGrid();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Search
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            appState.searchQuery = e.target.value.toLowerCase();
            applyFiltersAndSort();
        });
    }

    // Location Checkboxes
    const locationCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    locationCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            updateActiveLocations();
            applyFiltersAndSort();
        });
    });

    // Salary Radio
    const salaryRadios = document.querySelectorAll('input[name="salary_sort"]');
    salaryRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            appState.activeSort = e.target.value;
            applyFiltersAndSort();
        });
    });

    // Apply Filters Button
    const applyBtn = document.querySelector('button.w-full.mt-lg');
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            applyFiltersAndSort();
        });
    }
}

function updateActiveLocations() {
    const checked = document.querySelectorAll('input[type="checkbox"]:checked');
    appState.activeLocations = Array.from(checked).map(cb => cb.value).filter(val => val !== "");
}

function applyFiltersAndSort() {
    // Filter
    appState.filteredCompanies = appState.companies.filter(company => {
        const matchesSearch = company.name.toLowerCase().includes(appState.searchQuery) || 
                              company.product.toLowerCase().includes(appState.searchQuery);
        
        const matchesLocation = appState.activeLocations.length === 0 || 
                                appState.activeLocations.includes(company.location);
        
        return matchesSearch && matchesLocation;
    });

    // Sort
    if (appState.activeSort === 'highToLow') {
        appState.filteredCompanies.sort((a, b) => b.salary.max - a.salary.max);
    } else if (appState.activeSort === 'lowToHigh') {
        appState.filteredCompanies.sort((a, b) => a.salary.min - b.salary.min);
    }

    renderCompanyGrid();
}

// openProfile implementation
window.openProfile = function(id) {
    const company = appState.companies.find(c => c.id === id);
    if (!company) return;

    const modal = document.getElementById('company-modal');
    const content = document.getElementById('modal-content');
    
    content.innerHTML = `
        <div class="modal-header">
            <div class="block-gradient-small"></div>
            <h2 class="modal-title">${company.name}</h2>
            <p class="modal-subtitle text-orange">${company.category}</p>
        </div>

        <div class="modal-grid">
            <div class="modal-section">
                <h3 class="modal-section-title">Main Product / Service</h3>
                <p class="modal-text">${company.product}</p>
            </div>
            <div class="modal-section">
                <h3 class="modal-section-title">Contact Info</h3>
                <p class="modal-text">
                    <strong>Address:</strong> ${company.address}<br>
                    <strong>Phone:</strong> ${company.contact.phone || 'N/A'}<br>
                    ${company.contact.email ? `<strong>Email:</strong> ${company.contact.email}` : ''}
                    ${company.contact.website ? `<strong>Website:</strong> <a href="https://${company.contact.website}" target="_blank" class="text-orange underline">${company.contact.website}</a>` : ''}
                </p>
            </div>
        </div>

        <div class="modal-grid">
            <div class="modal-section">
                <h3 class="modal-section-title">Financial Overview</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">Capital</span>
                        ${company.financials.capital}
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Stock Price</span>
                        ${company.financials.stockPrice}
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Gross Profit</span>
                        ${company.financials.grossProfit}
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Net Profit</span>
                        ${company.financials.netProfit}
                    </div>
                </div>
            </div>
            <div class="modal-section">
                <h3 class="modal-section-title">Human Resources</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">Salary Range</span>
                        NT$ ${company.salary.min.toLocaleString()} - ${company.salary.max.toLocaleString()}
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Benchmark</span>
                        ${company.salary.benchmark}
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
};

window.closeProfile = function() {
    const modal = document.getElementById('company-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore background scrolling
};

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProfile();
});

// Close modal on background click
document.getElementById('company-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('company-modal')) closeProfile();
});
