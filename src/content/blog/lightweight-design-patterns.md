---
title: 'Lightweight design patterns'
description: 'Explore some lightweight design patterns with code examples in Javascript'
pubDate: 2024-10-20
image:
  url: './covers/lightweight-design-patterns.png'
  alt: 'Blog post image'
tags: ['Design Patterns']
---

Design patterns are created to solve complex problems. While they can be effective, they often introduce additional abstraction and complexity.

As developers, we frequently solve problems using smaller, more focused patterns, which I refer to as "lite design patterns." After 8 years of experience as a software engineer, I have created a collection of these lightweight patterns. They are smaller, simpler and easier to use compared to well-known patterns from the [Gang of Four](https://en.wikipedia.org/wiki/Design_Patterns) book.

Here are a **few practical, lightweight patterns** that you can use in everyday programming.

## Return Early

While not exactly a design pattern, this technique is one I personally love and use frequently in my coding. That's why I still wanted to include it in this list.

The idea is to exit function as soon as further execution is no longer necessary. When main logic of the function is inside nested conditions,
you "return early" when certain conditions are met. By this you reduce level of nesting and improve readability of your function.

Example of code:

```javascript
function getUserData(user) {
  if (user) {
    if (user.isGuest) {
      return user.guestData;
    } else {
      return user.profileData;
    }
  }

  return null;
}
```

After applying "return early":

```javascript
function getUserData(user) {
  if (!user) {
    return null;
  }

  if (user.isGuest) {
    return user.guestData;
  }

  return user.profileData;
}
```

Returning early reduces the number of indentation levels and `else` branches. In my opinion, this makes code more readable and cleaner.

## Pattern "try"

Prefix a function name with _"try"_ when you want to indicate that an operation might fail, but you **don't want to throw an exception** to control the flow. Instead, you want to use the success or failure of the operation to determine subsequent actions.

Often "try" function returns a boolean and can be used inside conditionals.

```javascript
function trySendEmail(data) {
  if (!data.isValid) {
    return false;
  }

  try {
    emailService.send(data);
    return true;
  } catch {
    return false;
  }
}

// Usage
if (trySendEmail(data)) {
  console.log('Email sent');
}
```

> In many cases "try" functions have a `try catch` inside.

## Pattern "success, result"

Sometimes, you want to indicate the success of an operation and, in case of success, also return some result. In this case, you can use the _"success, result"_ pattern.

This is a variation of the "try" pattern but returns more information about operation result. This pattern is particularly useful for API requests where you often need to check if the request was successful and then process the returned data.

Your function should return an object similar to `{ success: boolean, result: any }`.

```javascript
function fetchData(url) {
  try {
    const response = fetch(url);
    if (response.ok) {
      return { success: true, result: response.data };
    }
  } catch (error) {
    console.log('Error fetching data');
    return { success: false, result: null };
  }
}

// Usage
const { success, result } = fetchData();
if (success) {
  console.log('Data fetched:', result);
}
```

This can be useful when you **don't want to throw an exception** but still need to know that operation failed.

This pattern clearly communicates the outcome of an operation. It avoids using exceptions for control flow, simplifies error handling, avoid wrapping every call in a try-catch blocks, easy to extend and
provides consistency with naming.

## Patern "valueOrDefault"

This pattern used to ensure that a function returns a meaningful value, even when the desired value is not available or invalid. This pattern is particularly useful in scenarios where you want to avoid unexpected `null` or `undefined` values and provide a desired _default_ instead.

Default value is usually provided as argument to a function.

```javascript
function parseNumberOrDefault(value, defaultValue) {
  const parsed = parseInt(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

// Usage
parseNumberOrDefault('123', 0); // returns 123
parseNumberOrDefault('abc', 0); // returns 0
```

This ensures that the function always returns a valid result, making the code more robust and predictable.

## Guard Clause

Guard Clause pattern is a part of defensive programming technique. Used to validate certain rule before allowing code execution to proceed. If a rule is broken, you stop execution by **throwing an exception** or **returning early**.

Common prefixes for guard functions are "assert", "ensure", "verify" and "validate".

```javascript
function assertUserActive(user) {
  if (!user.isActive) {
    throw new Error('User must be active');
  }
}

// Usage
function setUserRole(user, role) {
  assertUserActive(user);
  user.role = role;
}
```

Perfect examples of guard clauses include authentication middlewares and request input data validation in API servers.

Some might argue guard clauses can either _throw or return early_. I personally use the term "guard clauses" for situations that throw exceptions. Just my opinion 😎.

## Pattern "with"

The "with" pattern is a programming technique that is closely related to the Decorator Pattern. It involves creating a higher-order function that enhances or modifies the behavior of a given function by wrapping it with additional functionality.

A "with" function should accept a callback function as its argument and perform additional actions before or after executing it.

```javascript
function withTiming(action) {
  const startTime = performance.now();
  action();
  const endTime = performance.now();
  console.log('Execution time:', endTime - startTime, 'milliseconds');
}

function saveToDatabase() {
  // saving
}

withTiming(saveToDatabase);
```

Practical examples of "with" pattern can be:

- withErrorHandling
- withLogging
- withCaching
- withThrottle
- withRateLimit

By using the "with" pattern, you can enhance the functionality of other functions in a modular and reusable way. It focus on achieving reusability and possibility to copy-paste common logic from project to project.

## Final

This list provides several **lightweight design patterns** that should help you simplify everyday coding tasks and keep the code clean and readable 😍.

Do you think the list is not complete? Please reach me out so I can add more patterns to the list!

Happy hacking! 😃
