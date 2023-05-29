let sliderWrap = document.querySelector('.slider-wrap');
let slider = document.querySelector('.slider');

// Create book divs automatically
for(let i = 0; i < Object.keys(data).length; i++){
    slider.innerHTML += `<div class="slider-item"><a id="review-post-link" href=""><img class="book-spine" src=""></a></div>`;
}

// Fill book divs with images
let items = [...document.querySelectorAll('.slider-item')];
let images = [...document.querySelectorAll('.book-spine')];
let aTags = [...document.querySelectorAll('#review-post-link')];

images.forEach((image, idx) => {
    image.src = `${data[idx].url}`;
    image.id = `${data[idx].name.replace(/\s+/g, '-').toLowerCase()}`;
})

aTags.forEach((atag, idx) => {
    atag.href = `${data[idx].review}`;
})

// CLICKING ON BOOKS FUNCTIONALITY //
let reviewLink = document.querySelector('#review-link');
let rating = document.querySelector('#rating')

items.forEach(item => {
    item.addEventListener("mouseenter", () => {
        item.style.cursor = "grab";
    });
})

 items.forEach((item, idx) => {
    item.addEventListener("mousemove", () => {
        item.style.bottom = "20px";
        rating.innerHTML = `Rating: <b>${data[idx].rating}/10</b>`;
        reviewLink.textContent = `${data[idx].name}`;
        reviewLink.href = `${data[idx].review}`;
    });
 })

 items.forEach(item => {
    item.addEventListener("mouseleave", () => {
        item.style.bottom = "0";
        // rating.innerHTML = "Rating: <b>?/10</b>";
        // reviewLink.textContent = `Review Archive`;
        // reviewLink.href = "https://tomasmiskov.com/book-reflection-archive";
    });
 })

//  let clicked = false;
//  items.forEach((item, idx) => {
//     item.addEventListener("click", () => {
//         if(clicked){
//             clicked = false;
//             item.style.bottom = "0px";
//         }
//         clicked = true;
//         item.style.bottom = "20px";
//         rating.innerHTML = `, Rating: <b>${data[idx].rating}/10</b>`;
//         reviewLink.href = `${data[idx].review}`;
//     });
//  })

    