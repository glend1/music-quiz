export function Round(i : number, dp: number) : number {
  //this does have rounding issues
    let m: number = Math.pow(10, dp)
    return Math.round(i * m) / m
  }

export function randomFromArray<Type>(array: Type[]) {
    return array[Math.floor(Math.random() * array.length)];
}