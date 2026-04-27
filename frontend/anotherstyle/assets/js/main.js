import companies from './data.js';

/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MOBILE MENU ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE HEADER STYLES ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    window.scrollY >= 50 ? header.classList.add('header--scroll') 
                         : header.classList.remove('header--scroll')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SWIPER WORKS ===============*/
// Note: Swiper not requested for this biotech list but placeholder for structure

/*=============== SWIPER TESTIMONIAL ===============*/
// Note: Swiper not requested for this biotech list but placeholder for structure

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	window.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== GSAP ANIMATION ===============*/ 

/* Home animation */
gsap.from('.home__content', {opacity: 0, duration: 2, delay: .5, y: -50})
gsap.from('.home__rocket', {opacity: 0, duration: 2, delay: .8, y: 100})

/* Home background animation */
gsap.from('.home__planet', {opacity: 0, duration: 2, delay: 1, x: 200})
gsap.from('.home__clouds-1', {opacity: 0, duration: 2, delay: 1.2, y: 100})
gsap.from('.home__clouds-2', {opacity: 0, duration: 2, delay: 1.4, y: 100})

/* The nav animation only works in the home section */
gsap.from('.nav__logo, .nav__toggle', {opacity: 0, duration: 1.5, delay: 1.5, y: -20, stagger: .2, ease: 'back.inOut(1.7)'})
gsap.from('.nav__item', {opacity: 0, duration: 1.5, delay: 1.8, y: -20, stagger: .2, ease: 'back.inOut(1.7)'})

/* About animation */
// gsap.from('.about__data', {opacity: 0, duration: 2, delay: .5, x: -50})

/* Work animation */
// gsap.from('.work__card', {opacity: 0, duration: 2, delay: .5, y: 50, stagger: .2})

/* Service animation */
// gsap.from('.services__card', {opacity: 0, duration: 2, delay: .5, y: 50, stagger: .2})

/* Expert animation */
// gsap.from('.expert__card', {opacity: 0, duration: 2, delay: .5, y: 50, stagger: .2})

/* Contact animation */
// gsap.from('.contact__container', {opacity: 0, duration: 2, delay: .5, x: 50})

/* Footer animation */
// gsap.from('.footer__container', {opacity: 0, duration: 2, delay: .5, y: 50})

/*=============== RENDER COMPANIES ===============*/
const companyList = document.getElementById('company-list');
const filterCity = document.getElementById('filter-city');
const sortSalary = document.getElementById('sort-salary');
const searchName = document.getElementById('search-name');

function renderCompanies(data) {
    companyList.innerHTML = '';
    
    data.forEach(company => {
        const card = document.createElement('article');
        card.className = 'company__card';
        card.innerHTML = `
            <div class="company__header">
                <span class="company__category">${company.category}</span>
            </div>
            <h3 class="company__name">${company.name}</h3>
            <div class="company__address">
                <i class="ri-map-pin-line"></i> ${company.address}
            </div>
            <p class="company__products">${company.products}</p>
            <div class="company__footer">
                <div class="company__salary">
                    $${company.salary.toLocaleString()} <span>/月起</span>
                </div>
                <button class="button--details view-details" data-id="${company.id}">
                    查看詳情 <i class="ri-arrow-right-line"></i>
                </button>
            </div>
        `;
        companyList.appendChild(card);
    });

    // Add event listeners to buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute('data-id'));
            showModal(id);
        });
    });
}

/*=============== FILTER & SORT LOGIC ===============*/
function updateList() {
    let filtered = [...companies];
    
    // Filter by city
    const city = filterCity.value;
    if (city !== 'all') {
        filtered = filtered.filter(c => c.city === city);
    }
    
    // Search by name
    const search = searchName.value.toLowerCase();
    if (search) {
        filtered = filtered.filter(c => c.name.toLowerCase().includes(search));
    }
    
    // Sort by salary
    const sort = sortSalary.value;
    if (sort === 'high') {
        filtered.sort((a, b) => b.salary - a.salary);
    } else if (sort === 'low') {
        filtered.sort((a, b) => a.salary - b.salary);
    }
    
    renderCompanies(filtered);
}

filterCity.addEventListener('change', updateList);
sortSalary.addEventListener('change', updateList);
searchName.addEventListener('input', updateList);

/*=============== MODAL LOGIC ===============*/
const modal = document.getElementById('company-modal');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');

function showModal(id) {
    const company = companies.find(c => c.id === id);
    if (!company) return;

    modalBody.innerHTML = `
        <h2 class="modal__title">${company.name}</h2>
        
        <div class="modal__section">
            <h3 class="modal__section-title"><i class="ri-information-line"></i> 公司簡介</h3>
            <p>${company.description}</p>
        </div>

        <div class="modal__section">
            <h3 class="modal__section-title"><i class="ri-briefcase-line"></i> 主要產品與服務</h3>
            <p>${company.products}</p>
        </div>

        <div class="modal__section">
            <h3 class="modal__section-title"><i class="ri-bar-chart-box-line"></i> 財務與人資資訊</h3>
            <div class="modal__data">
                <div class="data__item">
                    <span class="data__label">資本額</span>
                    <span class="data__value">${company.capital}</span>
                </div>
                <div class="data__item">
                    <span class="data__label">毛利率</span>
                    <span class="data__value">${company.margin}</span>
                </div>
                <div class="data__item">
                    <span class="data__label">預估利潤</span>
                    <span class="data__value">${company.profit}</span>
                </div>
                <div class="data__item">
                    <span class="data__label">平均月薪</span>
                    <span class="data__value">$${company.salary.toLocaleString()}</span>
                </div>
                <div class="data__item">
                    <span class="data__label">目前股價</span>
                    <span class="data__value">${company.stockPrice}</span>
                </div>
            </div>
        </div>

        <div class="modal__section">
            <h3 class="modal__section-title"><i class="ri-contacts-line"></i> 聯絡資訊</h3>
            <p><strong>電話：</strong>${company.contact}</p>
            <p><strong>地址：</strong>${company.address}</p>
            ${company.email ? `<p><strong>信箱：</strong>${company.email}</p>` : ''}
            ${company.website ? `<p><strong>官網：</strong><a href="https://${company.website}" target="_blank">${company.website}</a></p>` : ''}
        </div>
    `;

    modal.classList.add('modal--active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

modalClose.addEventListener('click', () => {
    modal.classList.remove('modal--active');
    document.body.style.overflow = 'initial';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('modal--active');
        document.body.style.overflow = 'initial';
    }
});

/*=============== INITIAL RENDER ===============*/
renderCompanies(companies);



