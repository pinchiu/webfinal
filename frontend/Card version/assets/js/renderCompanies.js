
const cardContainer = document.getElementById('cardContainer');
const locationFilter = document.getElementById('locationFilter');

// Populate unique cities in filter
const cities = [...new Set(companies.map(c => c.city))];
cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    locationFilter.appendChild(option);
});

function renderCompanies() {
    const city = locationFilter.value;

    let filtered = companies;
    if (city !== 'all') {
        filtered = filtered.filter(c => c.city === city);
    }

    // Group by category
    const categories = [...new Set(filtered.map(c => c.category))];
    
    cardContainer.innerHTML = '';
    
    categories.forEach(cat => {
        const catSection = document.createElement('div');
        catSection.className = 'card-section';
        
        const title = document.createElement('h2');
        title.className = 'category__title';
        title.textContent = cat;
        catSection.appendChild(title);

        const cardWrapper = document.createElement('section');
        cardWrapper.className = 'card';

        const catCompanies = filtered.filter(c => c.category === cat);
        catCompanies.forEach((company, index) => {
            const article = document.createElement('article');
            article.className = `card__article ${index === 0 ? 'card__active' : ''}`;
            article.onclick = () => {
                window.location.href = `details.html?id=${company.id}`;
            };

            article.innerHTML = `
                <img src="${company.image}" alt="${company.name}" class="card__img">
                <div class="card__shadow"></div>

                <div class="card__data">
                    <div class="card__icon">
                        <i class="ri-community-line"></i>
                    </div>

                    <div class="card__info">
                        <h2 class="card__title">${company.name}</h2>
                        <p class="card__description">${company.product.substring(0, 30)}...</p>
                        <div class="card__details-btn">
                            查看詳情 <i class="ri-arrow-right-line"></i>
                        </div>
                    </div>
                </div>
            `;
            cardWrapper.appendChild(article);
        });

        catSection.appendChild(cardWrapper);
        cardContainer.appendChild(catSection);
    });

    // Refresh ScrollTrigger after dynamic content is added
    if (window.ScrollTrigger) {
        ScrollTrigger.refresh();
    }
}

locationFilter.onchange = renderCompanies;
renderCompanies();
