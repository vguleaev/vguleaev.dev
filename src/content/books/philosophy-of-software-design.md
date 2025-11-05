---
title: 'A Philosophy of Software Design'
description: 'Lessons learned from reading A Philosophy of Software Design by John Ousterhout.'
author: 'John Ousterhout'
image:
  url: '../books/covers/philosophy-of-software-design.jpg'
  alt: 'Book cover placeholder'
tags: ['Books']
finishedDate: 2025-09-01
---

This is a fantastic book about how to understand and manage complexity of software systems. It contains a collection of design smells and red flags with very straightforward examples. I especially liked code examples, red flags list and "Taking it too far" sections.

In this book review I will list my main takeaways for every chapter of the book below.

## Chapter 1. Introduction

Complexity will still **increase over time**, in spite of our best efforts, but simpler designs allow us to build more powerful systems before complexity becomes overwhelming.

There are two approaches to fight complexity:

- First approach is by making code **simpler** and more **obvious**.

- Second approach is to **encapsulating complexity**, so that programmers can work on system without being exposed to all of its complexity at once. This is called _modular design_.

Incremental nature of software development means that software design is never done. You have to spend some fraction of your time on continuous design improvements.

As a software developer you should always be thinking about **reducing complexity**.

When applying ideas from this book, its important to use moderation. When you take any design idea to its extreme, you will probably end up in a bad place.

## Chapter 2. The Nature of Complexity

This book is about how to design software systems to minimize their complexity. The ability to recognize complexity is a crucial design skill.

Complexity is anything related to the structure of a software system that makes it **hard to understand and modify**.

You can also think of complexity in terms of cost and benefit. In a complex system it takes a lot of work to implement even small improvements.

If a system has a few parts that are very complicated, but those parts almost never need to be touched, then they don't have much impact on the overall complexity of the system.

**Isolating complexity** in a place where it will never be seen is almost as good as eliminating the complexity entirely.

If you write a piece of code and for you it seems simple, but other people think its complex, then it is complex. Your job is to create code that others can also work with easily.

Symptoms of complexity:

- **Change amplification**: simple change requires code modification in many different places.

- **Cognitive load**: how much developer needs to know in order to complete a task.

- **Unknown unknowns**: hard to find which places must be modified to complete a task.

Sometimes solution that requires more lines of code is actually simpler, because it reduces cognitive load.

From all three symptoms "unknown unknowns" is the worst, because there is no way to find out where is the problem or even whether there is a problem at all.

One of the most important goals of good design is for a system **to be obvious**.

It's easy to convince yourself that a little bit of complexity introduced by your current change is no big deal. However if every developer takes this approach, complexity accumulates rapidly.

## Chapter 3. Working Code Isn't Enough

There are two approaches to programming: **strategic** and **tactical**.

Many organizations encourage tactical mindset, focused on getting features as quickly as possible. However if you want a good design, you must take a more strategic approach where you invest time to produce clean designs.

In tactical approach your main focus is get something working, perhaps you have a hard deadline. As a result you don't spend time planning for the future. This is how systems become complicated.

If you program tactically, each change will contribute a little bit of complexity. Each change probably seems like reasonable compromise in order to finish current task quickly. However, the complexities accumulate rapidly, especially if everyone is programming tactically. Latter you will beging to wish you hadn't taken those shortcuts.

Good software engineers realize that **working code isn't enough**. It is not acceptable to introduce complexity just to finish your current task faster.

In strategic approach your primary goal is to produce clean designs. This requires an investment mindset. This will slowdown you in the short term, but they will speed you up in the long term.

The term _"technical debt"_ is often used to describe the problems caused by tactical programming. By programming tactically you are borrowing time from the future.

Thus, the best approach is to make lots of small investments on continuous basis, spending around 10-20% of your total development time on **investments**.
