// @ts-check
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  // Archivos ignorados
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  // Reglas base de JS recomendadas
  js.configs.recommended,

  // Reglas de TypeScript recomendadas + con chequeo de tipos
  ...tseslint.configs.recommendedTypeChecked,

  // Configuración del parser con proyecto TypeScript
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
  },

  // Reglas personalizadas para SOLID y buenas prácticas
  {
    files: ['src/**/*.ts'],
    rules: {
      // --- TypeScript ---
      '@typescript-eslint/explicit-function-return-type': 'warn',       // Fuerza tipos de retorno explícitos
      '@typescript-eslint/no-explicit-any': 'error',                    // Prohibe any
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }], // Separa type imports
      '@typescript-eslint/no-floating-promises': 'error',               // Promesas sin await/catch
      '@typescript-eslint/no-misused-promises': 'error',                // Promesas mal usadas
      '@typescript-eslint/prefer-readonly': 'warn',                     // Props que pueden ser readonly

      // --- Complejidad y tamaño (ayuda al SRP) ---
      'max-lines-per-function': ['warn', { max: 30, skipBlankLines: true, skipComments: true }],
      'complexity': ['warn', 8],                                        // Complejidad ciclomática máx 8

      // --- Buenas prácticas generales ---
      'no-console': 'warn',                                             // console.log en prod
      'eqeqeq': ['error', 'always'],                                    // Siempre === nunca ==
      'no-var': 'error',                                                // Sin var, solo const/let
      'prefer-const': 'error',                                          // Prefiere const
      'no-duplicate-imports': 'error',                                  // Sin imports duplicados
    },
  },
);
