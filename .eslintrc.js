const exported = {
    "root": true,
    "env": {
        "node": true,
        "jest": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2020
    },
    "extends": [
        "plugin:@typescript-eslint/recommended",
        "plugin:import/typescript",
        "prettier"
    ],
    "plugins": [
        "@typescript-eslint",
        "import",
        "jsdoc",
        "prefer-arrow",
        "simple-import-sort",
        "rulesdir",
        "unused-imports"
    ],
    "rules": {
        "rulesdir/apigen-errors-and-warnings": "warn",
        "rulesdir/correct-permission-check": "error",
        "rulesdir/jest-no-retries": "error",
        "no-async-promise-executor": "error",
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": [
            "error",
            {
                "default": "array-simple",
                "readonly": "generic"
            }
        ],
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/ban-types": [
          "error",
          {
            "types": {
              //TODO: remove override:
              //https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md#default-options
              "{}": false,
              "object": false
            },
            "extendDefaults": true
          }
        ],
        "@typescript-eslint/consistent-type-assertions": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                "accessibility": "explicit",
                "overrides": {
                    "constructors": "off", // could be improved to no-public probably
                    "parameterProperties": "off" // could be improved to default "explicit" probably
                }
            }
        ],
        //disabled by prettier
        //"indent": "off",
        //disabled by prettier
        // "@typescript-eslint/indent": [
        //     "error",
        //     4,
        //     {
        //         "CallExpression": {
        //             "arguments": "off"
        //         },
        //         "FunctionDeclaration": {
        //             "parameters": "off"
        //         },
        //         "FunctionExpression": {
        //             "parameters": "off"
        //         },
        //         "MemberExpression": "off",
        //         "SwitchCase": 1
        //     }
        // ],
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/member-ordering": "off",
        "@typescript-eslint/naming-convention": [
            "error",
            {
                // allow placeholder variables consisting only of underscores
                "selector": "variable",
                "format": null,
                "filter": "^_+$"
            },
            {
                "selector": "variable",
                "format": ["camelCase", "UPPER_CASE"]
            },
            {
                "selector": "parameter",
                "format": ["camelCase"],
                "leadingUnderscore": "allowSingleOrDouble"
            },
            {
                // allow placeholder parameters consisting only of underscores
                "selector": "parameter",
                "format": null,
                "filter": "^_+$"
            },
            {
                "selector": "classProperty",
                "format": ["camelCase", "UPPER_CASE"],
                "leadingUnderscore": "allowSingleOrDouble",
                "modifiers": ["private"]
            },
            {
                "selector": "classProperty",
                "format": ["camelCase", "UPPER_CASE"],
                "leadingUnderscore": "allowSingleOrDouble",
                "modifiers": ["protected"]
            },
            {
                "selector": "classProperty",
                "format": ["camelCase", "UPPER_CASE"]
            },
            {
                "selector": "parameterProperty",
                "format": ["snake_case"],
                "filter": "^party_type$",
                "modifiers": ["public", "readonly"]
            },
            {
                "selector": "parameterProperty",
                "format": ["camelCase", "UPPER_CASE"],
                "modifiers": ["private"],
                "leadingUnderscore": "allowSingleOrDouble"
            },
            {
                "selector": "parameterProperty",
                "format": ["camelCase"],
                "modifiers": ["protected"],
                "leadingUnderscore": "allowSingleOrDouble"
            },
            {
                "selector": "parameterProperty",
                "format": ["camelCase"]
            }
        ],
        "@typescript-eslint/no-duplicate-enum-values": "error",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-floating-promises": ["error", {"ignoreVoid": false}],
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-throw-literal": "error",
        "@typescript-eslint/no-use-before-declare": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/prefer-for-of": "off",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        //disabled by prettier
        // "@typescript-eslint/quotes": [
        //     "error",
        //     "double",
        //     {
        //         "avoidEscape": true,
        //         "allowTemplateLiterals": true
        //     }
        // ],
        // "@typescript-eslint/semi" throws errors at the lack of semicolor for arrow functions,
        // which are all over the place in controllers...
        // TODO: replace tslint rule with this
        // "@typescript-eslint/semi": [
        //     "error",
        //     "always"
        // ],
        "@typescript-eslint/triple-slash-reference": "error",
        "@typescript-eslint/type-annotation-spacing": "off",
        "@typescript-eslint/unified-signatures": "error",
        //both rules are checked by TS compiler
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        //TODO: turn rule on, when noImplicitAny is enabled?
        "@typescript-eslint/no-inferrable-types":  "off",
        "@typescript-eslint/prefer-as-const":  "off",
        "@typescript-eslint/explicit-module-boundary-types":  "off",
        "@typescript-eslint/no-non-null-assertion":  "off",
        // "arrow-return-shorthand" was removed from "tslint:recommended" in TSLint 6.1.0,
        // also "arrow-body-style" doesn't handle our common controller case - when there's multiline block, which only has single return
        // TODO: need to think whether such controller use case makes sense, or if this rule is useless
        // "arrow-body-style": "error",
        "arrow-parens": "off",
        "brace-style": "off",
        "capitalized-comments": "off",
        "comma-dangle": "off",
        "complexity": "off",
        "constructor-super": "error",
        "curly": "error",
        "dot-notation": "off",
        "eol-last": "off",
        "eqeqeq": [
            "error",
            "smart"
        ],
        "guard-for-in": "off",
        // disabled due to ongoing bugfix: https://github.com/eslint/eslint/issues/12567
        // "id-blacklist": [
        //     "error",
        //     "any",
        //     "Number",
        //     "number",
        //     "String",
        //     "string",
        //     "Boolean",
        //     "boolean",
        //     "Undefined",
        //     "undefined"
        // ],
        "id-match": "error",
        "import/no-default-export": "error",
        "import/no-named-as-default": "off",//needed for migration from default to named export
        "import/order": "off",
        // TODO: consider adding more `jsdoc/*` rules
        "jsdoc/check-alignment": "error",
        "max-classes-per-file": "off",
        "max-len": "off",
        "new-parens": "error",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-console": "error",
        "no-debugger": "error",
        "no-empty": "off",
        "no-eval": "error",
        "no-fallthrough": "off",
        "no-invalid-this": "off",
        "no-multiple-empty-lines": ["error", {
          "max": 1
        }],
        "no-new-wrappers": "error",
        "no-return-await": "off",
        "@typescript-eslint/return-await": [
            "error",
            "in-try-catch"
        ],
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": [
            "error",
            {
                "hoist": "all"
            }
        ],
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-unsafe-finally": "error",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
        "no-var": "error",
        "object-shorthand": "off",
        "one-var": [
            "error",
            "never"
        ],
        // doesn't support "allow-declarations", "allow-named-functions" parameters from only-arrow-functions
        // "prefer-arrow/prefer-arrow-functions": "error",
        "prefer-const": "error",
        "quote-props": [
            "error",
            "consistent-as-needed"
        ],
        "radix": "error",
        "space-before-function-paren": "off",
        "spaced-comment": "off",
        "unused-imports/no-unused-imports": "error",
        "use-isnan": ["error", {"enforceForSwitchCase": true, "enforceForIndexOf": true}],
        "valid-typeof": "off",
        "@typescript-eslint/unbound-method": ["error", { "ignoreStatic": true }],
        "no-restricted-syntax": [
            "error",
            {
                "selector": "CallExpression[callee.property.name='forEach'] > :matches(ArrowFunctionExpression, FunctionExpression)[async=true].arguments",
                "message": "Do not use async functions in forEach(). These will not be awaited."
            }
        ],
    },
    "reportUnusedDisableDirectives": true,
};
export default exported;