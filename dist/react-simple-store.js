import { useState as h, useEffect as j } from "react";
const d = (t, r) => {
  if (!t)
    throw new Error(r || "Assertion failed");
}, _ = (t) => {
  d(
    typeof t == "object" && !Array.isArray(t) && t !== null,
    "react-simple-store: default value has to be object"
  );
  const r = "react-simple-store-set";
  let n = t;
  const f = (e) => {
    document.dispatchEvent(new CustomEvent(r, { detail: { changes: e } }));
  }, l = (e) => {
    d(
      typeof e == "object" && !Array.isArray(e) && e !== null,
      "react-simple-store: new value has to be object"
    ), n = { ...n, ...e }, f(e);
  }, m = () => ({ ...n, _set: l }), u = (e) => new Proxy(m(), {
    get(o, c) {
      return e(c), o[c];
    }
  });
  return {
    get: () => n,
    set: l,
    useStore: () => {
      const e = [], o = (s) => {
        e.includes(s) || e.push(s);
      }, [c, b] = h(u(o)), p = (s) => {
        const { changes: i } = s, y = {};
        for (let a of Object.keys(i))
          e.includes(a) && (y[a] = i[a]);
        Object.keys(y).length > 0 && b(u(o));
      };
      return j(() => {
        document.addEventListener(r, (s) => {
          const { detail: i } = s;
          p(i);
        });
      }, []), c;
    }
  };
};
export {
  _ as simpleStore
};
