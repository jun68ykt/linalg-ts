import { Vector, qr } from './linalg';

const a: Vector = new Vector([1, -1, 0]);

console.log(`${a}`);
console.log([...a]);
console.log(a.norm);

for (let x of a) {
    console.log(x);
}

const b: Vector = new Vector([2,  0, -2]);
const c: Vector = new Vector([3, -3, 3]);
const A = [a, b, c];

const [Q, R] = qr(A)

console.log(`A: ${A}`);
console.log(`Q: ${Q}`);
console.log(`R: ${R}`);
