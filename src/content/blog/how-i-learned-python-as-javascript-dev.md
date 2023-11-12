---
title: 'How I learned Python as Javascript dev'
description: 'My journey how I study Python being Javascript developer'
pubDate: 2023-11-02
image:
  url: './covers/how-i-learned-python-as-javascript-dev.png'
  alt: 'Blog post image'
tags: ['Python', 'Javascript']
---

Python and Javascript share many similarities. They are both interpreted languages, dynamically typed and support both object-oriented and functional programming.

But syntax has a lot of differences, starting with tab indentation that plays big role in Python and missing curly brackets from C-family style.

So now let's dive into in! 🏊🏼‍♂️

**Important:** If you have [Copilot](https://github.com/features/copilot) then turn it off 🛑! It will only do harm in the beginning!

## Variables

In Python declaring variable is very short. Just give it a name. No const, let, var etc..

```python
age = 21

full_name = 'John Doe'
```

## Naming

Python is using `snake_case` instead of common `camelCase` from Javascript. I personally don't care, both are fine. One saves chars but hurts readability. Common trade of in software development. 🤷

## Comments

Comments just `#` instead `//`.

```python
# this is a comment in Python
```

## Primitive data types

Almost the same, just boolean is uppercase 🥲.

```python
salary = 50000 # int
price = 13.55 # float
name = 'John' # str
is_active = True # bool
```

## Arithmetic operators

Numbers in Python work close to Javascript. Most operators are exactly the same: Addition, Subtraction, Modulo, Multiplication, Division.

But there is one extra `//` its called Floor Division. Let's have a look at the example to understand:

```python
print(12.4 / 2) # 6.2
print(12.4 // 2) # 6.0
```

In floor division, the result is floored to the nearest smaller integer. It is also known as **integer division**.

## Comparison operators

No difference here in syntax, but a big difference in type comparison.

```python
print('10' == 10) # False
```

As we all know in magnificent Javascript 😅 it will be `true` and you must put triple equal sign `===` to make it `false`.

## Logical operators

It took some time to get used to this. Python doesn't have `&&`, `||` and `!`. Instead you use keywords `and`, `or`, `not`.

```python
result = True and False
print(result) # False
```

## Strings

There is a lot of cool stuff when working with strings in Python. One thing a really liked is string multiplication.

```python
print('W' * 3) # WWW
```

In Javascript it will be just `Nan`. Also search in string is much simpler:

```python
print('World' in 'Hello World') # True
```

## Array

Arrays syntax is exactly the same. No difference here.

```python
my_list = [1, 2.5, "A string", True] # you can put difference data types
my_list[0] # 1
```

## Conditional statements

If-else block in Python looks like this. Mind the `:` in the end and indentation!

```python
age = 18

if age >= 18:
    print("Adult")
else:
    print("Too young")
```

One thing that I find very ugly in Python it's ternary operator.

```python
age = 18

print('Adult') if age >= 18 else print('Too young')
```

I know it reads more like human langauge but I just find it confusing because condition is in the middle 😢.

```javascript
// In js
const age = 18;
age >= 18 ? console.log('Adult') : console.log('Too young');
```

## Functions

Simple syntax just use `def` instead of `function` and don't forget no curly brackets no semicolons:

```python
def add(a, b):
    return a + b
```

In Python there is also `lambda` keyword for one line functions.

```python
add = lambda a, b : a + b
add(1,2) # 3
```

**Note**: In Python number of arguments passed to the function should match the number of parameters defined. Otherwise it will be an error! 💥

## Loops

In Javascript we have many ways to iterate (foreach, forof, forin, for, while). But there are only **two loops** in Python: for and while.

```python
for i in range(10): # a sequence from 0 to 9
  print(i)
```

Note that we don't even need round parenthesis `()`! Also `range` is very handy builtin function. You can also define start and step.

```python
for i in range(1, 10, 2): # a sequence from 1 to 10 with step 2
  print(i) # 1 3 5 7 9
```

Iterating over array is extremely easy and logical.

```python
arr = [1, 2, 3]
for i in arr:
  print(i) # 1 2 3
```

## None vs null

Javascript has horrible mess with `null` and `undefined` values. Which are the same but not really the same. In Python you use `None` instead.

## Type operators

Unfortunately Javascript has very sad situation when it comes to type checking 😶. Too much stuff goes wrong. For example array is an object and null is also an object.

```javascript
function func() {}
const obj = {};

console.log(typeof 10); // number
console.log(typeof 'name'); // string
console.log(typeof [1, 2, 3]); // object!
console.log(typeof true); // boolean
console.log(typeof func); // function
console.log(typeof obj); // object
console.log(typeof null); // object!!
console.log(typeof undefined); // undefined
```

While in Python you don't have this problem and everything is very clear.

```python
def func():
    pass

obj = {}

print(type(10)) #int
print(type('name')) # str
print(type([1,2,3])) # list
print(type(True)) # bool
print(type(func)) # function
print(type(obj)) # dict
print(type(None)) # NoneType
```

## Classes

Classes in Python work similar as in Javascript. Defined by keyword `class` and class name. Constructor is called in Python `__init__`.

The first argument is `self` which is a replacement of `this` to access current class instance. This is a bit weird for me because you must pass it as argument. 😕

```python
class Person:
    def __init__(self, first_name, last_name):
        self.__first_name = first_name
        self.__last_name = last_name

    def get_full_name(self):
        return self.__first_name + ' ' + self.__last_name

person = Person('John', 'Doe')

print(person.get_full_name()) # John Doe
```

## Builtin functions

Python has very rich standard library with many utility functions. I will show just some of them.

`len()` returns length of array or string.

```python
len([1, 2, 3]) # 3
len("Hello") # 5
```

`sum()` returns sums of items of an iteratable

```python
sum([10, 10, 10]) # 30
```

`id()` returns identity of an object

```python
arr1 = [1, 2, 3]
arr2 = [1, 2 ,3]

arr1 == arr2 # True
id(arr1) == id(arr2) # False
```

When we compared two arrays with same items the `equality` check returned true, because they are the same. But when we do `identity` check it returns false, because each array points to a different index in memory (not the same instance).

`map` returns an iterator that applies function to every item of iterable.

```python
def double(element):
  return element * 2

nums = [1, 2, 3, 4]
doubled = map(double, nums)

print(list(doubled)) # 2 4 6 8
```

## That's it

Thank you for reading, I hope it was interesting!

I plan to add more content about me learning Python. Stay tuned and see you soon! 🐍
