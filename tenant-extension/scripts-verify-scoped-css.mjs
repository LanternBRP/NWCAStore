import { readFileSync } from "node:fs";

const source = readFileSync(new URL("./src/styles.css", import.meta.url), "utf8");
const prohibited = [/\b:root\b/, /(^|[,{\s])html([,{\s.#:])/, /(^|[,{\s])body([,{\s.#:])/];

for (const pattern of prohibited) {
  if (pattern.test(source)) {
    throw new Error(`Scoped CSS verification failed: prohibited global selector ${pattern}`);
  }
}

if (!source.includes(":host")) {
  throw new Error("Scoped CSS verification failed: expected :host isolation selector.");
}

console.log("Scoped CSS verification passed.");
