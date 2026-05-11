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

    // Staggered Company Cards
    gsap.fromTo('.company-card', 
        { autoAlpha: 0, y: 40 },
        {
            scrollTrigger: {
                trigger: '.company-grid',
                start: 'top 85%'
            },
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.2)'
        }
    );

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
        analyzeBtn.addEventListener('click', () => {
            const query = bioSearch.value.trim();
            if (!query) return;

            analyzeBtn.disabled = true;
            analyzeBtn.querySelector('span').textContent = '數據掃描中...';
            matchPreview.querySelector('.status').textContent = '正在分析序列...';
            
            setTimeout(() => {
                matchPreview.querySelector('.status').textContent = '分析完成';
                analyzeBtn.disabled = false;
                analyzeBtn.querySelector('span').textContent = '數據分析';
                gsap.fromTo(matchPreview, { scale: 1 }, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 });
            }, 1500);
        });
    }

    // 4. Location Filter (Refined)
    const locationFilter = document.getElementById('locationFilter');
    const cards = document.querySelectorAll('.company-card');

    if (locationFilter) {
        locationFilter.addEventListener('change', (e) => {
            const loc = e.target.value;
            cards.forEach(card => {
                if(loc === 'all' || card.dataset.location === loc) {
                    card.style.display = 'block';
                    gsap.to(card, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' });
                } else {
                    gsap.to(card, { 
                        autoAlpha: 0, 
                        y: 20, 
                        duration: 0.3, 
                        onComplete: () => card.style.display = 'none' 
                    });
                }
            });
        });
    }

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
            const dist = Math.sqrt(dx*dx + dy*dy);

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

    // 8. Market Counting
    const marketItems = document.querySelectorAll('.m-row .val');
    marketItems.forEach(item => {
        const originalText = item.textContent;
        const targetValue = parseFloat(originalText.replace(/[^0-9.]/g, ''));
        const suffix = originalText.replace(/[0-9.]/g, '');

        if (!isNaN(targetValue)) {
            ScrollTrigger.create({
                trigger: item,
                start: 'top 95%',
                onEnter: () => {
                    let obj = { val: 0 };
                    gsap.to(obj, {
                        val: targetValue,
                        duration: 2,
                        onUpdate: () => { item.textContent = obj.val.toFixed(1) + suffix; }
                    });
                }
            });
        }
    });

    // 9. Fetch Data from PHP API
    const modal = document.getElementById('companyModal');
    const companyGrid = document.getElementById('companyGrid');
    
    async function loadCompanies() {
        try {
            // Replace with your actual API URL
            const response = await fetch('../../backend/api.php'); 
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            
            renderCompanies(data);
        } catch (error) {
            console.error('Fetch error:', error);
            // Fallback if API fails (optional: show error in UI)
        }
    }

    function renderCompanies(companies) {
        if (!companyGrid) return;
        companyGrid.innerHTML = ''; // Clear existing cards

        companies.forEach((company, index) => {
            const card = document.createElement('div');
            card.className = 'company-card';
            card.dataset.location = company.city === '台北市' ? 'taipei' : (company.city === '新北市' ? 'new-taipei' : 'hsinchu');
            card.style.setProperty('--d', `${index * 0.1}s`);

            card.innerHTML = `
                <div class="card-glow"></div>
                <div class="card-content">
                    <span class="category">${company.category}</span>
                    <h3>${company.name}</h3>
                    <p>${company.products}</p>
                    <div class="card-footer">
                        <span><i data-lucide="map-pin"></i> ${company.city}</span>
                        <span class="view-btn">查看詳情 <i data-lucide="arrow-right"></i></span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => showModal(company));
            companyGrid.appendChild(card);
        });

        lucide.createIcons();
        
        // Re-trigger GSAP for new elements
        gsap.fromTo('.company-card', 
            { autoAlpha: 0, y: 40 },
            {
                scrollTrigger: {
                    trigger: '.company-grid',
                    start: 'top 85%'
                },
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'back.out(1.2)'
            }
        );
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