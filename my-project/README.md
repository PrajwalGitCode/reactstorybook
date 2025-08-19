# React + TypeScript + Vite

## InputField Component & Project Setup

This project includes a flexible `InputField` React component with:

- Label, placeholder, helper text, error message
- Validation states: disabled, invalid, loading
- Variants: filled, outlined, ghost
- Sizes: small, medium, large
- Optional clear button and password toggle


### My Approach

The `InputField` is designed for accessibility, flexibility, and easy integration. It uses props to control states, variants, and features. Conditional rendering is used for clear button, password toggle, and loading spinner. Styling is handled with utility classes for variants, sizes, and theme.

### Setup Instructions

1. **Install dependencies**
  ```sh
  npm install
  ```

2. **Start the development server**
  ```sh
  npm run dev
  ```

3. **Run Storybook for component demos**
  ```sh
  npm run storybook
  ```

4. **Build for production**
  ```sh
  npm run build
  ```

### Usage Example

```tsx
import InputField from './src/components/InputField';

<InputField
  label="Username"
  placeholder="Enter your username"
  helperText="This will be public."
  errorMessage="Required field"
  invalid={false}
  disabled={false}
  loading={false}
  variant="outlined"
  size="md"
  clearable
  theme="light"
  value={value}
  onChange={handleChange}
/>
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
