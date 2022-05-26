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
  return min + Math.floor( (Math.random() * ((max - min) + 1 ) ) )
}

export function randomWeight<T>(options: {percent: number, value: T}[], defaultValue: T) {
    let random = Math.random()
    let total = 0;
    for (let i = 0; i < options.length; i++) {
      total += options[i].percent
      if (total > 1) { 
        return 0 
      } else if (total >= random) {
        return options[i].value
      }
    } 
    return defaultValue
}