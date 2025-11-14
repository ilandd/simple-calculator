  var inputan = document.getElementById('inputan');
    var scrollIndicator = document.getElementById('scrollIndicator');
    var hasError = false;
    var hasDecimalInCurrentNumber = false;
    
    function updateScrollIndicator() {
        if (inputan.scrollHeight > inputan.clientHeight) {
            scrollIndicator.style.display = 'block';
        } else {
            scrollIndicator.style.display = 'none';
        }
    }
    
    function resetDecimalFlag() {
        hasDecimalInCurrentNumber = false;
    }
    
    function checkDecimalInput() {
        var currentText = inputan.innerHTML;
        var operators = ['+', '-', '*', '/'];
        var lastOperatorIndex = -1;
        
        for (var i = 0; i < operators.length; i++) {
            var index = currentText.lastIndexOf(operators[i]);
            if (index > lastOperatorIndex) {
                lastOperatorIndex = index;
            }
        }
        
        var currentNumber = lastOperatorIndex >= 0 
            ? currentText.substring(lastOperatorIndex + 1) 
            : currentText;
        
        return currentNumber.includes('.');
    }
    
    function tombol(obj) { 
        var kondisi = obj.innerHTML; 
        
        if (hasError && kondisi !== "AC") {
            inputan.innerHTML = "0";
            inputan.classList.remove('error');
            hasError = false;
            hasDecimalInCurrentNumber = false;
        }
        
        if (kondisi == "=") { 
            try {
                let expression = inputan.innerHTML;
                
                if (/[\+\-\*\/]$/.test(expression)) {
                    throw new Error("Ekspresi tidak lengkap");
                }
                
                let result = eval(expression);
                
                if (typeof result === 'number' && !isNaN(result)) {
                    if (Number.isInteger(result)) {
                        inputan.innerHTML = result.toString();
                    } else {
                        inputan.innerHTML = parseFloat(result.toPrecision(12)).toString();
                    }
                } else {
                    throw new Error("Hasil tidak valid");
                }
                
                hasDecimalInCurrentNumber = inputan.innerHTML.includes('.');
            } catch (error) {
                inputan.innerHTML = "Error";
                inputan.classList.add('error');
                hasError = true;
                hasDecimalInCurrentNumber = false;
            }
        } else if (kondisi == "Del") { 
            if (inputan.innerHTML.length > 1) {
                if (inputan.innerHTML.slice(-1) === '.') {
                    hasDecimalInCurrentNumber = false;
                }
                inputan.innerHTML = inputan.innerHTML.slice(0, -1);
                
                hasDecimalInCurrentNumber = checkDecimalInput();
            } else {
                inputan.innerHTML = "0";
                hasDecimalInCurrentNumber = false;
            }
        } else if (kondisi == "AC") { 
            inputan.innerHTML = "0";
            inputan.classList.remove('error');
            hasError = false;
            hasDecimalInCurrentNumber = false;
        } else if (kondisi === ".") {
            if (!hasDecimalInCurrentNumber) {
                if (inputan.innerHTML === "0" || inputan.innerHTML === "Error" || /[\+\-\*\/]$/.test(inputan.innerHTML)) {
                    inputan.innerHTML += "0.";
                } else {
                    inputan.innerHTML += ".";
                }
                hasDecimalInCurrentNumber = true;
            }
        } else if (['+', '-', '*', '/'].includes(kondisi)) {
            if (inputan.innerHTML === "0" || inputan.innerHTML === "Error") {
                inputan.innerHTML = "0" + kondisi;
            } else {
                if (['+', '-', '*', '/'].includes(inputan.innerHTML.slice(-1))) {
                    inputan.innerHTML = inputan.innerHTML.slice(0, -1) + kondisi;
                } else {
                    inputan.innerHTML += kondisi;
                }
            }
            resetDecimalFlag();
        } else { 
            if (inputan.innerHTML == "0" || inputan.innerHTML == "Error") { 
                inputan.innerHTML = kondisi; 
            } else { 
                inputan.innerHTML += kondisi; 
            } 
        }
        
        updateScrollIndicator();
        
        inputan.scrollTop = inputan.scrollHeight;
    }
    
    updateScrollIndicator();