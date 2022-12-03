import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/react-simple-store.ts"),
      name: "react-simple-store",
      fileName: "react-simple-store",
    },
    rollupOptions: {
      external: ["react"],
    },
  },
});
