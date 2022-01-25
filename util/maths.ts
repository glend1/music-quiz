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
  export function bitwiseRotation(bitString: string, callback: (chroma: string) => void, direction: "Left" | "Right" = "Left") {
    rotateArray([...bitString], (array) => { callback(array.join(""))}, direction, [...bitString])
  }
function compareArrays<T>( a: Array<T>, b: Array<T>){
  if(a.length !== b.length) return false;
  for(var i=0;i<a.length;i++){
       if(a[i]!==b[i]) return false;
  }
  return true;
}

function rotateArray<T>(original: Array<T>, callback: (array: Array<T>) => void, direction: "Left" | "Right" = "Left", current = [...original]) {
  callback(current)
  if (direction == "Left") {
      let first = current.shift() as T
      current.push(first)
  } else {
      let last = current.pop() as T
      current.unshift(last)
  }
  if (!compareArrays(original, current)) {
      rotateArray(original, callback, direction, current)
  }
}

