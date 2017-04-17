window.onload = function(){
	var current,result,output,limit,ko,period,operator,specOperator;
	result = $("#result");
	current = result.html();  
	var decimalAdded=false;
	
	//đưa một anynomous function() vào mỗi button số,trừ số 0, khi ấn.
	$('.num').on('click',function () {
		if(limit > 14 ) {
			alert("max");
			return result;
		}
		num = this.value;
		current += num;
		result.html(current);
		output = result.html();
		limit = output.length;
	});


	

	//đưa 1 anynomous function() vào button "0" khi ấn.
	$(".ko").on("click",function() {
		ko = this.value;
		if(current == "") {
			output = current = ko;
			result.html(current);  
		}
		else if(current === output) {
			output = current += ko;
			result.html(current);
		}
	});


	//đưa anynomous function() cho button "." khi ấn.
	$(".period").on("click",function() {
		period = this.value;
		if (!decimalAdded) {
			if(current == "") {
				output = current;
				current = current.concat("0.");
				result.html(current);
			} else if (current === output) {
				current = current.concat(".");
				result.html(current);
			}
			decimalAdded = true;
		}
	});

	//thực hiện hàm eval khi ấn button "="
	$("#eqn-bg").on("click",function() {
		if(current == output) {
			current = eval(output);
			// output = current;
			result.html(current);
		} else {
			alert("err");
		}

		decimalAdded = false;

	});


	//nút xóa toàn bộ result-màn hình và output-bọ nhớ.
	$("#delete").on("click",function() {
		current = "";
		output = "";
		limit = "";
		decimalAdded = false;
		result.html(current);
	});

	//nút lùi lại 1 vị trí và xóa vị trí trc đó.
	$("#back").on("click",function() {
		if (current) {
			output = current;
			output = output.slice(0,output.length-1);
			current = output;
			limit=output.length;
			result.html(current);
			if (current.charAt(current.length-1) == ".") {
				decimalAdded = false;
			}
		} 
	});

	$(".specOperator").on("click",function() {
		specOperator = this.value;
		output = current;
		decimalAdded = false;
		if(current == output) {
			current = eval(output);
			output = current;
			result.html(current);
		} else {
			alert("err");
		}
		switch(specOperator){
			case 'sqrt':
			if (current == output) {
				current = Math.sqrt(output);
				result.html(current);
			}

			break;
			case 'power2':
			if (current == output) {
				current = Math.pow(output,2);
				result.html(current);
			}
			break;	
			case 'power3':
			if (current == output) {
				current = Math.pow(output,3);
				result.html(current);
			}
			break;
			case 'factorial':
			if (current == output) {
				current = factorial(output);
				result.html(current);
			}
			break;
			default:
			alert("err");
		}
	});
	

	//Hàm tính giai thừa
	function factorial(n){

		if (n < 0) {
			alert("err");
		} else if (n == 0) {
			return 1;
		} else {
			var result = 1;
			for (var i = 1; i <= n; i++) {
				result *= i;
			}
			return result;
		}
	}

	//đưa một anynomous function vào mỗi button operator (toán tử)
	$(".operator").on("click",function() {
		operator = this.value;
		output = current;
		var lastChar = current.charAt(current.length-1);
		var charBeforeLastChar = current.charAt(current.length-2);
		decimalAdded = false;

		
		if (current == "" && operator == "-") {
			current = current.concat("-");
			result.html(current);
		} 
		else if (lastChar == ".") {
			
			current=output; 
			result.html(current);
		} 


		else if (isOperator(lastChar)){ 

			if (lastChar == "-" ) {
				if (operator == "-" ) {
					current = output.slice(0,-1);
					result.html(current);
				} else if (operator != "-"  && !isOperator(charBeforeLastChar)) {
					current = output.slice(0,-1);
					output = current;
					current = output.concat(operator);
					result.html(current);
				} else if (operator != "-" && isOperator(charBeforeLastChar)) {
					current = output.slice(0,-2);
					output = current;
					current = output.concat(operator);
					result.html(current);
				} 
			}
			if (lastChar == "+") {
				if (operator == "-") {
					current = output.concat(operator);
					result.html(current);
				} else if (operator != "-") {
					current = output.slice(0,-1);
					output = current;
					current = output.concat(operator);
					result.html(current);
				}
			}
			if (lastChar == "*") {
				if (operator == "-") {
					current = output.concat(operator);
					result.html(current);
				} else if (operator != "-") {
					current = output.slice(0,-1);
					output = current;
					current = output.concat(operator);
					result.html(current);
				}
			}

			if (lastChar == "/") {
				if (operator == "-") {
					current = output.concat(operator);
					result.html(current);
				}else if (operator != "-") {
					current = output.slice(0,-1);
					output = current;
					current = output.concat(operator);
					result.html(current);
				}
			}

			if (lastChar == "%") {
				if (operator == "-") {
					current = output.concat(operator);
					result.html(current);
				} 
				else if (operator != "-") {
					current = output.slice(0,-1);
					output = current;
					current = output.concat(operator);
					result.html(current);
				}
			}
		}

		
		else if(output) {
			current = output.concat(operator);
			result.html(current);
		} 					
	});

	//hàm kiểm tra xem có phải toán tử hay ko ?.đúng trả về true,sai false.
	function isOperator(ope){
		if (ope == "+" || ope == "-" || ope == "*" || ope == "/" || ope == "%") {
			return true;
		}
		else
			return false;
	}

	
}