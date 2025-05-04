import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Stylistic autofixable rules for a custom style guide - Start
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/comma-style': ['error', 'last'],
      '@stylistic/computed-property-spacing': ['error', 'never'],
      '@stylistic/dot-location': ['error', 'property'],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/generator-star-spacing': ['error', 'after'],
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/indent-binary-ops': ['error', 2],
      '@stylistic/jsx-closing-bracket-location': ['error', 'tag-aligned'],
      '@stylistic/jsx-closing-tag-location': ['error', 'tag-aligned'],
      '@stylistic/jsx-curly-brace-presence': ['error', {
        props: 'never',
        children: 'never',
        propElementValues: 'always'
      }],
      '@stylistic/jsx-curly-newline': ['error', 'consistent'],
      '@stylistic/jsx-curly-spacing': ['error', { when: 'never' }],
      '@stylistic/jsx-equals-spacing': ['error', 'never'],
      '@stylistic/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
      '@stylistic/jsx-function-call-newline': ['error', 'multiline'],
      '@stylistic/jsx-indent-props': ['error', 2],
      '@stylistic/jsx-max-props-per-line': ['error', {
        maximum: 1,
        when: 'multiline',
      }],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/jsx-tag-spacing': ['error', {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'allow'
      }],
      '@stylistic/jsx-wrap-multilines': ['error', {
        declaration: 'parens',
        assignment: 'parens',
        return: 'parens',
        arrow: 'parens',
        condition: 'ignore',
        logical: 'ignore',
        prop: 'ignore',
        propertyValue: 'ignore'
      }],
      '@stylistic/key-spacing': ['error', {
        beforeColon: false,
        afterColon: true,
        mode: 'strict',
      }],
      '@stylistic/keyword-spacing': ['error', {
        before: true,
        after: true,
      }],
      '@stylistic/lines-between-class-members': ['error', 'always', {
        exceptAfterSingleLine: false,
      }],
      '@stylistic/max-statements-per-line': ['error', { max: 1 }],
      '@stylistic/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'semi', // Use 'semi' or 'none' depending on your semis preference
          "requireLast": true,
        },
        singleline: {
          delimiter: 'semi',
          "requireLast": false,
        }
      }],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/no-floating-decimal': 'error',
      '@stylistic/no-mixed-operators': 'warn',
      '@stylistic/no-mixed-spaces-and-tabs': 'warn',
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 2 }],
      '@stylistic/no-tabs': 'warn',
      '@stylistic/no-trailing-spaces': ['error', {
        skipBlankLines: false,
        ignoreComments: false,
      }],
      '@stylistic/no-whitespace-before-property': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/operator-linebreak': 'error',
      '@stylistic/padded-blocks': ['error', 'never'],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/rest-spread-spacing': ['error', 'never'],
      '@stylistic/semi': ['error', 'always'], // Use 'always' or 'never' depending on your semis preference
      '@stylistic/semi-spacing': ['error', { 'before': false, 'after': true }],
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/space-before-function-paren': ['error', {
        named: 'never',
        anonymous: 'always',
        asyncArrow: 'always',
      }],
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/space-infix-ops': ['error', { int32Hint: false, ignoreTypes: false }],
      '@stylistic/space-unary-ops': ['error', { words: true, nonwords: false }],
      '@stylistic/spaced-comment': ['error', 'always'],
      '@stylistic/template-curly-spacing': ['error', 'never'],
      '@stylistic/template-tag-spacing': ['error', 'never'],
      '@stylistic/type-annotation-spacing': 'error',
      '@stylistic/type-generic-spacing': 'error',
      '@stylistic/type-named-tuple-spacing': 'error',
      '@stylistic/wrap-iife': ['error', 'inside'],
      '@stylistic/yield-star-spacing': ['error', { before: false, after: true }],
      // Stylistic autofixable rules for a custom style guide - End
    },
  },
)
