// TODO: write the validation functions

const isValidName = value => {
    return (typeof value == 'string' && value.trim().length >= 3);
}

const hoursAttended = (attended, length) => {

    const isStringOrNumber = (value) => {
        return (typeof value == 'string' || typeof value == 'number');
    } 
    
    if (!(isStringOrNumber(attended) && isStringOrNumber(length))) {
        return false;
    }

    if (typeof attended == 'string' && attended.trim() == '') {
        return false;
    }

    const attendedNum = Number(attended);
    const lengthNum = Number(length);

    if (attendedNum < 0 || lengthNum < 0) {
        return false;
    }
    
    if (!(attendedNum % 1 == 0 && lengthNum % 1 == 0)) {
        return false;
    } 
    
    if (attendedNum > lengthNum) {
        return false;
    }

    return true;
}


// tests:
console.log(isValidName("Frank") === true);
console.log(hoursAttended(6,10) === true);
console.log(hoursAttended(6,"10") === true);
console.log(hoursAttended("6",10) === true);
console.log(hoursAttended("6","10") === true);
console.log(isValidName(false) === false);
console.log(isValidName(null) === false);
console.log(isValidName(undefined) === false);
console.log(isValidName("") === false);
console.log(isValidName("  \t\n") === false);
console.log(isValidName("X") === false);
console.log(hoursAttended("",6) === false);
console.log(hoursAttended(6,"") === false);
console.log(hoursAttended("","") === false);
console.log(hoursAttended("foo",6) === false);
console.log(hoursAttended(6,"foo") === false);
console.log(hoursAttended("foo","bar") === false);
console.log(hoursAttended(null,null) === false);
console.log(hoursAttended(null,undefined) === false);
console.log(hoursAttended(undefined,null) === false);
console.log(hoursAttended(undefined,undefined) === false);
console.log(hoursAttended(false,false) === false);
console.log(hoursAttended(false,true) === false);
console.log(hoursAttended(true,false) === false);
console.log(hoursAttended(true,true) === false);
console.log(hoursAttended(10,6) === false);
console.log(hoursAttended(10,"6") === false);
console.log(hoursAttended("10",6) === false);
console.log(hoursAttended("10","6") === false);
console.log(hoursAttended(6,10.1) === false);
console.log(hoursAttended(6.1,10) === false);
console.log(hoursAttended(6,"10.1") === false);
console.log(hoursAttended("6.1",10) === false);
console.log(hoursAttended("6.1","10.1") === false);