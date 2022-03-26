  export function randomFromArray<Type>(array: Type[]) {
    return array[Math.floor(Math.random() * array.length)];
  }

export function arrayContainsArray<T>(array: Array<T>, wholeArray: Array<T>, fn = (i: T, j: T) => { return i == j}) {
  return array.every((i) => {
    return !wholeArray.every((j) => { return !fn(i, j)})
  })
}