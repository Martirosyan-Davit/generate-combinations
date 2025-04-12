module.exports = {
    env: {
      jest: true,
      es6: true,
      node: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    parserOptions: {
      ecmaVersion: 2020,
      project: './tsconfig.eslint.json',
      sourceType: 'module',
    },
    extends: [
      'plugin:import/typescript',
      'plugin:prettier/recommended',
      'eslint:recommended',
      'plugin:unicorn/recommended',
      'plugin:import/recommended',
      'plugin:sonarjs/recommended',
      'plugin:promise/recommended',
    ],
    plugins: [
      'prettier',
      'simple-import-sort',
      'import',
      'unicorn',
      'sonarjs',
      'promise',
    ],
    rules: {
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-static-only-class': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/no-abusive-eslint-disable': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'prettier/prettier': ['error', {singleQuote: true, trailingComma: 'all', tabWidth: 2, bracketSpacing: true}],
      /**
       * plugin:simple-import-sort
       */
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-unused-vars': 'off',
      'max-params': ["error", 7],
      'keyword-spacing': 'off',
      /**
       * plugin:eslint
       */
      'no-await-in-loop': 'error',
      'padding-line-between-statements': [
        'error',
        {blankLine: 'always', prev: '*', next: 'return'},
        {blankLine: 'always', prev: '*', next: 'try'},
        {blankLine: 'always', prev: 'try', next: '*'},
        {blankLine: 'always', prev: '*', next: 'block-like'},
        {blankLine: 'always', prev: 'block-like', next: '*'},
        {blankLine: 'always', prev: '*', next: 'throw'},
        {blankLine: 'always', prev: 'var', next: '*'},
      ],
      'arrow-body-style': 'error',
      'arrow-parens': ['error', 'always'],
      'complexity': 'off',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'rxjs/Rx',
              message: 'Please import directly from \'rxjs\' instead',
            },
          ],
        },
      ],
      'object-curly-spacing': ['error', 'always'],
      'no-multi-spaces': 'error',
      'no-useless-return': 'error',
      'no-else-return': 'error',
      'no-implicit-coercion': 'error',
      'constructor-super': 'error',
      'yoda': 'error',
      'strict': ['error', 'never'],
      'curly': 'error',
      'dot-notation': 'error',
      'eol-last': 'error',
      'eqeqeq': ['error', 'smart'],
      'guard-for-in': 'error',
      'id-match': 'error',
      'max-classes-per-file': 'off',
      'max-len': [
        'error',
        {
          code: 150,
        },
      ],
      'new-parens': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-cond-assign': 'error',
      'no-constant-condition': 'error',
      'no-dupe-else-if': 'error',
      'lines-between-class-members': ['error', 'always'],
      'no-console': [
        'error',
        {
          allow: [
            'info',
            'dirxml',
            'warn',
            'error',
            'dir',
            'timeLog',
            'assert',
            'clear',
            'count',
            'countReset',
            'group',
            'groupCollapsed',
            'groupEnd',
            'table',
            'Console',
            'markTimeline',
            'profile',
            'profileEnd',
            'timeline',
            'timelineEnd',
            'timeStamp',
            'context',
          ],
        },
      ],
      'no-debugger': 'error',
      'no-duplicate-case': 'error',
      'no-duplicate-imports': 'off',
      'no-empty': 'error',
      'no-eval': 'error',
      'no-extra-bind': 'error',
      'no-fallthrough': 'error',
      'no-invalid-this': 'error',
      'no-irregular-whitespace': 'error',
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
        },
      ],
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-redeclare': 'error',
      'no-return-await': 'error',
      'no-sequences': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-shadow': 'off',
      'no-throw-literal': 'error',
      'no-trailing-spaces': 'error',
      'no-undef-init': 'error',
      'no-unsafe-finally': 'error',
      'no-unused-expressions': 'off',
      'no-unused-labels': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-const': 'error',
      'prefer-object-spread': 'error',
      'quote-props': ['error', 'consistent-as-needed'],
      'radix': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'off',
      'space-before-function-paren': 'off',
    },
  };
  