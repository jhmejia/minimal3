let data = [
    {
        "name" : "Life of Pi",
        "author": "Yann Martel",
        "url": "./images/Life of Pi.png",
        "date": "June 2022",
        "rating": "8",
        "review": "https://tomasmiskov.com/life-of-pi.html",
    },
    {
        "name" : "A Man Called Ove",
        "author": "Frederik Backman",
        "url": "./images/A Man Called Ove.png",
        "date": "June 2022",
        "rating": "7",
        "review": "https://tomasmiskov.com/a-man-called-ove.html",
    },
    {
        "name" : "The unlikely Pilgrimage of Harold Fry",
        "author": "Rachel Joyce",
        "url": "./images/The unlikely Pilgrimage of Harold Fry.png", 
        "date": "June 2022",
        "rating": "6",
        "review": "https://tomasmiskov.com/the-unlikely-pilgrimage-of-harold-fry.html",
    },
    {
        "name" : "Neophilia",
        "author": "Lyall Watson",
        "url": "./images/Neophilia.png", 
        "date": "June 2022",
        "rating": "10",
        "review": "https://tomasmiskov.com/neophilia.html",
    },
    {
        "name" : "A Thousand Splendid Suns",
        "author": "Khaled Hossein",
        "url": "./images/A Thousand Splendid Suns.png", 
        "date": "July 2022",
        "rating": "10",
        "review": "https://tomasmiskov.com/a-thousand-splendid-suns.html",
    }
]

data.sort((a, b) => a.author.localeCompare(b.author));