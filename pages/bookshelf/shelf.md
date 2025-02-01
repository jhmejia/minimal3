---
layout: page
title: Bookshelf
---
<style>
/*----------------------------------------*/
/*               Bookshelf                */
/*----------------------------------------*/

.slider-wrap{
  position: relative;
  width: 100%;
  height: 320px;
  margin: auto;
  margin-top: 20px;
  overflow: auto;
}

.slider-wrap::-webkit-scrollbar{
  display: none;
}

.slider{
  position: relative;
  margin: auto;
  height: 300px;
  width: 1900px;
  padding-top: 20px;
  justify-content: start;
  display: flex;
  // flex: 1;
}

.slider-item{
  position: relative;
  display: inline;
}

.slide:hover{
  bottom: 20px;
}

.book-spine{
  position: relative;
  height: 300px;
  padding-right: 20px;
  // -webkit-filter: drop-shadow(5px 5px 5px #222222);
  // filter: drop-shadow(5px 5px 5px #222222);
}

.rating-wrap{
  position: relative;
  display: flex;
  height: 50px;
  margin-top: 50px;
  text-align: center;
  justify-content: center;
  flex-direction: column;
}
</style>

<div class="slider-wrap">
    <div class="slider">
    <!-- Insert Books Here Using JS -->
    </div>
</div>

<div class="rating-wrap">
    <a href="{{ '/book-reflection-archive' | relative_url }}" id="review-link">Review Archive</a>
    <p style="margin-top:10px" id="rating">Rating: <b>?/10</b></p>
</div>

<div>
    <script src="data.js"></script>
    <script src="app.js"></script>
</div>

*to scroll the shelf using your mouse press SHIFT-key, then scroll