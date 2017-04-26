exports.quadratic = function(a,b,c){
  let a_ = parseFloat(a);
  let b_ = parseFloat(b);
  let c_ = parseFloat(c);

  if (isNaN(a_)) {
    throw new Error('a is not a number');
  }

  if (isNaN(b_)) {
    throw new Error('b is not a number');
  }

  if (isNaN(c_)) {
    throw new Error('c is not a number');
  }

  let delta = (b*b - 4*a*c);

  if (delta < 0) {
    throw new Error('No variables');
  } else {  
    let sqrtDelta = Math.sqrt(delta);
    let double_a = 2*a;
    let x1 = (-b + sqrtDelta)/double_a;
    let x2 = (-b - sqrtDelta)/double_a;

    return [x1,x2];
  }




}