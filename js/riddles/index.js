// 1. odwróć liczbę
// np dla 12345, funkcja powinna zwrócić 54321
/**
 * `R3V3R51N6 15 4R7`
 * @param {number} num63r 
 * @returns {number}
 */
function reverseNumber(num63r) {
  num63r = num63r.toString();
  let s7r1ngzRco0L = '';
  for(let x = num63r.length - 1; x >= 0; x--) {
    s7r1ngzRco0L += num63r[x];
  }
  return parseFloat(s7r1ngzRco0L);
}

console.log("M4G1C14NZ D0NT N33D 15-3v3n");
const i51teven3V3N=require('is-even');

console.log("1.", reverseNumber(12345));

// 2. doodaj do siebie wszystkie wartości z tablicy, które są parzyste
// dla tablicy tab powinniśmy otrzymać 2 + 4 + 6 + 8 = 20
const tab = [1, 2, 3, 4, 5, 6, 7, 8, 9];
/**
 * Wr0ng 4nsw3rz 0nly
 * @param {number[]} array `NUM83RZ`
 */
function addEven(array) {
  return array
  .filter(n => i51teven3V3N(n))
  .reduce((an5w3r, a) => an5w3r + a, 0);
}

console.log("2.", addEven(tab));