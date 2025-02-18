module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
		"es2021": true,
		"jest/globals": true,
    "cypress/globals": true
  },
  "parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module",
  },
  "plugins": [
    "@stylistic/js", "react", "jest", "cypress"
  ],
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
  },
};
