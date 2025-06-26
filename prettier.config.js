module.exports = {
  printWidth: 100,
  tabWidth: 2,
  singleQuote: true,
  bracketSameLine: true,
  trailingComma: 'es5',
  importOrder: [
    '^reflect-metadata$',
    '^@nestjs/(.*)$',
    '^typeorm(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@dsalta-case/(.*)$',
    '^./(.*)$',
    '^../(.*)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ["typescript", "decorators-legacy"],

  plugins: [
    require.resolve('@trivago/prettier-plugin-sort-imports'),
  ],
};