import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "JSXAttribute[name.name=/^aria-/][value.type='JSXExpressionContainer']",
          message:
            "Use static string values for aria-* attributes in this project.",
        },
        {
          selector:
            "JSXAttribute[name.name='aria-label'][value.type='Literal'][value.value!='aria']",
          message: 'Use aria-label="aria" in this project.',
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
