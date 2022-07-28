---
layout: post
title: Interactive visualization of eigenvectors
category: ml-notes
dependencies:
    - p5
    - mathjs
---
Move your mouse horizontally (left to right) to see the dots move! Click on the buttons bellow to change the applied linear transformation.

<div id="sketch-holder">
    <div id="sketch">
    <script type="text/javascript" src="assets/js/eigen_sketch.js"></script>
    </div>
</div>

The dots represent 100 vectors in a 2D-plane. As you move your mouse from left to right, you see the selected type of linear transformation being applied to all the vectors (all the dots). The dots (and lines) in red show the directions of the eigenvectors of the particular linear transformation. The *Rotation* has complex eigenvectors that cannot be visualized in cartesian coordinates.

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
 - the dots laying on the eigenvector stay on the eigenvector even after the linear transformation
 - they all change their position by a pre-specified value, the eigenvalue
 - which is what follows from $Av = \lambda v$ with $A$ the linear transformation, $v$ the eigenvector and $\lambda$ the eigenvalue

<!-- In the symmetric and the asymmetric examples you -->

<!-- As visible above, the symmetric transformation has orthogonal eigenvectors, while the asymmetric transformation does not. -->