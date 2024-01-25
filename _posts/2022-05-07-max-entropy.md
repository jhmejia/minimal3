---
layout: post
title: Maximum Entropy Classifier
category: learning
---

### Entropy
In information theory, entropy of a random variable (RV) is the average amount of "information" or "uncertainty" in each of the possible outcomes. A uniform random variable has the largest possible amount of entropy, since every outcome is equally likely, thus every outcome has the greatest level of "surprise".

The mathematical definition is:

$$H(X) = -\sum_{i=1}^nP(x_i)\:log_bP(x_i),$$

where $P(x_i)$ is the probability of observing the outcome $x_i$, and the units depend on the base of the logarithm $b$. More on units on [wiki](https://en.wikipedia.org/wiki/Entropy_(information_theory)). But why this formulation? 

Let's first define a function $I(p)$ that encodes the information acquired by observing an event $i$ with its corresponding probability $p_i$. According to such a function, the following should intuitively hold:
- As $p$ increases $I(p)$ decreases, since a more frequently occuring event provides less information. This relationship should be monotonic.
- $I(1)=0,$ since an always occuring event provides no new information
- And the classic assumption of independence: $I(p_a*p_b) = I(p_a) + I(p_b),$ since the information acquired from two independent events should be the sum of their respective "informations"

As it turns out, the solution to these constraints as proven by [Shanon](https://en.wikipedia.org/wiki/Claude_Shannon) is $I(p) = log(1/p) = -log(p),$ which shows that $H(X)$ is just a summation over all the probabilities of observing $x_i$ multiplied by their corresponding information $I(p_i) = -log(p_i)$. That's the basics of entropy, now onto the intuition behind the Maximum Entropy Classifier.

### Maximize entropy?
Let's first set up the scene. Imagine we have have a sample of paired observations $(\boldsymbol{x}_i, y_i)$ where $\boldsymbol{x}_i$ is the number of brown spots on a banana and how many days ago it has been bought - its age, while $y_i$ is a dummy variable telling us whether the banana is ripe or not. Our goal is to construct a model that based on $\boldsymbol{x}_i$ predicts whether the banana is ripe. 

Since we don't have information about all the bananas in the world, our model will only be based on the bananas in our sample $\hat{\boldsymbol{x}}$. However, we want the model to generalize well to the rest of the bananas we may encounter in the future, thus we do NOT want to _overfit_ the model on our sample. The idea of chosing the model that maximizes the conditional entropy $H(Y\vert X)$, is exactly the idea of trying to avoid _overfitting_.

The intuition here is that since we do not know what kind of bananas we may encounter in the future, we want the model that assigns the most uniform probabilities to the ripeness of the bananas given their number of brown spots and age. In other words, we want the model that takes in the facts we have observed, but assumes no additional conditions beyond these facts. That is the model with the most uniform distribution of $\hat{p}(y\vert x)$.

### Max Entropy Classifier
Finally, in order to find the model (classifier) that maximizes the entropy of the estimated conditional probability distribution $p(y\vert x)$, we need to solve a constrained optimization problem:

$$p^*=\text{arg}\max_{p\in C}H(p),$$

where I am borrowing the notation from Berger et. al. (1996), namely $H(p)$ is a short-hand notation for $H(Y\vert X)$ and $C$ is a set of all potential probability distributions $p$ given the problem at hand. Using the tricks of Lagrange multipliers and dual formulation, Berger et. al. (p. 8) show that the solution comes in a form:

$$p_{\lambda}(y\vert x) = \frac{1}{Z_{\lambda}(x)}\exp\left(\sum_i\lambda_if_i(x,y)\right),$$

with $f_i(x,y)$ being a feature indicating function that takes on either a value of 1 or 0. For example the feature 'banana has 10+ brown spots and it is ripe' can be expressed as a binary indicator for every banana in our sample taking on value of 1 whenever the condition holds true, 0 otherwise. Moreover, $Z_{\lambda}(x)$ is a normalizing constant that comes from the condition that the sum over all $p(y\vert x)$ must be equal to 1, and $\lambda_i$ are the weights assigned to each feature such that the final entropy of $p^*$ is maximized.

### Remaining Questions
- How do we choose the best feature functions $f_i$?

#### References 
- Article that prompted this deep dive: [Mining and Summarizing Customer Reviews (Hu & Liu, 2004)](https://dl.acm.org/doi/abs/10.1145/1014052.1014073)
- Wiki: [Entropy (Information theory)](https://en.wikipedia.org/wiki/Entropy_(information_theory))
- Berger et. al. (1966): [A Maximum Entropy Approach to Natural Language Processing](https://aclanthology.org/J96-1002.pdf)