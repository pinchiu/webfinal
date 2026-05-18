document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // 1. GSAP Scroll Reveals
    gsap.registerPlugin(ScrollTrigger);

    const revealAnims = [
        { selector: '.reveal-up', y: 50, x: 0 },
        { selector: '.reveal-left', x: -50, y: 0 },
        { selector: '.reveal-right', x: 50, y: 0 }
    ];

    revealAnims.forEach(anim => {
        gsap.utils.toArray(anim.selector).forEach(el => {
            gsap.fromTo(el,
                { autoAlpha: 0, x: anim.x, y: anim.y },
                {
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    duration: 1.2,
                    delay: parseFloat(el.style.getPropertyValue('--d')) || 0,
                    ease: 'power4.out'
                }
            );
        });
    });

    // Animate Category Titles  Cards logic will be handled after render

    // Refresh ScrollTrigger
    window.addEventListener('load', () => ScrollTrigger.refresh());

    // 2. DNA Animation Simulation (Refined Wrapper Logic)
    function createDNABase() {
        const dnaContainer = document.getElementById('dnaContainer');
        if (!dnaContainer) return;

        const dots = 20;
        for (let i = 0; i < dots; i++) {
            const wrapper = document.createElement('div');
            wrapper.className = 'dna-dot-wrapper';
            wrapper.style.top = `${(i / dots) * 100}%`;

            const dot1 = document.createElement('div');
            const dot2 = document.createElement('div');
            const line = document.createElement('div');

            dot1.className = 'dna-dot dot-1';
            dot2.className = 'dna-dot dot-2';
            line.className = 'dna-line';

            wrapper.appendChild(line);
            wrapper.appendChild(dot1);
            wrapper.appendChild(dot2);
            dnaContainer.appendChild(wrapper);

            const delay = i * 0.2;
            gsap.to(dot1, { x: -60, duration: 0 });
            gsap.to(dot2, { x: 60, duration: 0 });

            gsap.to(dot1, {
                x: 60,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: delay
            });
            gsap.to(dot2, {
                x: -60,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: delay
            });
        }
    }
    createDNABase();

    // 3. Analysis Button Simulation
    const analyzeBtn = document.getElementById('analyzeBtn');
    const matchPreview = document.getElementById('matchPreview');
    const bioSearch = document.getElementById('bioSearch');

    if (analyzeBtn && matchPreview) {
        analyzeBtn.addEventListener('click', async () => {
            const query = bioSearch.value.trim();

            // UI Feedback
            analyzeBtn.disabled = true;
            analyzeBtn.querySelector('span').textContent = '數據搜尋中...';
            matchPreview.querySelector('.status').textContent = '正在查詢資料庫...';

            try {
                // Fetch filtered results from API
                const response = await fetch(`api.php?q=${encodeURIComponent(query)}`);
                if (!response.ok) throw new Error('Search failed');
                const results = await response.json();

                // Render the new results
                renderCompanies(results);
                renderMarketInsights(results);

                setTimeout(() => {
                    matchPreview.querySelector('.status').textContent = '搜尋完成';
                    analyzeBtn.disabled = false;
                    analyzeBtn.querySelector('span').textContent = '數據分析';
                    gsap.fromTo(matchPreview, { scale: 1 }, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 });
                }, 800);
            } catch (error) {
                console.error('Search error:', error);
                matchPreview.querySelector('.status').textContent = '搜尋失敗';
                analyzeBtn.disabled = false;
                analyzeBtn.querySelector('span').textContent = '數據分析';
            }
        });
    }

    // 4. Location Filter (Refined)
    const locationFilters = document.querySelectorAll('.location-filter');
    let allCompaniesData = []; // Store fetched data for filtering

    locationFilters.forEach(filter => {
        filter.addEventListener('change', (e) => {
            const loc = e.target.value;
            // Sync all filters
            locationFilters.forEach(f => f.value = loc);

            let filtered = allCompaniesData;
            if (loc !== 'all') {
                filtered = allCompaniesData.filter(c => c.city === loc);
            }
            renderCompanies(filtered);
            renderMarketInsights(filtered);
        });
    });

    // 5. Global Interactive Cursor
    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        if (cursorGlow) {
            gsap.to(cursorGlow, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.4,
                ease: 'power2.out'
            });
        }

        // DNA Mouse Repulsion
        const dots = document.querySelectorAll('.dna-dot');
        dots.forEach(dot => {
            const rect = dot.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 80) {
                const angle = Math.atan2(dy, dx);
                const force = (80 - dist) / 80;
                gsap.to(dot, {
                    y: Math.sin(angle) * force * 30,
                    duration: 0.3,
                    overwrite: 'auto'
                });
            } else {
                gsap.to(dot, { y: 0, duration: 0.6, overwrite: 'auto' });
            }
        });
    });

    // 6. Magnetic Elements
    const magneticElements = document.querySelectorAll('.btn-cta, .nav__button, .tag');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        });
    });

    // 7. Scroll Behavior
    const header = document.getElementById('header');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (header) {
            if (currentScroll > lastScroll && currentScroll >= 400) {
                header.classList.add('scroll-nav');
            } else {
                header.classList.remove('scroll-nav');
            }
        }
        lastScroll = currentScroll;

        const progress = document.querySelector('.scroll-progress');
        if (progress) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progress.style.width = scrolled + '%';
        }
    });

    // 8. Market Counting (Moved to function for dynamic use)
    function initMarketCounting() {
        // Kill existing triggers to avoid duplicates
        if (window.marketScrollTriggers) {
            window.marketScrollTriggers.forEach(st => st.kill());
        }
        window.marketScrollTriggers = [];

        const marketItems = document.querySelectorAll('.m-row .val');
        marketItems.forEach(item => {
            const originalText = item.textContent;
            const targetValue = parseFloat(originalText.replace(/[^0-9.]/g, ''));
            const suffix = originalText.replace(/[0-9.]/g, '');

            if (!isNaN(targetValue)) {
                const st = ScrollTrigger.create({
                    trigger: item,
                    start: 'top 95%',
                    onEnter: () => {
                        let obj = { val: 0 };
                        gsap.to(obj, {
                            val: targetValue,
                            duration: 2,
                            onUpdate: () => {
                                // Format logic
                                let displayVal = obj.val;
                                if (suffix === '') {
                                    displayVal = Math.round(obj.val).toLocaleString();
                                    item.textContent = displayVal;
                                } else {
                                    item.textContent = obj.val.toFixed(1) + suffix;
                                }
                            }
                        });
                    }
                });
                window.marketScrollTriggers.push(st);
            }
        });
    }

    // New Function to Render Market Insights Dynamically
    function renderMarketInsights(companies) {
        if (!companies || companies.length === 0) return;

        // 1. Capital Ranking (Top 3 Companies)
        const capitalSorted = [...companies].sort((a, b) => {
            const valA = parseFloat(a.capital ? a.capital.toString().replace(/[^0-9.]/g, '') : 0);
            const valB = parseFloat(b.capital ? b.capital.toString().replace(/[^0-9.]/g, '') : 0);
            return valB - valA;
        }).slice(0, 3);

        const capitalContainer = document.getElementById('capitalRanking');
        if (capitalContainer) {
            capitalContainer.innerHTML = capitalSorted.map(c =>
                `<div class="m-row"><span>${c.name}</span><span class="val">${c.capital}</span></div>`
            ).join('');
        }

        // 2. Average Profit by Category (Top 3 Categories)
        const categoryProfit = {};
        companies.forEach(c => {
            if (c.category && c.profit) {
                if (!categoryProfit[c.category]) categoryProfit[c.category] = { sum: 0, count: 0 };
                categoryProfit[c.category].sum += parseFloat(c.profit.toString().replace(/[^0-9.]/g, ''));
                categoryProfit[c.category].count++;
            }
        });
        const profitSorted = Object.keys(categoryProfit).map(cat => ({
            category: cat,
            avg: categoryProfit[cat].sum / categoryProfit[cat].count
        })).sort((a, b) => b.avg - a.avg).slice(0, 3);

        const profitContainer = document.getElementById('profitRanking');
        if (profitContainer) {
            profitContainer.innerHTML = profitSorted.map(c =>
                `<div class="m-row"><span>${c.category.substring(0, 6)}</span><span class="val">${c.avg.toFixed(1)}%</span></div>`
            ).join('');
        }

        // 3. Salary Competitiveness (Top 3 Companies by Salary)
        const salarySorted = [...companies].sort((a, b) => {
            const valA = parseFloat(a.salary ? a.salary.toString().replace(/[^0-9.]/g, '') : 0);
            const valB = parseFloat(b.salary ? b.salary.toString().replace(/[^0-9.]/g, '') : 0);
            return valB - valA;
        }).slice(0, 3);

        const salaryContainer = document.getElementById('salaryRanking');
        if (salaryContainer) {
            salaryContainer.innerHTML = salarySorted.map(c =>
                `<div class="m-row"><span>${c.name}</span><span class="val">${c.salary}</span></div>`
            ).join('');
        }

        // Re-init counting animations
        initMarketCounting();
    }

    // 9. Fetch Data from PHP API
    const modal = document.getElementById('companyModal');
    const companyGrid = document.getElementById('companyGrid');

    async function loadCompanies() {
        try {
            // Updated path to current directory
            const response = await fetch('api.php');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            allCompaniesData = data;

            // Populate location filters with unique cities
            const cities = [...new Set(data.map(c => c.city))].filter(Boolean);
            locationFilters.forEach(filter => {
                filter.innerHTML = '<option value="all">所有地點</option>';
                cities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    filter.appendChild(option);
                });
            });

            renderCompanies(data);
            renderMarketInsights(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    function renderCompanies(companies) {
        if (!companyGrid) return;
        companyGrid.innerHTML = ''; // Clear existing cards

        // Group by category like Card version
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

                // Array of varied biotech/tech images
                const placeholderImages = [
                    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800", // Microscope
                    "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800", // Lab overall
                    "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800", // Pipette
                    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800", // Test tubes
                    "https://images.unsplash.com/photo-1614935151651-0bea6508ab6b?auto=format&fit=crop&q=80&w=800", // DNA/Tech
                    "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800", // Scientific research
                    "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800", // Tech lab
                    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"  // Classic lab
                ];
                // Use company ID or index to deterministically pick an image
                const imgIndex = (company.id || index) % placeholderImages.length;
                const imageUrl = company.image && company.image !== "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
                    ? company.image
                    : placeholderImages[imgIndex];

                article.innerHTML = `
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

                article.addEventListener('click', () => showModal(company));
                cardWrapper.appendChild(article);
            });

            catSection.appendChild(cardWrapper);
            companyGrid.appendChild(catSection);
        });

        lucide.createIcons();

        // Re-trigger GSAP for new elements
        // Re-trigger GSAP for new elements using fromTo to avoid state glitches on re-render
        if (window.cardScrollTriggers) {
            window.cardScrollTriggers.forEach(st => st.kill());
        }
        window.cardScrollTriggers = [];

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

    function showModal(company) {
        if (!modal) return;
        modal.querySelector('.category-badge').textContent = company.category;
        modal.querySelector('.modal-title').textContent = company.name;
        modal.querySelector('.modal-location').innerHTML = `<i data-lucide="map-pin"></i> ${company.address}`;
        modal.querySelector('.modal-products').textContent = company.products;

        const contactHtml = `
            <p>聯絡電話: ${company.phone || '無'}</p>
            <p>Email: ${company.email || '無'}</p>
            <p>財務資訊: 資本額 ${company.capital} | 毛利 ${company.gross_margin}%</p>
        `;
        modal.querySelector('.modal-contact').innerHTML = contactHtml;

        lucide.createIcons();
        modal.classList.add('active');
    }

    loadCompanies();

    const closeBtn = document.querySelector('.modal-close');
    const overlay = document.getElementById('modalOverlay');
    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    if (overlay) overlay.addEventListener('click', () => modal.classList.remove('active'));
});