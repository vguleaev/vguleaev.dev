---
title: 'Basic Data Structures in Python'
description: 'Lets have a look at some basic data structures and their implementation in Python'
pubDate: 2023-11-18
image:
  url: './covers/basic-data-structures-in-python.png'
  alt: 'Blog post image'
tags: ['Python', 'Data Structures']
---

Python has several general purpose built-in data structures:

- List
- Tuple
- Dictionary
- Set

Let's have a look how we can use them and implement other data structures in Python!

## List

List or array is the most basic data structure and also most used. Every developer is familiar with lists in any programming langauge.

In Python list is mutable sequence of items, which is also stored **linear** in memory. It has methods like `append`, `insert`, `pop`, `index` and `sort`.

```python
items = [1, 2, 3]
items.append(4)

for i in items:
  print(i) # 1, 2, 3, 4
```

Lists are generally used to store collection of items. Lists performs the best in time complexity `O(1)` for **random access**. So get item by its index (if you know it of course) is super fast. But other operations like search, insert or remove element is much slower and on average has complexity of `O(n)` .

## Stack

Stack is list like data structure and also stores a collection of elements. The order of elements added or removed from stack is **LIFO** (Last In First Out).

Stack has two main operations `push` and `pop`, to add and remove elements from stack.

Let's try to implement stack in Python using built-in list data structure.

```python
class Stack:
  def __init__(self, items = []):
    self.__items = items

  def get_items(self):
    return self.__items

  def push(self, item):
    self.__items.append(item)

  def pop(self):
    return self.__items.pop()

  def peek(self):
    return self.__items[-1]

  def is_empty(self):
    return len(self.__items) == 0


stack = Stack([1, 2, 3])
stack.push(4)
stack.push(5)
stack.peek() # 5
stack.pop() # removed 5
print(stack.get_items()) # [1, 2, 3, 4]
```

## Queue

Queue is list like collection of elements. This is in contrast to a stack, it adds and removes elements in **FIFO** (First In First Out) order.

Queue has two main methods `enqueue` and `dequeue`, to add and remove elements from queue.

Let's try to implement stack in Python using built-in list data structure.

```python
class Queue:
  def __init__(self, items = []):
    self.__items = items

  def get_items(self):
    return self.__items

  def enqueue(self, item):
    self.__items.append(item)

  def dequeue(self):
    return self.__items.pop(0)

  def size(self):
    return len(self.__items)

  def is_empty(self):
    return len(self.__items) == 0


q = Queue()
q.enqueue('a')
q.enqueue('b')
q.enqueue('c')
q.dequeue()

print(q.get_items()) # ['b', 'c']
```

Main difference between stack and queue is that removing element is done from the end or the beging. Here it is achieved by using `pop(0)` which removes element at position zero, so beginning of the queue.

