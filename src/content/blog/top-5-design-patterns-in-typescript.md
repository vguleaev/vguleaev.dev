---
title: 'Top 5 Design Patterns in Typescript'
description: 'Lists of most common Design Patterns you can easy use in daily programming'
pubDate: 2025-01-04
image:
  url: './covers/top-5-design-patterns-in-typescript.png'
  alt: 'Blog post image'
tags: ['Javascript', 'Typescript', 'Design Patterns']
---

Design Patterns are something that every respectable software engineer needs to know, right?

At least that's what we are told. I did several attempts during my career to study them, and still most of them I have never implemented even once. Are they still relevant after 30 years? Is it worth learning them today?

These types of questions I've asked myself multiple times. There are 23 classic Design Patterns presented in [well-known book](https://en.wikipedia.org/wiki/Design_Patterns) written by Erich Gamma, Richard Helm, Ralph Johnson and John Vlissides (_also known as "Gang of Four" book_) in 1994.

In my opinion, mastering all of them is **completely unnecessary**.

But knowing some of them, most popular and less complicated can be beneficial for your career, especially if you work with corporate languages like Java and C#.

Since I work with Javascript, I will present my **top 5 most common** Design Patterns here with examples in Typescript. Let's go!

## Factory

We will start with most popular and most misunderstood pattern called **"Factory"**.

What is a Factory? Factory is very broad and ambiguous term, you are never sure what person exactly means when says "factory".

From the name you can understand that it **should produce** something, usually it produces objects. When you search for examples of this pattern in internet you will find something similar to this:

```typescript
interface Account {
  getPermissions(): string[];
}

class UserAccount implements Account {
  getPermissions() {
    return ['profile', 'feed'];
  }
}

class AdminAccount implements Account {
  getPermissions() {
    return ['profile', 'feed', 'settings'];
  }
}

class AccountFactory {
  createAccount(type: string): Account {
    switch (type) {
      case 'user':
        return new UserAccount();
      case 'admin':
        return new AdminAccount();
      default:
        throw new Error('Invalid account type.');
    }
  }
}
```

Is this a Factory? **Yes, it is**. Is this a Design Pattern? **Not really**.

Well at least it's not a design pattern described in the original "Gang of Four" book. In fact a pattern called "Factory" **does not even exist** in the book, instead there are "Factory Method" and "Abstract Factory" patterns. Those patterns heavily rely on inheritance and method overriding.

So do we still need to know this simple factory version?

Definitely yes, you can call it a "Simple Factory". It still does the job of the same pattern, which is **hiding the complexity of object creation**.

Imagine that object creation is complex, has many conditions or needs a lot of data for creation. Once you start to build many objects of similliar structure with small differences, then it's a sign you can use factory.

Should the produced objects share same interface? Definitely yes, at least partially, otherwise why they are produced by the same class?

`switch case` statement is not strictly necessary here. Decision of which type of object to create can come from outside of the Factory class. You can even create dedicated functions for each factory product.

```typescript
class Factory {
  createProductA() {}
  createProductB() {}
  createProductC() {}
}
```

This is still a factory class. Remember, the idea is to incapsulate object creation logic, and write client code for abstractions not concrete implementations. This means client should be able to work with any produced product in the same way.

## Builder

The second pattern I want to show you is called **"Builder"**.

It is also a creational design pattern same as Factory. Builder also can produce objects, but it constructs them **step by step** and can create **different variations** of the same object via some construction functions.

Similar to the factory pattern, it abstracts the complexity of object creation, allowing clients to use object without knowing how it was built.

Let's have a look at example:

```typescript
interface Request {
  method: 'GET' | 'POST' | 'DELETE';
  headers: string[];
  body: unknown;
}

class RequestBuilder {
  private result: Request = {
    method: 'GET',
    headers: [],
    body: null,
  };

  addHeaders(headers: string[]) {
    this.result.headers = headers;
    return this;
  }

  addMethod(method: 'GET' | 'POST' | 'DELETE') {
    this.result.method = method;
    return this;
  }

  addBody(body: unknown) {
    this.result.body = body;
    return this;
  }

  build() {
    return this.result;
  }
}
```

> Be aware, you need to implement a reset functionality, in case you want to build many objects with same builder multiple times.

This example shows a builder for HTTP Requests, where you have a default empty request and you can chain method calls to construct parts of the request as you like. Methods `addHeaders()`, `addMethod()` and `addBody()` are constuction functions that add parts to the result object. When building is finished client code can call `build()` to get the constructed object.

```typescript
const builder = new RequestBuilder();

const createUserRequest = builder.addMethod('POST').addBody(user).build();
```

Construction functions usually return reference to its instance (`this`) to allow them to be called in **Fluent interface** manner.

## Decorator

Third pattern in my list is called **"Decorator"**. It is a structural design pattern.

