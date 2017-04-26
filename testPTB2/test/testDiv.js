const mathDiv = require('../divideFunction');
const mathQuad = require('../PTB2');
const chai = require('chai');
// chai.expect;
chai.should();

describe('Dividing two numbers', function () {
  it('if a is not number throw error', function() {
    (function() {
      mathDiv.div('bad param', 10);
    }).should.throw('a is not a number');
  });

  it('If b is not a number throw err', function() {
    (function() {
      mathDiv.div(5, "a");
    }).should.throw('b is not a number');
  });

  it('If b equal 0 throw err', function () {
    (function()  {
      mathDiv.div(5,0);
    }).should.throw('Cannot divide to 0');
  });

  it('10/5 = 2',function () {
    mathDiv.div(10,5).should.equal(2);
  });

  it('Dividing two float numbers 10.0/5.0', function () {
    mathDiv.div(10.0,5.0).should.equal(2.0);
  });
});


describe('f(x)',() => {

  it('If a is not a number throw err', () =>{
    (() => {
      mathQuad.quadratic('a',123,34);
    }).should.throw('a is not a number');
  });

  it('If b is not a number throw err', () => {
    (() => {
      mathQuad.quadratic(123,'b',34);
    }).should.throw('b is not a number');
  });

  it('If c is not a number throw err', () => {
    (() => {
      mathQuad.quadratic(123,34,'c');
    }).should.throw('c is not a number');
  });

  it('If delta = b2-4ac < 0 throw err No variables: 1,1,1 -> no x', () => {
    (() => {
      mathQuad.quadratic(1,1,1);
    }).should.throw('No variables');
  });

  it('If quadratic have only 1 variable: 1,2,1 -> x = -1', () => {

    mathQuad.quadratic(1,2,1).should.eql([-1,-1]);

  });

  it('If quadratic have 2 variables: 1,2,-3 -> x1 = 1, x2 = -3', () => {

      mathQuad.quadratic(1,2,-3).should.eql([1,-3]);

  });


});