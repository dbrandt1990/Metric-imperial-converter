function isNumeric(n) {
  return n.match(/[-]?[0-9]+[,.]?[0-9]*([\/][0-9]+[,.]?[0-9]*)*/g);
}

function isDoubleFraction(str) {
  var arr = str.split("/");
  return arr.length > 2;
}

function ConvertHandler() {
  this.getNum = function(input) {
    var arr = input.match(/[a-z]+|[^a-z]+/gi);
    if (isDoubleFraction(arr[0])) {
      //check if double fraction
      return "invalid number";
    } else if (!isNumeric(arr[0])) {
      return 1;
    } //check if input is number

    return eval(arr[0]); //use evla to convert fractions to decimals
  };

  this.getUnit = function(input) {
    var units = [
      "gal",
      "l",
      "mi",
      "km",
      "lbs",
      "kg",
      "GAL",
      "L",
      "MI",
      "KM",
      "LBS",
      "KG"
    ];
    var arr = input.match(/[a-z]+|[^a-z]+/gi);
    var unit = "";
    if (arr.length < 2) {
      unit = arr[0];
    } else {
      unit = arr[1];
    }

    if (units.includes(unit)) {
      return unit.toLowerCase();
    } else {
      return "invalid unit";
    }
  };

  this.getReturnUnit = function(initUnit) {
    let result = "";
    switch (initUnit) {
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      case "gal":
        result = "l";
        break;
      case "l":
        result = "gal";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      default:
        result = "invalid unit";
        break;
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result = "";
    switch (unit) {
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      case "gal":
        result = "gallons";
        break;
      case "l":
        result = "liters";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      default:
        break;
    }
    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        break;
    }

    return Number(Math.round(result + "e5") + "e-5");
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if (initNum === "invalid number" && returnUnit === "invalid unit") {
      return "invalid number and unit";
    } else if (initNum === "invalid number") {
      return initNum;
    } else if (returnUnit === "invalid unit") {
      return returnUnit;
    }
    let convertionString =
      initNum +
      " " +
      this.spellOutUnit(initUnit) +
      " converts to " +
      returnNum +
      " " +
      this.spellOutUnit(returnUnit) +
      ".";
    var result = convertionString;
    return result;
  };
}

module.exports = ConvertHandler;
