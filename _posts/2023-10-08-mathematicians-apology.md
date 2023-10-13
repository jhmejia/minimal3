---
layout: post
title: A mathematician's Apology
category: book-reflection
---

### Rating
**8/10** I read the version with a foreword by [C. P. Snow](https://en.wikipedia.org/wiki/C._P._Snow). The foreword was nearly as long as the original essay but well worth reading. It offered a nice chronological recount of Hardy's life that provided a better context for his *apology*.  

Although I am not a mathematician, nor ever will be, I spent in my short life (thus far) a fair amount of time studying math and statistics. Often for practical purposes in my studies of data science but often enough just for pure fun and beauty of the subject at hand. Thus, although my experience in mathematical study is incomparable with Hardy's, I could relate and appreciate his defence for studying mathematics just for the sake of studying mathematics. The essay is basically a reflection on why Hardy devoted his life to the subject as well as an attempt to defend his life's work - in his own mind and in the minds of the sceptics. The story he presents is thoroughly written, taking the reader on many tangents, each equally enjoyable. My favourite was the presentation of two little mathematical proofs that serve as an example for the beauty of mathematics.  

The only critique I would have for the book is the lack of mention of his own work. I think it would provide even better context for what Hardy was actually defending. Yes, the two little proofs provide nice examples for the kind of mathematical work he is trying to defend but these are still much more *useful* than the things Hardy actually worked on. Outlining at least the rough idea behind one of his works in the are of number theory would, in my opinion, give the reader a glimpse into Hardy's professional work which would contextualize the whole apology even better.

### Synopsis
A defence of why studying *pure* mathematics is a worthwhile purpose and a job like any other. Also a glimpse into the mind of a mathematician at the end of his career ruminating about his life's work and legacy. That's pretty much it, it's too short for a proper synopsis, it would reveal too much information.

### Notes
**Euclid's proof by contradiction for the fact that there are infinitely many primes:**
1. Assume there are finitely many primes. Call the largest prime *P*. So we have 2, 3, 5, 7, 11, 13, ..., *P*.
2. Now construct a new number, called *Q*, such that *Q* = (2 x 3 x 5 x 7 x ... x *P*) + 1. 
3. By definition, *Q* doesn't have any of the finitely many primes as its prime factor since dividing by any of the primes leaves a remainder of 1. Therefore *Q* is not a composite number made up of the finitely many primes we have. Thus it is either itself a prime or it is divisible by some prime larger than *P*. Which in either case is a contradiction to our original assumption of finitely many primes.
4. Thus, there are infinitely many primes. Case closed.  

**Pythagoras's proof that $\sqrt{2}$ is irrational:**
1. Saying that $\sqrt{2}$ is irrational equates to stating that it cannot be expressed as a fraction of two integers $\frac{a}{b}$.
2. This is the same as saying that 2 cannot in expressed as $\left(\frac{a}{b}\right)^2$ with integral values of $a$ and $b$. Which rewritten can be stated as $a^2 = 2b^2$ does not have integer solution.
3. Let's now assume that we can actually find and integer solution. Thus there exist two integers, $a$ and $b$, without common factors, because otherwise we could factor them out, that fulfil the equation $a^2 = 2b^2$.
4. It follows from 3. that $a^2$ is even because $2b^2$ is divisible by 2 and therefore $a$ is also even since a square of an odd number is always odd. We can thus write $a$ as $a = 2c$ with some constant $c$.
5. Thus $2b^2 = a^2 = (2c^2) = 4c^2$ which reduces to $b^2 = 2c^2$. So by the same logic as in step 4.), $b$ is even. But if both $a$ and $b$ are even they have a common factor, 2, which contradicts our hypothesis, thus it is false and indeed $\sqrt{2}$ is irrational as it cannot be written as a fraction of two integers.

- a curious consequence of the latter theorem is that the ratio between the square's diagonal and its side will always be irrational. Or in other words that the square's side length and diagonal length cannot be expressed as integer multiples of some common unit. This is true, because if we take the square's side as a unit of length, the diagonal $d$ can be expressed as $d^2 = I^2 + I^2 = 2$ (Pythagoras theorem). Therefore $d = \sqrt{2}$ and thus it is irrational.