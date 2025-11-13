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

This is a fantastic book about how to detect and manage complexity of software systems. It is written by _John Ousterhout_, a professor of computer science at Stanford University.

This book is quite small and could be read in a couple of days. However, it is packed with valuable insights and practical advice for software engineers of all levels.

As we can guess from the title, this book is about philosophy of software design. It does not focus on specific programming languages, frameworks, or tools. Instead, it discusses general principles and best practices that can be applied to any software project. But it actually contains concrete advices and code examples to demonstrate the concepts.

## Core chapters

I read all the chapters, but I found the following ones particularly useful:

- **Chapter 2: Nature of Complexity** - This chapter defines what complexity is and why it is the main enemy of good software design. It also discusses what are the main sources of complexity and types of them. This helped to detect problems in existing codebases.
- **Chapter 3: Working Code Isn't Enough** - This chapter is about tactical and strategic programming. It explains why sacrificing good design for short-term gains is a bad idea in the long run.
- **Chapter 4: Modules Should be Deep** - This chapter explains probably the main concept of the book. Modular design hard to achieve, but it is worth the effort. It discusses how to create deep modules with simple interfaces and rich functionality.
- **Chapter 5: Information Hiding** - This chapter discusses the importance hiding implementation details to simplify the interfaces and reduce dependencies between modules.
- **Chapter 6: General Purpose Modules** - This chapter explains why general-purpose modules are usually deeper than special-purpose ones. It discusses how important to separate general-purpose and special-purpose code.

## Key Takeaways

In the end of the book you can find a **summary of Design Principles** and **summary of Red Flags** to look for in your codebase. Probably author thought that it could be used as cheat sheet or reference during code reviews. This I found particularly useful and practical.

I can definitely recommend this book to anyone who is interested in improving their software design skills and writing better code. This book helped to analyze code deeper and think twice before introducing new complexity to the system.

Happy reading! 📚
