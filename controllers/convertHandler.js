function separator(input) {
  let number = input.match(/[.\d/]+/g) || ["1"];
  let unit = result = input.match(/[a-z]+/gi);
  return [number, unit]
}

function divisorChecker(numberToCheck) {
  let result = numberToCheck.split('/');
  return result.length > 2 ? undefined : result;
}

function decimalChecker(numberToCheck) {
  let result = numberToCheck.split('.');
  return result.length > 2 ? undefined : numberToCheck;
}

function ConvertHandler() {

  this.getNum = function (input) {
    let result = separator(input)[0][0];
    result = divisorChecker(result);
    if (result == undefined) {
      return undefined;
    }
    else if (result.length == 1) {
      result = decimalChecker(result[0]);
      if (result == undefined) {
        return undefined
      }
      return parseFloat(result);
    }
    result[0] = decimalChecker(result[0]);
    result[1] = decimalChecker(result[1]);
    if (result[0] && result[1]) {
      return result[0] / result[1];
    }
    return undefined;
  };

  this.getUnit = function (input) {
    let result = separator(input)[1];
    if (result) {
      switch (result[0].toLowerCase()) {
        case 'km': return 'km';
        case 'mi': return 'mi';
        case 'kg': return 'kg';
        case 'lbs': return 'lbs';
        case 'l': return 'L';
        case 'gal': return 'gal';
        default: return undefined;
      }
    }
  };

  this.getReturnUnit = function (initUnit) {
    if (initUnit) {
      switch (initUnit.toLowerCase()) {
        case 'km': return 'mi';
        case 'mi': return 'km';
        case 'kg': return 'lbs';
        case 'lbs': return 'kg';
        case 'l': return 'gal';
        case 'gal': return 'L';
        default: return undefined;
      }
    }
  };

  this.spellOutUnit = function (unit) {
    if (unit) {
      switch (unit.toLowerCase()) {
        case 'km': return 'kilometers';
        case 'mi': return 'miles';
        case 'kg': return 'kilograms';
        case 'lbs': return 'pounds';
        case 'l': return 'liters';
        case 'gal': return 'gallons';
      }
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'km': result = initNum / miToKm; break;
      case 'mi': result = initNum * miToKm; break;
      case 'kg': result = initNum / lbsToKg; break;
      case 'lbs': result = initNum * lbsToKg; break;
      case 'L': result = initNum / galToL; break;
      case 'gal': result = initNum * galToL; break;
      default: undefined;
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  };

}

module.exports = ConvertHandler;
