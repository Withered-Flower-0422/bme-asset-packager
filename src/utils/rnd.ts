export const getRandomItem = <T>(arr: T[], index?: number): T =>
  index === undefined
    ? arr[Math.floor(Math.random() * arr.length)]
    : arr.at(index % arr.length)!
