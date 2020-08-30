// Vector class
class Vector {
    // properties
    [index: number]: number;

    // constructor
    constructor(elements: number[]) {
        for (let i=0; i < elements.length; ++ i) {
            this[i] = elements[i];
        }
    }

    // iterator
    [Symbol.iterator](): Iterator<number> {
        const that = this;
        let index = 0;
        return {
            next(): IteratorResult<number> {
                const value = that[index];
                if (Number.isFinite(value)) {
                    index ++;
                    return { value, done: false };
                } else {
                    return { value: NaN, done: true };
                }
            },
        };
    }

    // the norm of this vector
    get norm(): number {
        const sumOfSquares = [...this].reduce((s: number, v: number) => s + Math.pow(v, 2) , 0);
        return Math.sqrt(sumOfSquares);
    }

    // return the dot product of this vector and the other vector
    dot(other: Vector): number {
        return [...this].reduce((s, v, i) => s + v * other[i], 0);
    }

    // return the addition vector of this vector and the other vector
    add(other: Vector): Vector {
        return new Vector([...this].map((v, i) => v - other[i]));
    }

    // return the difference vector to subtract the other vector from this vector
    subtract(other: Vector): Vector {
        return new Vector([...this].map((v, i) => v - other[i]));
    }

    // return the vector of specified scalar 'k' multiplication of this vector
    mul(k: number) {
        return new Vector([...this].map(v => k * v));
    }

    // stringify this vector
    toString(): string {
        return JSON.stringify([...this]);
    }
}

// QR decomposition of given Vectors
// Algorithm of following function 'qr' is written
// with reference to the sec.4.4, "Orthonormal Bases and Gram-Schmidt"
// in "Introduction to Linear Algebra" by Gilbert Strang
const qr = (A: Vector[]): [Vector[], Vector[]] => {
    const n: number = A.length;
    const Q: Vector[] = Array(n).fill(null);
    const R: Vector[] = [...Array(n)].map(_ => new Vector([...A[0]].fill(0)));

    for (let i = 0; i < n; ++ i) {
        let v = A[i];
        for (let j =0; j < i; ++ j) {
            R[i][j] = A[i].dot(Q[j]);
            v = v.subtract(Q[j].mul(R[i][j]));
        }
        R[i][i] = v.norm;
        Q[i] = v.mul(1 / R[i][i]);
    }

    return [Q, R];
}

export { Vector, qr };
