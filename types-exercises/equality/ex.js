// TODO: write `findAll(..)`

const isValidStringOrNumber = value => {
	if (typeof value == 'string' && value.trim() != '') {
		return true;
	}

	if (typeof value == 'number' && value != NaN && value != -Infinity && value != +Infinity) {
		return true;
	}

	return false;
}

const isNegZero = value => {
	return (Object.is(value, -0) || Object.is(value, '-0'));
}

const isPosZero = value => {
	return (Object.is(value, 0) || Object.is(value, '0'));
}

const isPosNegMix = (value1, value2) => {
	return (isNegZero(value1) && isPosZero(value2) || isNegZero(value2) && isPosZero(value1));
}

// both null and undefined coerce to false when compared with ==
const isNullOrUndefined = value => {
	return value == null;
}

const isBool = value => typeof value == 'boolean';

const isObjectAndNotNull = value => typeof value == 'object' && value != null;

const ifBoth = (value1, value2, func) => func(value1) && func(value2);

const findAll = (target, values) => {
	const newVals = values.filter(value => {
		return (Object.is(value, target) ||
		ifBoth(target, value, isNegZero) ||
		ifBoth(target, value, isPosZero) ||
		(ifBoth(target, value, isValidStringOrNumber) && !isPosNegMix(target, value) && target == value) ||
		ifBoth(target, value, isNullOrUndefined) ||
		(ifBoth(target, value, isBool) && target == value) ||
		(ifBoth(target, value, isObjectAndNotNull) && target == value))
	})
	return newVals;
}


// tests:
var myObj = { a: 2 };

var values = [
	null, undefined, -0, 0, 13, 42, NaN, -Infinity, Infinity,
	"", "0", "42", "42hello", "true", "NaN", true, false, myObj
];

console.log(setsMatch(findAll(null,values),[null,undefined]) === true);
console.log(setsMatch(findAll(undefined,values),[null,undefined]) === true);
console.log(setsMatch(findAll(0,values),[0,"0"]) === true);
console.log(setsMatch(findAll(-0,values),[-0]) === true);
console.log(setsMatch(findAll(13,values),[13]) === true);
console.log(setsMatch(findAll(42,values),[42,"42"]) === true);
console.log(setsMatch(findAll(NaN,values),[NaN]) === true);
console.log(setsMatch(findAll(-Infinity,values),[-Infinity]) === true);
console.log(setsMatch(findAll(Infinity,values),[Infinity]) === true);
console.log(setsMatch(findAll("",values),[""]) === true);
console.log(setsMatch(findAll("0",values),[0,"0"]) === true);
console.log(setsMatch(findAll("42",values),[42,"42"]) === true);
console.log(setsMatch(findAll("42hello",values),["42hello"]) === true);
console.log(setsMatch(findAll("true",values),["true"]) === true);
console.log(setsMatch(findAll(true,values),[true]) === true);
console.log(setsMatch(findAll(false,values),[false]) === true);
console.log(setsMatch(findAll(myObj,values),[myObj]) === true);

console.log(setsMatch(findAll(null,values),[null,0]) === false);
console.log(setsMatch(findAll(undefined,values),[NaN,0]) === false);
console.log(setsMatch(findAll(0,values),[0,-0]) === false);
console.log(setsMatch(findAll(42,values),[42,"42hello"]) === false);
console.log(setsMatch(findAll(25,values),[25]) === false);
console.log(setsMatch(findAll(Infinity,values),[Infinity,-Infinity]) === false);
console.log(setsMatch(findAll("",values),["",0]) === false);
console.log(setsMatch(findAll("false",values),[false]) === false);
console.log(setsMatch(findAll(true,values),[true,"true"]) === false);
console.log(setsMatch(findAll(true,values),[true,1]) === false);
console.log(setsMatch(findAll(false,values),[false,0]) === false);

// ***************************

function setsMatch(arr1,arr2) {
	if (Array.isArray(arr1) && Array.isArray(arr2) && arr1.length == arr2.length) {
		for (let v of arr1) {
			if (!arr2.includes(v)) return false;
		}
		return true;
	}
	return false;
}