> It is very important to say that there is no need to implement stack and queue by yourself 😃. Actually they exist in Python in a form of another data structure called [deque](https://docs.python.org/3/library/collections.html#collections.deque).

## Deque

Deque (the name is pronounced “deck” and is short for “double-ended queue) is a generalization of stacks and queues from "collections" module.

Stack and queue should have `O(1)` complexity for insertion and deletion. **But list doesn't have it!** If you use list then complexity will be `O(n)`. So in short the correct way is to always use `deque` instead of implementing it yourself with list.

```python
from collections import deque

deq_as_queue = deque()

deq_as_queue.append('a')
deq_as_queue.append('b')
deq_as_queue.append('c')

deq_as_queue.popleft() # removes first element

print(deq_as_queue)  # deque(['b', 'c'])

deq_as_stack = deque()

deq_as_stack.append('a')
deq_as_stack.append('b')
deq_as_stack.append('c')

deq_as_stack.pop() # removes last element

print(deq_as_stack)  # deque(['a', 'b'])
```

## Linked List

There are several types of linked lists:

- Singly Linked list
- Doubly Linked list
- Circular Linked list

Let's have a look at **Singly Linked list** first, because it's the easiest. So what is a Linked List?

Linked List is represented as chain of nodes connected together. It contains nodes which has `value` and pointer to `next` node.

List usually have `head` so beginning of the list and `tail` so the end of the list. The last node should point to `None`.

Enough theory 😫... We can start implement our Singly Linked List in Python.

First we create a **Node** class. It will be very simple, just hold some data and have a reference to the next node.

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None
```

Then create a **LinkedList** class. It should have `head` and `tail` for start and end of list. Usually linked list have methods like `append` and `prepend`, to add new elements to the beginning or end of the list.

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self) -> None:
        self.head = None
        self.tail = None

    def append(self, value):
        new_node = Node(value)

        if self.head is None:
            self.head = new_node
            self.tail = new_node
            return

        self.tail.next = new_node
        self.tail = new_node

    def prepend(self, value):
        new_node = Node(value)

        if self.head is None:
            self.head = new_node
            self.tail = new_node
            return

        new_node.next = self.head
        self.head = new_node
```

Now we can have a closer look what's going on. In constructor we define `head` and `tail` with `None` values, because list is empty in the beginning.

When you append an item to the list, in case list is empty we need to set our head and tail to first node. Latter if you append more items what we need to do is only to modify our current tail pointer to new node and set new item as tail.

When we insert in the beginning, we should again handle case when list is empty, in case it is not we take current head and set it as pointer for new node also replacing head.

Both these operations of insertion at the start and adding to the end of list take constant time `O(1)`. This is the **main difference** between linked list and arrays. Remember that arrays are linear structure (also in memory), but linked list is not. When you add items to the beging of the array all other elements need to be shifted to the right which takes `O(n)` time.

However, to insert an element into linked list at certain index takes `0(n)`!! But for arrays its constant time `O(1)`, because arrays support random access. And this is a **second big difference** between them. This means it is a tradeoff when using these data structures.

To demonstrate why get, insert or remove element by index takes `O(n)` we will implement an `insert` method.

```python
# ...
def insert(self, value, position):
    new_node = Node(value)

    if position == 0:
        self.prepend(value)
        return

    counter = 0
    leader = self.head
    while counter < position - 1:
        leader = leader.next
        counter += 1

    new_node.next = leader.next
    leader.next = new_node
```

As you can see to insert an element at certain position we should iterate with `while` loop over all nodes starting at head and also keeping track of our iterations.
Then we can replace found node and assign new node next to it. Very similar idea would be to delete element at certain position or print list.

Let's also add a print method.

```python
# ...
def print_list(self):
    current = self.head

    while current is not None:
        print(current.value)
        current = current.next
```

We again use `while` loop to start from head and iterate through every node until we found last one which has `next` set to `None`. Now let's see how we can use this.

```python
list = LinkedList()

list.append('A')
list.append('B')
list.prepend('C')
list.insert('D', 1)

list.print_list() # C D A B
```

Doubly Linked list is implemented in a very similar way just every node has also a pointer to previous node. This gives us ability to traverse list also backwards and insert elements before certain position.

With Circular Linked list `tail` is connected to `head` wich basically makes it connected as a circle. This gives us ability to traverse list in rounds, so there is no end of the list.

> Again there is no need to implement Linked List yourself in Python 😬! Because we can also use `deque` here. Actually `deque` is represented internally as a doubly linked list. You can append and prepend items with constant time `O(1)`. For more reference about time complexity click [here](https://wiki.python.org/moin/TimeComplexity).

## Tuple

Tuple is a built-in data structure in Python. It is similar to a list with one main difference: they are immutable. Yes, once tuple is defined it can not be changed, it's a fixed sequence of items in particular order.

```python
book = ("The Hobbit", "John Ronald Reuel Tolkien", 1937)

print(len(book))  # 3
print(book[2])  # 1937
print(book[1:])  # ('John Ronald Reuel Tolkien', 1937)
print("The Hobbit" in book)  # True
```

## Dictionary

Dictionary sometimes also called HashTable or HashMap, is a built-in data structure to store _key: value_ pairs. The main purpose is to store some data by its key as index and then get item by it's key.

```python
book = {
    "title": "The Hobbit",
    "author": "John Ronald Reuel Tolkien",
    "year": 1937
}

print(len(book))  # 3
print(book["year"])  # 1937
print(book.get("author"))  # John Ronald Reuel Tolkien
print(book.keys())  # ['title', 'author', 'year']
print(book.values())  # ['The Hobbit', 'John Ronald Reuel Tolkien', 1937]
```

Dictionary is probably one of the most useful data structures, because of its amazing performance. You can check here for a [dict](https://wiki.python.org/moin/TimeComplexity) to understand it. Dictionary has `O(1)` time complexity for operations like: search, get, set, delete.

To iterate over `dict` we can call `items()` method. It returns a tuple of `(key,value)` on every iteration. 🧐

```python
for key, value in book.items():
    print(key, value) # title The Hobbit, author John Ronald Reuel Tolkien, year 1937
```

## Set

Set is a built-in data structure in Python. It's a mutable data structure similar to list, but it does not allow **duplicate** values. It is often used to check value membership and eliminate duplicate items.

```python
fruits = {'apple', 'orange', 'pear', 'banana'}
fruits.add('pineapple')  # adds pineapple
fruits.discard('pear')  # removes pear
print('pear' in fruits)  # False
```

> Be careful when you define empty `set`! If you define it with empty curly braces `{}` it will be a dictionary. If you need to initialize an empty set then
> call it's initializer `set()`.

```python
empty_dict = {} # empty dict
empty_set = set() # empty set
```

Sets in Python come form math, specifically from Set Theory 🤓. If you familiar with this topic, then you know about set operations: **union, intersection, and difference.**

Let me give you some examples:

```python
set_A = {1, 2, 3}
set_B = {2, 4, 5}

print(set_A | set_B)  # Union { 1, 2, 3, 4, 5 }
print(set_A & set_B)  # Intersection { 2 }
print(set_A - set_B)  # Difference { 1, 3 }
```

## That's it

Thank you for reading, I hope it was interesting and not very complicated 😄!

I plan to add more content about me learning Python. Stay tuned and see you soon! 🐍
