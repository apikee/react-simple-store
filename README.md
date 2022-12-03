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

2. Use store values in components

```tsx
const MyComponent = () => {
  const name = store.useStoreValue((values) => values.name);

  return <div>{name}</div>;
};
```

3. Change the store values

```tsx
// Always use the store.set(newState) function when changing the store values
<button onClick={() => store.set({ age: Math.floor(Math.random() * 60) })}>
  Change Store Value
</button>
```

4. If needed, get the store values outside of components

```tsx
// Note that if used in component this way, React will not re-render component when value changes
// Always use store.useStoreValue(selector) in components to get the store value
const { name, age } = store.get();
```

5. If needed, create computed properties from several separate stores through custom hooks

```tsx
const store1 = simpleStore({ firstName: "John" });
const store2 = simpleStore({ lastName: "Doe" });

const useFullName = () => {
  const firstName = store1.useStoreValue(({ firstName }) => firstName);
  const lastName = store1.useStoreValue(({ lastName }) => lastName);

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
import React from "react";
import { simpleStore } from "@apikee/react-simple-store";

const defaultValue = {
  name: "John",
  age: 32,
};

// Default value has to be object
const store = simpleStore(defaultValue);

const ComponentOne = () => {
  // Pass selector function as an argument that returns the value you want from the store
  const name = store.useStoreValue((values) => values.name);

  useEffect(() => {
    console.log("Name Changed");
  }, [name]);

  return (
    // Changing `age` property that is used in different component
    <button onClick={() => store.set({ age: Math.floor(Math.random() * 60) })}>
      Change Age
    </button>
  );
};

const ComponentTwo = () => {
  const age = store.useStoreValue((values) => values.age);

  const [newName, setNewName] = useState("");

  useEffect(() => {
    console.log("Age Changed");
  }, [age]);

  return (
    <div>
      <input value={newName} onChange={(e) => setNewName(e.target.value)} />

      {/* Changing `name` property that is used in different component */}
      <button onClick={() => store.set({ name: newName })}>Change Age</button>
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
