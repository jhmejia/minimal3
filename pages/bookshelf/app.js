let sliderWrap = document.querySelector('.slider-wrap');
let slider = document.querySelector('.slider');

let items = [...document.querySelectorAll('.slider-item')];
let images = [...document.querySelectorAll('#book-spine')];

images.forEach((image, idx) => {
    image.src = `${data[idx].url}`;
})

// CLICKING ON BOOKS //
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
        rating.innerHTML = `, Rating: <b>${data[idx].rating}/10</b>`;
        reviewLink.href = `${data[idx].review}`;
    });
 })

 items.forEach(item => {
    item.addEventListener("mouseleave", () => {
        item.style.bottom = "0";
        rating.innerHTML = ", Rating: <b>?/10</b>";
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

    