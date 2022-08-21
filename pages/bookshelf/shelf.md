---
title: Bookshelf
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<div class="w">

<a style="position:fixed" href="{{ "/" | relative_url }}">{{ site.theme_config.back_home_text }}</a>
<h1 style="position:fixed" id="title">{{ page.title }}</h1>

<div class="rating-wrap">
    <div class="review-link"></div>
    <a style="margin:auto" href="https://tomasmiskov.com/a-man-called-ove.html" target="_blank" id="review-link">Review</a>
    <p style="margin:auto" id="rating">, Rating:</p>
    <!-- <img class="stars" src="./stars/0.png"> -->
</div>

<div class="slider-wrap">
    <div class="slider">
        <div class="slider-item">
            <div class="img-div"></div>
        </div>
        <div class="slider-item">
            <div class="img-div"></div>
        </div>
        <div class="slider-item">
            <div class="img-div"></div>
        </div>
        <div class="slider-item">
            <div class="img-div"></div>
        </div>
    </div>
</div>

<script src="data.js"></script>
<script src="app.js"></script>

</div>

<div id="social-media" style="position:fixed; text-align:center">
    {% assign sm = site.data.social-media %}
    {% for entry in sm %}
        {% assign key = entry | first %}
        {% if sm[key].id %}
            <a href="{{ sm[key].href }}" title="{{ sm[key].title }}"><i class="{{ sm[key].fa-icon }}"></i></a>
        {% endif %}
    {% endfor %}
</div>

</body>
</html>

<!-- <div>
<link rel="stylesheet" href="style.css">
<div class="rating-wrap">
        <div class="review-link"></div>
        <a style="margin:auto" href="https://tomasmiskov.com/a-man-called-ove.html" target="_blank" id="review-link">Review</a>
        <p style="margin:auto">, Rating:</p>
        <img class="stars", src="./pages/bookshelf/stars/10.png"></div>
        
<div class="slider-wrap">
    <div class="slider">
        <div class="slider-item">
            <div class="img-div"></div>
        </div>
        <div class="slider-item">
            <div class="img-div"></div>
        </div>
        <div class="slider-item">
            <div class="img-div"></div>
        </div>
        <div class="slider-item">
            <div class="img-div"></div>
        </div>
    </div>
</div>

<script src="data.js"></script>
<script src="app.js"></script>
</div> -->