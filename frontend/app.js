let companiesData = [];

// appState
const appState = {
    companies: [],
    filteredCompanies: [],
    activeLocations: [],
    activeSort: null,
    searchQuery: ""
};

// Fetch data from PHP backend
async function loadData() {
    try {
        const response = await fetch('../backend/api/get_companies.php');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        companiesData = await response.json();
        
        // Initialize app state with fetched data
        appState.companies = companiesData;
        appState.filteredCompanies = [...companiesData];
        
        // Initial render
        renderCompanyGrid();
        console.log('Data loaded successfully from backend');
    } catch (error) {
        console.error('Error loading data:', error);
        // Fallback or error message for user could go here
        const grid = document.getElementById('company-grid');
        if (grid) {
            grid.innerHTML = `<div style="grid-column: span 2; text-align: center; padding: 48px; font-size: 20px;">
                Unable to load biotech data. Please ensure the backend is active.
            </div>`;
        }
    }
}

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
    loadData();
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
