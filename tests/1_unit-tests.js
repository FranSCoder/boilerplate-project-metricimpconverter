const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

    test('Whole number test', () => {
        let number = '15km'
        assert.equal(convertHandler.getNum(number), 15)
    })

    test('Decimal number test', () => {
        let number = '15.56l'
        assert.equal(convertHandler.getNum(number), 15.56);
    })

    test('Fractional number', () => {
        let number = '15/5l'
        assert.equal(convertHandler.getNum(number), 15 / 5);
    })

    test('Fractional-decimal number', () => {
        let number = '15.56/5l'
        assert.equal(convertHandler.getNum(number), 15.56 / 5);
    })

    test('Double fraction error', () => {
        let number = '3/2/3gal'
        assert.equal(convertHandler.getNum(number), undefined);
    })

    test('No number', () => {
        let number = 'km'
        assert.equal(convertHandler.getNum(number), 1);
    })

    test('Valid input unit', () => {
        let inputUnit = ['km', 'mi', 'kg', 'lbs', 'l', 'gal'];
        let result = ['km', 'mi', 'kg', 'lbs', 'L', 'gal'];
        inputUnit.forEach((element, i) => {
            assert.equal(convertHandler.getUnit(element), result[i]);
        })
    })

    test('Invalid input unit', () => {
        let inputUnit = 'kms';
        assert.equal(convertHandler.getUnit(inputUnit), undefined);
    })

    test('Valid return unit', () => {
        let inputUnit = ['km', 'mi', 'kg', 'lbs', 'L', 'gal'];
        let result = ['mi', 'km', 'lbs', 'kg', 'gal', 'L'];
        inputUnit.forEach((element, i) => {
            assert.equal(convertHandler.getReturnUnit(element), result[i]);
        })
    })

    test('Valid spelled-out unit', () => {
        let inputUnit = ['km', 'mi', 'kg', 'lbs', 'l', 'gal'];
        let result = ['kilometers', 'miles', 'kilograms', 'pounds', 'liters', 'gallons'];
        inputUnit.forEach((element, i) => {
            assert.equal(convertHandler.spellOutUnit(element), result[i]);
        })
    })

    test('gal to L', () => {
        let number = 'gal'
        assert.equal(convertHandler.getReturnUnit(number), 'L');
    })

    test('l to gal', () => {
        let number = 'l'
        assert.equal(convertHandler.getReturnUnit(number), 'gal');
    })

    test('mi to km', () => {
        let number = 'mi'
        assert.equal(convertHandler.getReturnUnit(number), 'km');
    })

    test('km to mi', () => {
        let number = 'km'
        assert.equal(convertHandler.getReturnUnit(number), 'mi');
    })

    test('lbs to kg', () => {
        let number = 'lbs'
        assert.equal(convertHandler.getReturnUnit(number), 'kg');
    })

    test('kg to lbs', () => {
        let number = 'kg'
        assert.equal(convertHandler.getReturnUnit(number), 'lbs');
    })

});