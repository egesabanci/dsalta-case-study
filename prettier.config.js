module.exports = {
  printWidth: 100,
  tabWidth: 2,
  singleQuote: true,
  bracketSameLine: true,
  trailingComma: 'es5',
  importOrder: [
    '^@nestjs/(.*)$',
    '^typeorm(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^../(.*)$',
    '^../(.*)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  plugins: [
    require.resolve('prettier-plugin-tailwindcss'),
    require.resolve('@trivago/prettier-plugin-sort-imports'),
  ],
  tailwindAttributes: ['className'],
};