---
layout: post
title: Drawing 2D Confidence Level Ellipses
category: learning
---
### What is this post about?
In this post we will learn how to plot error or confidence bound ellipses around samples of bivariate-normal data. Along the way we will meet our good old friends eigenvalues and eigenvectors, which, let's be frank, follow us wherever we go. Chi Square distribution will also join us, so I promise, what seems at first as an easy tasks, will turn out to be a tasty intellectual snack.

---
{: data-content="Let's go"}

### The End Goal
To keep the horizon clear, the end goal of our quest is to define a general formula for plotting ellipses of arbitrary confidence levels around data samples coming from bivariate normal distribution. Our journey will start by recapping the equations of a circle and an ellipse. We'll then look at some special cases of bivariate normal data that will give us the initial feel for how to do what we are after. Finally, we will turn it up a notch, bring in eigen-stuff, Chi Square distribution, and figure out a general formula of the confidence level, error, or whatever you want to call it, ellipses around bivariate normal samples. To make it even clearer, below you can generate bivariate-normal samples and corresponding error ellipses until you get bored and decide to continue reading . Have fun!

<!-- INSERT CODE HERE -->

### Equations of Circles and Ellipses
To start this off, let's remind ourselves of the equation for a unit circle. A circle is fully defined by it