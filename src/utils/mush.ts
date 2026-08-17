export const getQuote = (quotes: string[], index?: number) =>
  index === undefined
    ? quotes[Math.floor(Math.random() * quotes.length)]
    : quotes.at(index % quotes.length)!
