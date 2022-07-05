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
  let total = 0
  let {acc, array} = normalizeArray(
    options, 
    (total, item) => { return total += item.percent}, 
    (i , total) => {return {...i, percent: i.percent *= (1/total)}}
  )
  if (acc > 1) {
    options = array
  }
  for (let i = 0; i < options.length; i++) {
    total += options[i].percent
    if (total >= random) {
      return options[i].value
    }
  } 
  return defaultValue
}

export function normalizeArray<T>(array: T[], reduce: (total: number, item: T) => number, mapAndTotal: (item: T, total: number) => T) {
  const arrCopy = JSON.parse(JSON.stringify(array))
  let acc = arrCopy.reduce(reduce, 0)
  return {acc, array: arrCopy.map((item: T) => { return mapAndTotal(item, acc) })}
}
