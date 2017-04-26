exports.div = function div(a,b) {
  let a_ = parseFloat(a);
  let b_ = parseFloat(b);

  if (isNaN(a_)) {
    throw new Error('a is not a number');
  }

  if (isNaN(b_)) {
    throw new Error('b is not a number');
  }

  if (b_ === 0) {
    throw new Error('Cannot divide to 0');
  }

  return parseFloat(a_) / parseFloat(b_);

}