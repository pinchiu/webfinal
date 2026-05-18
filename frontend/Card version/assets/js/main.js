/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* Menu show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MOBILE MENU ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== NAVBAR SCROLL EFFECT ===============*/
let lastScroll = 0

const scrollNav = () => {
    const header = document.getElementById('header'),
        currentScroll = window.scrollY

    // If the header scrolls down beyond 400px, collapse the header
    if (currentScroll > lastScroll && currentScroll >= 400) {
        header.classList.add('scroll-nav')
    } else {
        header.classList.remove('scroll-nav')
    }

    lastScroll = currentScroll
}
window.addEventListener('scroll', scrollNav)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== GSAP ANIMATION ===============*/
// Home animation
gsap.from('.home__title', {
    opacity: 0,
    y: 50,
    duration: 1.2,
    delay: 0.5,
    ease: 'power3.out'
})

gsap.from('.home__description', {
    opacity: 0,
    y: 50,
    duration: 1.2,
    delay: 0.8,
    ease: 'power3.out'
})

gsap.from('.home__container .button', {
    opacity: 0,
    y: 50,
    duration: 1.2,
    delay: 1.1,
    ease: 'power3.out'
})

// Smooth bridge to Companies section
gsap.to('.home__container', {
    scrollTrigger: {
        trigger: '.home',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    opacity: 0,
    scale: 0.9,
    y: -50
})

// Company Sections Staggered Animation
const animateCompanies = () => {
    // Animate Category Titles
    gsap.utils.toArray('.category__title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: -50,
            duration: 1,
            ease: 'power2.out'
        })
    })

    // Animate Cards with Stagger
    gsap.utils.toArray('.card').forEach(cardWrapper => {
        gsap.from(cardWrapper.querySelectorAll('.card__article'), {
            scrollTrigger: {
                trigger: cardWrapper,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 100,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out'
        })
    })
}

// Observe dynamic content changes to re-run animations if needed
const observer = new MutationObserver((mutations) => {
    animateCompanies();
});

observer.observe(document.getElementById('cardContainer'), { childList: true });

// Other sections
const animateSection = (selector) => {
    gsap.from(selector, {
        scrollTrigger: {
            trigger: selector,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out'
    })
}

animateSection('.about__data')
animateSection('.contact__content')

// Nav animation only in home
gsap.from('.nav', {
    opacity: 0,
    y: -50,
    duration: 1,
    delay: 0.2
})
