## react-simple-store

Simple and easy to use global store for React

Usage:

1. Create store

```tsx
import { simpleStore } from "@apikee/react-simple-store";

const store = simpleStore({
  name: "John",
  age: 32,
});
```

With Typescript:

```tsx
import { simpleStore } from "@apikee/react-simple-store";

interface User {
  name: string;
  age: number;
}

const store = simpleStore<User>({
  name: "John",
  age: 32,
});
```

2. Use store data in components

```tsx
const MyComponent = () => {
  const data = store.useStore();

  return <div>{data.name}</div>;
};
```

3. Change store values from inside a component

```tsx
// ._set() method is a part of the data object, you can use it to change the store data
<button onClick={() => data._set({ age: Math.floor(Math.random() * 60) })}>
  Change Age
</button>
```

Or outside of component

```tsx
const store = simpleStore({
  name: "John",
  age: 32,
});

store.set({ age: Math.floor(Math.random() * 60) });
// Components gets re-rendered accordingly
```

4. Get store values outside of components

```tsx
// Note that if used in component this way, React will not re-render component when value changes
// Always use store.useStore() in components to get the store values
const { name, age } = store.get();
```

5. If needed, create computed properties from several separate stores through custom hooks

```tsx
const store1 = simpleStore({ firstName: "John" });
const store2 = simpleStore({ lastName: "Doe" });

const useFullName = () => {
  const { firstName } = store1.useStore();
  const { lastName } = store2.useStore();

  return `${firstName} ${lastName}`;
};

const MyComponent = () => {
  // Component gets re-rendered if firstName or lastName changes
  const fullName = useFullName();

  ...
}
```

Example:

```tsx
import React, { useEffect, useState } from "react";
import { simpleStore } from "@apikee/react-simple-store";

const defaultValue = {
  name: "John",
  age: 32,
};

// Default value has to be object
const store = simpleStore(defaultValue);

const ComponentOne = () => {
  const data = store.useStore();

  useEffect(() => {
    console.log("Name Changed");
  }, [data.name]);

  return (
    <>
      <div>My name is {data.name}</div>

      {/* Changing `age` property that is used in different component */}
      <button
        onClick={() => data._set({ age: Math.floor(Math.random() * 60) })}
      >
        Change Age
      </button>
    </>
  );
};

const ComponentTwo = () => {
  const data = store.useStore();

  const [newName, setNewName] = useState("");

  useEffect(() => {
    console.log("Age Changed");
  }, [data.age]);

  return (
    <div>
      <div>My age is {data.age}</div>
      <input value={newName} onChange={(e) => setNewName(e.target.value)} />

      {/* Changing `name` property that is used in different component */}
      <button onClick={() => data._set({ name: newName })}>Change Name</button>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <ComponentOne />
      <ComponentTwo />
    </div>
  );
};
```
