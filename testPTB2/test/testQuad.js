// const chai = require('chai');
// chai.should();
// const math = require('../PTB2');

// describe('f(x)',() => {

//   it('If a is not a number throw err', () =>{
//     (() => {
//       math.quadratic('a',123,34);
//     }).should.throw('a is not a number');
//   });

//   it('If b is not a number throw err', () => {
//     (() => {
//       math.quadratic(123,'b',34);
//     }).should.throw('b is not a number');
//   });

//   it('If c is not a number throw err', () => {
//     (() => {
//       math.quadratic(123,34,'c');
//     }).should.throw('c is not a number');
//   });

//   it('If delta = b2-4ac < 0 throw err: 1,1,1', () => {
//     (() => {
//       math.quadratic(1,1,1);
//     }).should.throw('No variables');
//   });

//   it('If quadratic have only 1 variable: 1,2,1 -> x = -1', () => {

//     math.quadratic(1,2,1).should.eql([-1,-1]);

//   });

//   it('If quadratic have 2 variables: 1,2,-3 -> x1 = 1, x2 = -3', () => {

//       math.quadratic(1,2,-3).should.eql([1,-3]);

//   });


// });