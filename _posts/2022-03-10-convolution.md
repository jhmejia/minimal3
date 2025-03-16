---
layout: post
title: Convolution
category: learning
---

### What are we talking about?

A convolution function of two continuous functions $f(x)$ and $g(x)$ is defined as:

$$(f \ast g)(t):=\int_{-\infty}^{\infty} f(\tau) g(t-\tau) d \tau$$

You may ask: _Hmm, okay, and what does that mean?_ Well, I did ask that myself, so here we are. In a nutshell, a convolution can be seen as a function that defines the overlap between the two functions $f(x)$ and $g(x)$, as $g(x)$ sweeps over $f(x)$. In this sense, $(f \ast g)(t)$ is kind of a mathematical "blend" of the two functions.

### Why is this useful?

This is a very powerful tool in mathematics and physics, as it allows us to model the effect of one function on another. For example, in physics, we can model the effect of a system on a signal, or in image processing, we can model the effect of a filter on an image.

This is an integral part of neural networks, as it allows us to model the effect of a filter on an image, which is the basis of convolutional neural networks. For example, to detect edges in an image, we can use a filter that detects changes in intensity, and by convolving this filter with the image, we can detect the edges.



### Applications?

-   image processing
-   sound engineering
-   quite a bit of physics
-   and unsurprisingly a lot of heavy statistics, i.e. probability theory

Finally, here's a little duck helping us with visualizing what's going on when we convolve two uniform continuous functions.

![Duck Convolution](images\posts\convolution\Uniform Convolution.gif)

