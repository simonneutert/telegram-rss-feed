import prettier from 'eslint-plugin-prettier';
import mocha from 'eslint-plugin-mocha';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends('prettier', 'plugin:mocha/recommended'),
  {
    plugins: {
      prettier,
      mocha,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.mocha,
      },
    },

    settings: {
      'mocha/additionalCustomNames': [
        {
          name: 'describeModule',
          type: 'suite',
          interfaces: ['BDD'],
        },
        {
          name: 'testModule',
          type: 'testCase',
          interfaces: ['TDD'],
        },
      ],
    },

    rules: {
      'prettier/prettier': ['error'],
      'mocha/no-skipped-tests': 'error',
      'mocha/no-exclusive-tests': 'error',
    },
  },
];
