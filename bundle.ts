// bundle ./src/index.ts to ./dist/index.js
import { bundle } from "jsr:@deno/emit";

const result = await bundle(
  new URL("./src/index.ts", import.meta.url),
);

const { code } = result;

Deno.writeTextFileSync("./dist/bundle.js", code);
