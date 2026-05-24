/**
 * UiView - 負責一般 UI 交互、滑鼠特效、滾動與計數動畫的 View
 */
class UiView {
    constructor() {
        this.navMenu = document.getElementById('nav-menu');
        this.navToggle = document.getElementById('nav-toggle');
        this.navClose = document.getElementById('nav-close');
        this.cursorGlow = document.querySelector('.cursor-glow');
        this.header = document.getElementById('header');
        this.progress = document.querySelector('.scroll-progress');
        this.lastScroll = 0;
    }

    init() {
        this.initMobileMenu();
        this.initCursorGlow();
        this.initMagnetics();
        this.initScrollBehavior();
        this.initPreloader();
    }

    initPreloader() {
        const preloader = document.getElementById('preloader');
        const textEl = document.getElementById('preloader-text');
        
        if (!preloader || typeof gsap === 'undefined') {
            this.initScrollReveals();
            return;
        }

        // Scramble text effect
        const chars = '!<>-_\\/[]{}—=+*^?#________';
        let originalText = textEl.textContent;
        let iteration = 0;
        let interval = setInterval(() => {
            if(!textEl) { clearInterval(interval); return; }
            textEl.textContent = originalText.split('').map((letter, index) => {
                if(index < Math.floor(iteration)) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('');
            
            if(iteration >= originalText.length){
                clearInterval(interval);
            }
            iteration += 1 / 2;
        }, 30);

        // Hide preloader after 1.8s
        setTimeout(() => {
            gsap.to(preloader, {
                yPercent: -100,
                duration: 0.8,
                ease: 'power4.inOut',
                onComplete: () => {
                    preloader.style.display = 'none';
                    this.initScrollReveals();
                }
            });
        }, 1800);
    }

    initMobileMenu() {
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => {
                this.navMenu.classList.add('show-menu');
            });
        }

        if (this.navClose && this.navMenu) {
            this.navClose.addEventListener('click', () => {
                this.navMenu.classList.remove('show-menu');
            });
        }

        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.navMenu) {
                    this.navMenu.classList.remove('show-menu');
                }
            });
        });
    }

    initCursorGlow() {
        document.addEventListener('mousemove', (e) => {
            if (this.cursorGlow && typeof gsap !== 'undefined') {
                gsap.to(this.cursorGlow, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }

            // Grid Background Parallax
            const gridBg = document.querySelector('.grid-bg');
            if (gridBg && typeof gsap !== 'undefined') {
                const xPos = (e.clientX / window.innerWidth - 0.5) * 40;
                const yPos = (e.clientY / window.innerHeight - 0.5) * 40;
                gsap.to(gridBg, {
                    x: -xPos,
                    y: -yPos,
                    duration: 1,
                    ease: 'power2.out'
                });
            }

            // DNA 滑鼠排斥效果
            const dDots = document.querySelectorAll('.dna-dot');
            dDots.forEach(dot => {
                const rect = dot.getBoundingClientRect();
                const dx = e.clientX - (rect.left + rect.width / 2);
                const dy = e.clientY - (rect.top + rect.height / 2);
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 80) {
                    const angle = Math.atan2(dy, dx);
                    const force = (80 - dist) / 80;
                    if (typeof gsap !== 'undefined') {
                        gsap.to(dot, {
                            y: Math.sin(angle) * force * 30,
                            duration: 0.3,
                            overwrite: 'auto'
                        });
                    }
                } else {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(dot, { y: 0, duration: 0.6, overwrite: 'auto' });
                    }
                }
            });
        });
    }

    initMagnetics() {
        const magneticElements = document.querySelectorAll('.btn-cta, .nav__button, .tag, .btn-direction');
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                if (typeof gsap !== 'undefined') {
                    gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
                }
            });
            el.addEventListener('mouseleave', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
                }
            });
        });
    }

    initScrollBehavior() {
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            // 導覽列滾動陰影
            if (this.header) {
                if (currentScroll > this.lastScroll && currentScroll >= 400) {
                    this.header.classList.add('scroll-nav');
                } else {
                    this.header.classList.remove('scroll-nav');
                }
            }
            this.lastScroll = currentScroll;

            // 頁面頂端滾動進度條
            if (this.progress) {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                this.progress.style.width = scrolled + '%';
            }
        });
    }

    initScrollReveals() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        // Hero Stagger Reveal
        const heroElements = ['.badge-new', '.glitch-text', '.hero-content p', '.search-box', '.trending-tags'];
        gsap.fromTo(heroElements, 
            { autoAlpha: 0, y: 30 },
            {
                autoAlpha: 1, 
                y: 0, 
                duration: 1, 
                stagger: 0.15, 
                ease: 'power3.out',
                delay: 0.2
            }
        );

        const revealAnims = [
            { selector: '.reveal-up', y: 50, x: 0 },
            { selector: '.reveal-left', x: -50, y: 0 },
            { selector: '.reveal-right', x: 50, y: 0 }
        ];

        revealAnims.forEach(anim => {
            gsap.utils.toArray(anim.selector).forEach(el => {
                if (el.classList.contains('hero-content')) return; // handled by stagger
                
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
                        duration: 1.6,
                        delay: parseFloat(el.style.getPropertyValue('--d')) || 0,
                        ease: 'expo.out'
                    }
                );
            });
        });

        window.addEventListener('load', () => ScrollTrigger.refresh());
    }

    /**
     * 啟動數字滾動計數特效 (藉由 ScrollTrigger)
     */
    initMarketCounting() {
        if (window.marketScrollTriggers) {
            window.marketScrollTriggers.forEach(st => st.kill());
        }
        window.marketScrollTriggers = [];

        const marketItems = document.querySelectorAll('.m-row .val');
        marketItems.forEach(item => {
            const originalText = item.textContent;
            const targetValue = parseFloat(originalText.replace(/[^0-9.]/g, ''));
            const suffix = originalText.replace(/[0-9.]/g, '');

            if (!isNaN(targetValue) && typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
                const st = ScrollTrigger.create({
                    trigger: item,
                    start: 'top 95%',
                    onEnter: () => {
                        let obj = { val: 0 };
                        gsap.to(obj, {
                            val: targetValue,
                            duration: 2,
                            onUpdate: () => {
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

    /**
     * 渲染市場財務洞察板塊
     */
    renderMarketInsights(companies, formatCapital, formatPercent, formatSalary) {
        if (!companies || companies.length === 0) return;

        // 1. 資本額排行 (前三名)
        const capitalSorted = [...companies].sort((a, b) => b.capital - a.capital).slice(0, 3);
        const capitalContainer = document.getElementById('capitalRanking');
        if (capitalContainer) {
            capitalContainer.innerHTML = capitalSorted.map(c =>
                `<div class="m-row"><span>${c.name}</span><span class="val">${formatCapital(c.capital)}</span></div>`
            ).join('');
        }

        // 2. 各分類平均毛利率排行 (前三名)
        const categoryProfit = {};
        companies.forEach(c => {
            const profitVal = c.gross_margin;
            if (c.category && profitVal !== undefined && profitVal !== null) {
                if (!categoryProfit[c.category]) categoryProfit[c.category] = { sum: 0, count: 0 };
                categoryProfit[c.category].sum += profitVal;
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
                `<div class="m-row"><span>${c.category.substring(0, 6)}</span><span class="val">${formatPercent(c.avg)}</span></div>`
            ).join('');
        }

        // 3. 薪資競爭力排行 (前三名)
        const salarySorted = [...companies].sort((a, b) => b.salary - a.salary).slice(0, 3);
        const salaryContainer = document.getElementById('salaryRanking');
        if (salaryContainer) {
            salaryContainer.innerHTML = salarySorted.map(c =>
                `<div class="m-row"><span>${c.name}</span><span class="val">${formatSalary(c.salary)}</span></div>`
            ).join('');
        }

        this.initMarketCounting();
    }
}
