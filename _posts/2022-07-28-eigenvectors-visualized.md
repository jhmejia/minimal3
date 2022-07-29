---
layout: post
title: Interactive visualization of eigenvectors
category: ml-notes
dependencies:
    - p5
    - mathjs
edited-on: 2022-07-29
---
Move your mouse horizontally (left to right) to see the dots move! Click on the buttons bellow to change the applied linear transformation.

<div id="sketch-holder">
    <div id="sketch">
    <script type="text/javascript" src="assets/js/eigen_sketch.js"></script>
    </div>
</div>

The dots represent 100 vectors in a 2D-plane. As you move your mouse from left to right, you see the selected type of linear transformation being applied to all the vectors (all the dots). The dots (and lines) in red show the directions of the eigenvectors of the particular linear transformation. The *Rotation* has complex eigenvectors that cannot be visualized in the cartesian coordinate system.

The matrices describing the three transformations are the following:

$$\begin{equation}
\text{Asymmetric} = 
    \begin{bmatrix}
    0 & -2 \\ 
    1 & 3
    \end{bmatrix}
\end{equation}$$

$$\begin{equation}
\text{Symmetric} = 
    \begin{bmatrix}
    0 & -1 \\ 
    -1 & 0
    \end{bmatrix}
\end{equation}$$

$$\begin{equation}
\text{Rotation} = 
    \begin{bmatrix}
    1 & -1 \\ 
    1 & 1
    \end{bmatrix}
\end{equation}$$

Playing with the above interactive visualization, can you see what makes an eigenvector?

After a bit of play, you may realize the following:
 - the dots laying on the eigenvector stay on the eigenvector even after the linear transformation is applied
 - they all change their position by a pre-specified value, the eigenvalue
 - which is what follows from the well known definition of $Av = \lambda v$ with $A$ the linear transformation, $v$ the eigenvector and $\lambda$ the eigenvalue

Hence, eigenvectors (and values) of a matrix $A$ are in a certain way analogous to the prime number factorization of an integer. Just like the factors of an integer define building blocks of which the integer is comprised. Eigenvectors define the fundamental directions of translation of the linear transformation that's happening when we multiply the matrix $A$ with a vector $v$. Obviously the analogy is loose, but maybe you'll find it helpful for conceptualizing the essence of eigenvectors.