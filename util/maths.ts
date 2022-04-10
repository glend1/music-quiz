  export function randomFromArray<Type>(array: Type[]) {
    return array[Math.floor(Math.random() * array.length)];
  }

export function arrayContainsArray<T>(array: Array<T>, wholeArray: Array<T>, fn = (i: T, j: T) => { return i == j}) {
  return array.every((i) => {
    return !wholeArray.every((j) => { return !fn(i, j)})
  })
}

export function randomFromRange(min: number, max: number) {
  if (min == max) { return min }
  if (min > max) { return null }
  return min + Math.floor(Math.random() * max - min + 1)
}