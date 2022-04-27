# My Personal Site

This is the source code for my personal site hosted with [GitHub Pages](https://pages.github.com/) and developed using [Jekyll](https://jekyllrb.com/). The theme is an edited version of [no style please](https://riggraz.dev/no-style-please/) developed by [riggraz](https://riggraz.dev/).

## Why Jekyll?

Jekyll is a **static site generator**, meaning there is no database and no CMS (content management system) that dynamically feeds the content to the webserver. Instead the whole site is rendered at once from basic YAML, MD, CSS and HTML files. Therefore, it is a great option for light personal sites like the one I wanted to create. In addition it forces you to learn basic HTML, CSS and Markdown which in my opinion is a big bonus! Yes, the learning curve will be steep at the beginning, but the customizability and knowledge gained in the process will stay with you forever. 

## Tutorials I Followed to Get This Site Working

* [Intro to Jekyll and GitHub Pages by Dataslice](https://www.youtube.com/watch?v=wCOInE7-E0I)
* [Dataslice Part 2](https://www.youtube.com/watch?v=Td_NjdrwPkQ)
* [Getting Started with Jekyll by Codecourse](https://www.youtube.com/watch?v=iWowJBRMtpc&t=306s)
* ...and a lot of time spent on [Stack Overflow](https://stackoverflow.com/)

## JavaScript Widget I Use For Rendering Latex
[Mathjax](https://www.mathjax.org/)

Add the following code snippet to your *post.html* to get Mathjax working seemlessly:
```
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script type="text/javascript" id="MathJax-script" async  
src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

<script>
MathJax = {
 tex: {
   inlineMath: [['$', '$'], ['\\(', '\\)']]
 },
};
</script>
```

