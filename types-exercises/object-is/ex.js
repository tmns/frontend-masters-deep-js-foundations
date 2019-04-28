// TODO: define polyfill for `Object.is(..)`

Object.is = (value1, value2) => {
    const isItNegZero = value => {
        return value === 0 && (1 / value) === -Infinity; // -0 === 0 && 1 / -0 === -Infinity!
    }

    const isItNaN = value => {
        return value !== value; //NaN is the only value that doesn't have the Identity prop!
    }
    
    const isValue1NegZero = isItNegZero(value1);
    const isValue2NegZero = isItNegZero(value2);

    if (isValue1NegZero || isValue2NegZero) {
        return isValue1NegZero && isValue2NegZero; // are they both -0?
    }

    if (isItNaN(value1) && isItNaN(value2)) {
        return true; // both Invalid Numbers, ie NaN
    }

    // at this point we can just do simple strict equality check, ie ===
    if (value1 === value2) {
        return true;
    }

    return false;
}

// tests:
console.log(Object.is(42,42) === true);
console.log(Object.is("foo","foo") === true);
console.log(Object.is(false,false) === true);
console.log(Object.is(null,null) === true);
console.log(Object.is(undefined,undefined) === true);
console.log(Object.is(NaN,NaN) === true);
console.log(Object.is(-0,-0) === true);
console.log(Object.is(0,0) === true);

console.log(Object.is(-0,0) === false);
console.log(Object.is(0,-0) === false);
console.log(Object.is(0,NaN) === false);
console.log(Object.is(NaN,0) === false);
console.log(Object.is(42,"42") === false);
console.log(Object.is("42",42) === false);
console.log(Object.is("foo","bar") === false);
console.log(Object.is(false,true) === false);
console.log(Object.is(null,undefined) === false);
console.log(Object.is(undefined,null) === false);
