export function Round(i : number, dp: number) : number {
  //this does have rounding issues
    let m: number = Math.pow(10, dp)
    return Math.round(i * m) / m
  }

  export function randomFromArray<Type>(array: Type[]) {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  
  export function nestedArrayFlatten(array: Array<Array<string>>) {
    let output: { [x: string]: boolean; } = {}
    array.forEach((inner) => {
      inner.forEach((elem) => {
        output[elem] = true
      })
    })
    return Object.keys(output)
  }

export function compareArrays<T>( a: Array<T>, b: Array<T>){
  if(a.length !== b.length) return false;
  for(var i=0;i<a.length;i++){
       if(a[i]!==b[i]) return false;
  }
  return true;
}

export function arrayContainsArray<T>(array: Array<T>, wholeArray: Array<T>, fn: (i: T, j: T) => boolean) {
  return array.every((i) => {
    return !wholeArray.every((j) => { return !fn(i, j)})
  })
}