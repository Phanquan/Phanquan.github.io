window.onload = function(){
	var current,screen,output,limit,ko,period,operator,specOperator;
	screen = document.getElementById("result");  
	var decimalAdded=false;
	
	//đưa một anynomous function() vào mỗi button số,trừ số 0, khi ấn.
	for(var i = 0; i < document.querySelectorAll(".num").length; i++ ) {
		document.querySelectorAll(".num")[i].addEventListener("click",function() {
			if(limit > 14 ) {
				alert("max");
				return screen.innerHTML;
			}
			num = this.value;
			output = screen.innerHTML += num;
			limit = output.length;

		});
	} 

	//đưa 1 anynomous function() vào button "0" khi ấn.
	document.querySelector(".ko").addEventListener("click",function() {
		ko = this.value;
		if(screen.innerHTML == "") {
			output = screen.innerHTML = ko;  
		}
		else if(screen.innerHTML === output) {
			output = screen.innerHTML += ko;
		}
	});


	//đưa anynomous function() cho button "." khi ấn.
	document.querySelector(".period").addEventListener("click",function() {
		period = this.value;
		if (!decimalAdded) {
			if(screen.innerHTML == "") {
				output = screen.innerHTML;
				screen.innerHTML = screen.innerHTML.concat("0.");
			} else if (screen.innerHTML === output) {
				screen.innerHTML = screen.innerHTML.concat(".");
			}
			decimalAdded = true;
		}
	});

	//thực hiện hàm eval khi ấn button "="
	document.querySelector("#eqn-bg").addEventListener("click",function() {
		if(screen.innerHTML == output) {
			screen.innerHTML = eval(output);
			// output = screen.innerHTML;
		} else {
			alert("err");
		}

		decimalAdded = false;

	});


	//nút xóa toàn bộ screen-màn hình và output-bọ nhớ.
	document.querySelector("#delete").addEventListener("click",function() {
		screen.innerHTML = "";
		output = "";
		limit = "";
		decimalAdded = false;
	});

	//nút lùi lại 1 vị trí và xóa vị trí trc đó.
	document.querySelector("#back").addEventListener("click",function() {
		if (screen.innerHTML) {
			output = screen.innerHTML;
			output = output.slice(0,output.length-1);
			screen.innerHTML = output;
			limit=output.length;
			if (screen.innerHTML.charAt(screen.innerHTML.length-1) == ".") {
				decimalAdded = false;
			}
		} 
	});

	for (var i = 0; i < document.querySelectorAll(".specOperator").length; i++) {
		document.querySelectorAll(".specOperator")[i].addEventListener("click",function() {
			specOperator = this.value;
			output = screen.innerHTML;
			decimalAdded = false;
			if(screen.innerHTML == output) {
				screen.innerHTML = eval(output);
				output = screen.innerHTML;
			} else {
				alert("err");
			}
			switch(specOperator){
				case 'sqrt':
				if (screen.innerHTML == output) {
					screen.innerHTML = Math.sqrt(output);
				}

				break;
				case 'power2':
				if (screen.innerHTML == output) {
					screen.innerHTML = Math.pow(output,2);
				}
				break;	
				case 'power3':
				if (screen.innerHTML == output) {
					screen.innerHTML = Math.pow(output,3);
				}
				break;
				case 'factorial':
				if (screen.innerHTML == output) {
					screen.innerHTML = factorial(output);
				}
				break;
				default:
				alert("err");
			}
		});
	}

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
	for(var i = 0; i < document.querySelectorAll(".operator").length; i++ ) {
		document.querySelectorAll(".operator")[i].addEventListener("click",function() {
			operator = this.value;
			output = screen.innerHTML;
			var lastChar = screen.innerHTML.charAt(screen.innerHTML.length-1);
			var charBeforeLastChar = screen.innerHTML.charAt(screen.innerHTML.length-2);
			decimalAdded = false;

				//check thêm dấu - vào screen khi ấn button - khi screen chưa có gì.
				if (screen.innerHTML == "" && operator == "-") {
					screen.innerHTML = screen.innerHTML.concat("-");
				} 
				else if (lastChar == ".") {
					//check bỏ toán tử nếu ở trc là dấu "."
					screen.innerHTML=output; 
				} 

				//kiểm tra ký tự cuối có là toán tử k
				else if (isOperator(lastChar)){ 
					//nếu lastChar là dấu "-" ,
					if (lastChar == "-" ) {
						if (operator == "-" ) {
							screen.innerHTML = output.slice(0,-1);
						} else if (operator != "-"  && !isOperator(charBeforeLastChar)) {
							screen.innerHTML = output.slice(0,-1);
							output = screen.innerHTML;
							screen.innerHTML = output.concat(operator);
						} else if (operator != "-" && isOperator(charBeforeLastChar)) {
							screen.innerHTML = output.slice(0,-2);
							output = screen.innerHTML;
							screen.innerHTML = output.concat(operator);
						} 
					}
					if (lastChar == "+") {
						if (operator == "-") {
							screen.innerHTML = output.concat(operator);
						} else if (operator != "-") {
							screen.innerHTML = output.slice(0,-1);
							output = screen.innerHTML;
							screen.innerHTML = output.concat(operator);
						}
					}
					if (lastChar == "*") {
						if (operator == "-") {
							screen.innerHTML = output.concat(operator);
						} else if (operator != "-") {
							screen.innerHTML = output.slice(0,-1);
							output = screen.innerHTML;
							screen.innerHTML = output.concat(operator);
						}
					}

					if (lastChar == "/") {
						if (operator == "-") {
							screen.innerHTML = output.concat(operator);
						}else if (operator != "-") {
							screen.innerHTML = output.slice(0,-1);
							output = screen.innerHTML;
							screen.innerHTML = output.concat(operator);
						}
					}

					if (lastChar == "%") {
						if (operator == "-") {
							screen.innerHTML = output.concat(operator);
						} 
						else if (operator != "-") {
							screen.innerHTML = output.slice(0,-1);
							output = screen.innerHTML;
							screen.innerHTML = output.concat(operator);
						}
					}
				}
				
				//in ra toán tử khi trc là  (output)
				else if(output) {
					screen.innerHTML = output.concat(operator);
				} 					
			});
	}   
	//hàm kiểm tra xem có phải toán tử hay ko ?.đúng trả về true,sai false.
	function isOperator(ope){
		if (ope == "+" || ope == "-" || ope == "*" || ope == "/" || ope == "%") {
			return true;
		}
		else
			return false;
	}

	
}