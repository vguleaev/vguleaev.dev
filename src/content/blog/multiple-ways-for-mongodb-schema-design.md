---
title: 'Multiple ways for MongoDB Schema design'
description: 'A detailed comparison of different approaches to handling database relationships in MongoDB versus SQL'
pubDate: 2025-03-08
image:
  url: './covers/multiple-ways-for-mongodb-schema-design.png'
  alt: 'Blog post image'
tags: ['MongoDb', 'SQL', 'NoSQL']
---

Today, we're going to dive a bit into MongoDB schema design. As you probably know, **MongoDB** is a [NoSQL](https://en.wikipedia.org/wiki/NoSQL) database known for its flexibility and scalability.

Since there are no strict schema rules, there are multiple ways to handle relationships in MongoDB. Most of these approaches have both SQL and NoSQL ways of doing things. In this article, we will cover all three types of entity relationships: **one-to-one**, **one-to-many** and **many-to-many**.

Let's begin! 🙂

## One-to-one

One-to-one is a default relationship in Mongodb, because data is represented as documents. It's the simplest one and can be handled in two ways:

### **1. Embedded documents** - this is the most common way to handle one-to-one relationships in MongoDB.

You can embed one document inside another document.

```json
{
  // users collection
  "_id": 1,
  "name": "John Doe",
  "address": {
    "city": "New York",
    "street": "5th Avenue"
  }
}
```

In this example `user` document has sub-document `address`. This is a one-to-one relationship between `user` and `address`.

### **2. Reference** - this can be called a "SQL way" to handle one-to-one relationships in MongoDB.

You add a reference to another document and add a unique index to that field.

```json
// users collection
{
  "_id": 1,
  "name": "John Doe",
}

// addresses collection
{
  "userId": 1,  <-- reference to user
  "city": "New York",
  "street": "5th Avenue"
}
```

In this example `address` document has `userId` field _(reference)_ which is the same as `_id` field in `user` document.

> To guarantee that there is **only one** address for each user you should create a **unique index** on `userId` field or use it as a primary key.

The first approach of **embedding is a preferred way** in MongoDB, because it allows you to fetch all data in a single query. You most likely will use this approach in all cases. 💪

The second approach of referencing can be useful when you want to separate data logically and keep the main document smaller and more readable.

## One-to-many

One-to-many relationships in Mongodb also can be represented in two ways:

### **1. Embedded documents array** - this is the "MongoDb way" to handle one-to-many relationships.

You can embed an array of documents inside another document.

```json
{
  // users collection
  "_id": 1,
  "name": "John Doe",
  "orders": [
    {
      "orderId": 1,
      "product": "Laptop"
    },
    {
      "orderId": 2,
      "product": "Phone"
    }
  ]
}
```

This way supposed to be a traditional Mongodb way to handle one-to-many relationships. It's simple and efficient, because you can fetch all data **in a single query**.

But in reality this approach has quite some disadvantages 😅.

If you have a lot of orders for one user, the document can grow too large and hit the **16MB document size limit**.

Also, if you need to update an order, you need to update all user documents that contain this order. This creates a risk of inconsistency and **data duplication**. 😢

You can improve this design and only store the order ids in the user document. This way you can update orders **independently**.

```json
{
  // users collection
  "_id": 1,
  "name": "John Doe",
  "orderIds": [10, 11, 12]
}

// orders collection
{
  "_id": 10,
  "product": "Laptop"
}
```

But this approach is not perfect either. This is a classic trade-off between read and write performance of software development.

Now you still need to fetch orders **separately** and it's not easy to query orders for all users.

```js
const userOrders = await Orders.findMany({ _id: { $in: user.orderIds } });
```

Imagine user has thousands of orders, the size of `orderIds` array can grow too large and this is considered an [anti-pattern](https://www.mongodb.com/docs/atlas/schema-suggestions/avoid-unbounded-arrays/).

### **2. Reference** - this is the "SQL way" to handle one-to-many relationships in MongoDB.

Instead of embedding, you store the relationship in the child document with a reference field.

```json
// users collection
{
  "_id": 1,
  "name": "John Doe"
}

// orders collection
{
  "_id": 10,
  "userId": 1, <-- reference to user
  "product": "Laptop"
}
```

Now there is no risk of hitting the document size limit, and you can update orders independently. Also the query looks simpler. 😍

```js
const userOrders = await Orders.findMany({ userId: user._id });
```

In my personal opinion, the **referencing approach is better and more safe**. You can easily query orders for all users and update orders independently and I cannot imagine a good use case for **embedding** in one-to-many relationships. 👎

## Many-to-many

Many-to-many relationships in MongoDB again can be represented in two ways:

### **1. Embedded documents arrays** - this is the "MongoDb way" to handle many-to-many relationships.

You can store an array of IDs inside both collections.

For example, _students and courses_. One student can have many courses and one course can have many students.

```json
// students collection
{
  "_id": 1,
  "name": "John Doe",
  "courseIds": [10, 11, 12]
}

// courses collection
{
  "_id": 10,
  "name": "Computer Science",
  "studentIds": [1, 2, 3]
}
```

Monbodb does not have a **JOIN** operation like SQL databases, so you need to fetch data separately.

```js
const studentCourses = await Courses.findMany({ studentIds: student._id });
const courseStudents = await Students.findMany({ courseIds: course._id });
```

Here you need to be again careful with the size of relationships arrays, because they can grow too large.

### **2. Junction Collection (Reference Table)** - this is the "SQL way" to handle many-to-many relationships in MongoDB.

You can create a separate collection that stores the relationships between two collections. This is also called a **reference table** or **junction collection**.

```json
// students collection
{
  "_id": 1,
  "name": "John Doe"
}

// courses collection
{
  "_id": 10,
  "name": "Computer Science"
}

// student-courses collection
{
  "studentId": 1,
  "courseId": 10
}
```

Creating an intermediate table is a classic SQL solution to many-to-many relationships.

This approach is more flexible and scalable. You can easily add more fields to the junction collection, like `enrollmentDate`, `grade`, etc.

Instead of JOINs you can use `aggregate` to fetch data from multiple collections.

```js
const studentCourses = await StudentCourses.aggregate([
  {
    $match: { studentId: student._id },
  },
  {
    $lookup: {
      from: 'courses',
      localField: 'courseId',
      foreignField: '_id',
      as: 'course',
    },
  },
]);
```

## Conclusion

I would recommend to read about [Mongo Schema Design](https://docs.mongodb.com/manual/core/data-modeling-introduction/) and [Mongo Design Patterns](https://www.mongodb.com/blog/post/building-with-patterns-a-summary) to get more information.

In this article, we compared **embedding** and **referencing** for one-to-one and one-to-many relationships, and **junction collections** for many-to-many relationships.

My advice would be:

- use **embedding** if the relationship is small and is not updated frequently
- use **referencing** when relationship is large and dynamic.

I personally feel like most real world application would use **referencing** and **junction collections** in all cases, because it's more safe and flexible. But you should always consider your specific use case and requirements.

I wonder if everyone is using MongoDB in a same SQL way like I do? 🤔

Thanks for reading, see you in the next article! 🚀