Structural patterns are all about objects relationships, specifically called [association](<https://en.wikipedia.org/wiki/Association_(object-oriented_programming)>). There are two types of association: [Object composition ("part-of")](https://en.wikipedia.org/wiki/Object_composition) and [Object aggregation ("has-a")](https://en.wikipedia.org/wiki/Object_composition#Aggregation).

Decorator pattern can dynamically **add new behavior to objects without changing their structure**. Every time you create a **wrapper** object that enriches others object behavior you implement a decorator pattern.

Let's have a look at this example:

```typescript
interface IDatabase {
  saveProduct(): void;
  updateProduct(): void;
}

class Database implements IDatabase {
  saveProduct() {
    // save product to database
  }
  updateProduct() {
    // update product in database
  }
}

class DbLoggingDecorator implements IDatabase {
  private database: IDatabase;

  constructor(database) {
    this.database = database;
  }
  saveProduct() {
    console.log('Logging saveProduct');
    this.database.saveProduct();
  }
  updateProduct() {
    console.log('Logging updateProduct');
    this.database.updateProduct();
  }
}

const db = new Database();
const dbWithLogging = new DbLoggingDecorator(db);
```

In this example we created `DbLoggingDecorator` to wrap existing `Database` class and implement logging to console for every function it has. This allows you to extend `Database` class functionality without changing it.

## Adapter

**Adapter** is another structural design pattern, which can connect two incompatible objects. In other words adapter is allowing **objects with incompatible interfaces to collaborate**.

This is a really great name, because you can imagine a cable adapter from real life and understand the idea. 🙂

Let's have a look at example:

```typescript
class LegacyPaymentSystem {
  pay(amount: number) {
    // pay in old way
  }
}

interface IModernPaymentSystem {
  process(amount: number);
}

class ModernPaymentSystem implements IModernPaymentSystem {
  process(amount: number) {
    // process through new system
  }
}

class PaymentAdapter implements IModernPaymentSystem {
  private legacyPaymentSystem: LegacyPaymentSystem;

  constructor() {
    this.legacyPaymentSystem = new LegacyPaymentSystem();
  }

  process(amount: number) {
    this.legacyPaymentSystem.pay(amount);
  }
}
```

Imagine we need to migrate our payment process to a new payment system. This change can be very complicated and dangerous, so we want to do it slowly and gradually.

Some parts of the system already use the new way of payments, but there are some places we still need to support the old method. Temporary or forever 🤷‍♂️.

For those places, we can introduce an `PaymentAdapter` class that will have **new interface** but internally uses **old functionality**. This allows us to have consistency without breaking our system.

Adapter acts like a bridge between the client code and existing implementation, enabling client to use the new interface while still relaying on the old implementation.

> Adapter pattern can also be used in reverse way, known as "Reverse Adapter".

## Strategy

The final pattern is called **"Strategy"**. It is a behavioral pattern.

You probably implemented it already without knowing it 😆 (_happens with many patterns actually, hello Facade?_).

Strategy allows you to define a **family of algorithms** with single interface which can be **used interchangeable**. Basically, when we have a set of operations that are repeated but implemented in different ways, we can use the strategy pattern.

Here is an example:

```typescript
interface ShippingStrategy {
  transport(order);
}

class AirTransporter implements ShippingStrategy {
  transport(order) {
    console.log('Air shipping');
  }
}

class NavalTransporter implements ShippingStrategy {
  transport(order) {
    console.log('Shipping by sea');
  }
}

class ShippingManager {
  private strategy: ShippingStrategy;

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  deliver(order) {
    this.strategy.transport(order);
  }
}
```

In this example we created `AirTransporter` and `NavalTransporter` strategies, which transport items in a different way but use the same interface. This allows us to easy support other strategies in future like `GroundTransporter` and so on.

Now we need to select a desired strategy based on some conditions and for this we can use `if else`, `switch case` or `HashMap` (_dictionary_). In the following example, we select shipping strategy based on customer region:

```typescript
const CUSTOMER_REGION = 'EU_REGION';

const strategiesMap = {
  EU_REGION: new NavalTransporter(),
  USA_REGION: new AirTransporter(),
};

const shippingManager = new ShippingManager();
shippingManager.setStrategy(strategiesMap[CUSTOMER_REGION]);
shippingManager.deliver({ item: 'item' }); // Shipping by sea
```

## Final

We have come to the end of my top 5 Design Patterns list! 🎉

In the end, I want to say that many Design Patterns are very close to each other. They are also flexible and
can be implemented in different ways which makes them even more alike. "Proxy", "Decorator", "Bridge" and "Adapter" are quite similar, same about "Command", "Template Method" and "Strategy". Some of them are very trivial like "Prototype" or "Facade" and you doubt why it even deserve to be a pattern.

This list can give you a rough overview of which patterns exist and are popular. Learning one can give you an idea about how others look like.

Hope you found this useful and learned something! 😃
