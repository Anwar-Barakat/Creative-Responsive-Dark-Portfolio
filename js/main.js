window.addEventListener('load', () => {
    document.querySelector('.page-loader').classList.add('slide-out-right');
    setTimeout(() => {
        document.querySelector('.page-loader').style.display = "none";
    }, 10000)
});
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// & Start Big Animation Effect : 
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

function bgAnimationItems() {
    const rows = 7,
        cols = 10;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const div = document.createElement("div");
            div.className = `col-${j+1}`;
            document.querySelector(".bg-animation-effect").appendChild(div);
        }

    }
}
bgAnimationItems();


// toggle Navbar : 
const navToggle = document.querySelector('.nav-toggle');
navToggle.addEventListener('click', toggleNavbar);

function toggleNavbar() {
    navToggle.classList.toggle('active');
    document.querySelector('.nav').classList.toggle('open');
    toggleOverlayEffect();
    toggleBodyScrolling();
}


// Toggle Overlay Effect : 
function toggleOverlayEffect() {
    document.querySelector('.overlay-effect').classList.toggle('active');
}



// Hide And Toggle Section :
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('link-item') && e.target.hash !== "") {
        const hash = e.target.hash;
        if (e.target.classList.contains('nav-item')) {
            activateSection(hash);
            toggleNavbar();
        } else {
            toggleBodyScrolling();
            toggleOverlayEffect();
            document.querySelector('.nav-toggle').classList.add('toggle-hide');
            setTimeout(() => {
                activateSection(hash);
                toggleOverlayEffect();
                toggleBodyScrolling();
                document.querySelector('.nav-toggle').classList.remove('toggle-hide');
            }, 1000);

        }
    }
});
function activateSection(sectionId) {

    document.querySelector('section.active').classList.remove('active');
    document.querySelector(sectionId).classList.add('active');
    window.scrollTo(0, 0);
}
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// & Start Filter Active Category Portfolio Items 
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// toggle body scrolling : 
function toggleBodyScrolling() {
    document.body.classList.toggle('hide-scrolling');
}







// Start Portfolio Popup :
const filterBtnContainer = document.querySelector('.portfolio-filter');
let portfolioItems;

filterBtnContainer.addEventListener('click', (e) => {

    if (e.target.classList.contains('portfolio-filter-btn') && !e.target.classList.contains('active')) {

        filterBtnContainer.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');

        toggleBodyScrolling();

        document.querySelector('.filter-status').classList.add('active');
        document.querySelector('.filter-status p').innerHTML = `filtering <span>${e.target.innerHTML}</span> works`;

        setTimeout(() => {
            filterItems(e.target);
        }, 400);

        setTimeout(() => {
            document.querySelector('.filter-status').classList.remove('active');
            toggleBodyScrolling();

        }, 800);

    }
});


function filterItems(filterBtn) {
    const selectedCategory = filterBtn.getAttribute('data-filter');

    document.querySelectorAll('.portfolio-item').forEach(item => {

        const category = item.getAttribute('data-category').split(',')
            // console.log(category);

        if (category.indexOf(selectedCategory) !== -1 || selectedCategory === 'all') {
            item.classList.add('show');

        } else {
            item.classList.remove('show');
        }

    });
    portfolioItems = document.querySelectorAll(".portfolio-item.show");
}
filterItems(document.querySelector('.portfolio-filter-btn.active'));







// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// & Start Portfolio Item Details
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
let portfolioItemIndex;
document.addEventListener('click', (e) => {

    if (e.target.closest(".portfolio-item")) {

        const currentCategory = e.target.closest(".portfolio-item");
        portfolioItemIndex = Array.from(portfolioItems).indexOf(currentCategory);
        console.log(portfolioItemIndex);
        togglePopup();
        portfolioItemDetails();
        updateNextPrevItem();

    }
});

function togglePopup() {

    document.querySelector(".portfolio-popup").classList.toggle("open");
    toggleBodyScrolling();
}
document.querySelector(".pp-close-btn").addEventListener('click', () => {
    togglePopup();
});

function portfolioItemDetails() {

    document.querySelector('.pp-thumbnail img').src = portfolioItems[portfolioItemIndex].querySelector("img").src;

    document.querySelector('.pp-header h3').innerHTML = portfolioItems[portfolioItemIndex].querySelector("h3").innerHTML;

    document.querySelector('.pp-body').innerHTML = portfolioItems[portfolioItemIndex].querySelector(".portfolio-item-details").innerHTML;

    document.querySelector('.pp-counter').innerHTML = `${portfolioItemIndex+1} of ${portfolioItems.length} (<span title="category">${document.querySelector('.portfolio-filter-btn.active').innerHTML}</span>)`;


}

function updateNextPrevItem() {
    if (portfolioItemIndex !== 0) {
        document.querySelector('.pp-footer-left').classList.remove('hidden');

        document.querySelector('.pp-footer-left h3').innerHTML = portfolioItems[portfolioItemIndex - 1].querySelector("h3").innerHTML;

        document.querySelector('.pp-footer-left img').src = portfolioItems[portfolioItemIndex - 1].querySelector("img").src;

    } else {
        document.querySelector('.pp-footer-left').classList.add('hidden');
    }


    if (portfolioItemIndex !== portfolioItems.length - 1) {
        document.querySelector('.pp-footer-right').classList.remove('hidden');

        document.querySelector('.pp-footer-right h3').innerHTML = portfolioItems[portfolioItemIndex + 1].querySelector("h3").innerHTML;

        document.querySelector('.pp-footer-right img').src = portfolioItems[portfolioItemIndex + 1].querySelector("img").src;

    } else {
        document.querySelector('.pp-footer-right').classList.add('hidden');
    }
}
document.querySelector(".pp-prev-btn").addEventListener('click', () => {
    changePortfolioItem('prev');
});
document.querySelector(".pp-next-btn").addEventListener('click', () => {
    changePortfolioItem('next');
});

function changePortfolioItem(direction) {
    // console.log(direction);
    if (direction == 'prev') {

        portfolioItemIndex--
    } else {
        portfolioItemIndex++
    }
    document.querySelector('.pp-overlay').classList.add(direction);
    setTimeout(() => {

        document.querySelector(".pp-inner").scrollTo(0, 0);
        portfolioItemDetails();
        updateNextPrevItem();
    }, 400);
    setTimeout(() => {

        document.querySelector('.pp-overlay').classList.remove(direction);
    }, 1000);


}


// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// & Toggle Contact Form
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

document.addEventListener('click', (e) => {

    if (e.target.classList.contains('toggle-contact-form-btn')) {

        document.querySelector('.contact-form').classList.toggle('open');
        toggleBodyScrolling();
    }
});