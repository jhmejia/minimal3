let sliderWrap = document.querySelector('.slider-wrap');
let slider = document.querySelector('.slider');
let clonesWidth;
let sliderWidth;
let clones = [];
let disableScroll = false;
let scrollPos;
// let data = './data.js';

let items = [...document.querySelectorAll('.slider-item')];
let images = [...document.querySelectorAll('.img-div')];

images.forEach((image, idx) => {
    // image.style.backgroundImage = `url(./images/${idx}.png)`
    image.style.backgroundImage = `url("${data[idx].url}")`;
})

items.forEach(item => {
    let clone = item.cloneNode(true);
    clone.classList.add('clone');
    slider.appendChild(clone);
    clones.push(clone);
})

function getClonesWidth(){
    let width = 0;
    clones.forEach(clone => {
        width += clone.offsetWidth;
    })
    return width
}

function getScrollPos(){
    return window.scrollY;
}

function scrollUpdate(){
    scrollPos = getScrollPos();
    if(clonesWidth + scrollPos >= sliderWidth){
        window.scrollTo({top: 1});
    }else if(scrollPos <= 0){
        window.scrollTo({top: sliderWidth - clonesWidth - 1});
    }

    slider.style.transform = `translateX(${-window.scrollY}px)`
    requestAnimationFrame(scrollUpdate);
}

function onLoad(){
    calculateDimensions();
    document.body.style.height = `${sliderWidth}px`
    window.scrollTo({top: 1});
    scrollUpdate();
}

function calculateDimensions(){
    sliderWidth = slider.getBoundingClientRect().width;
    clonesWidth = getClonesWidth();
}

onLoad()

// CLICKING ON BOOKS //
let ratingWrap = document.querySelector('.rating-wrap');
let reviewLink = document.querySelector('#review-link');
let rating = document.querySelector('#rating')

let sliderBottom = sliderWrap.getBoundingClientRect().bottom;
let sliderH = sliderWrap.getBoundingClientRect().height;
let ratingWrapH = ratingWrap.getBoundingClientRect().height;
let ratingWrapOffset = sliderH/2 + (window.innerHeight - sliderBottom)/2;
ratingWrap.style.marginTop = `${ratingWrapOffset}`

items.forEach(item => {
    item.addEventListener("mouseenter", () => {
        item.style.cursor = "grab";
    });
})

 items.forEach((item, idx) => {
    item.addEventListener("mousemove", () => {
        item.style.bottom = "20px";
        rating.innerHTML = `, Rating: <b>${data[idx].rating}/10</b>`
        reviewLink.href = `${data[idx].review}`
    });
 })

 items.forEach(item => {
    item.addEventListener("mouseleave", () => {
        item.style.bottom = "0";
    });
 })


clones.forEach(item => {
    item.addEventListener("mouseenter", () => {
        item.style.cursor = "grab";
    });
})

clones.forEach((item, idx) => {
    item.addEventListener("mousemove", () => {
        item.style.bottom = "20px";
        rating.innerHTML = `, Rating: <b>${data[idx].rating}/10</b>`
        reviewLink.href = `${data[idx].review}`
    });
})

clones.forEach(item => {
    item.addEventListener("mouseleave", () => {
        item.style.bottom = "0";
    });
})
    