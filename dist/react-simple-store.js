import { useState as l, useEffect as p } from "react";
const c = (r, e) => {
  if (!r)
    throw new Error(e || "Assertion failed");
}, y = (r) => {
  c(
    typeof r == "object" && !Array.isArray(r) && r !== null,
    "react-simple-store: default value has to be object"
  );
  let e = r;
  const s = [], i = () => {
    for (const t of s)
      t(e);
  };
  return {
    get: () => e,
    set: (t) => {
      c(
        typeof t == "object" && !Array.isArray(t) && t !== null,
        "react-simple-store: new value has to be object"
      ), e = { ...e, ...t }, i();
    },
    useStoreValue: (t) => {
      const [a, f] = l(e), b = (o) => {
        f((n) => t(o) !== t(n) ? o : n);
      };
      return p(() => {
        s.push(b);
      }, []), t(a);
    }
  };
};
export {
  y as simpleStore
};
