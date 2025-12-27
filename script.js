const display = document.getElementById("display");
const resultPreview = document.getElementById("result-preview");

function appendValue(val) {
  if (val === "/") display.value += "÷";
  else if (val === "*") display.value += "×";
  else display.value += val;

  updatePreview();
}

function clearDisplay() {
  display.value = "";
  resultPreview.textContent = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
  updatePreview();
}

function calculate() {
  try {
    display.value = evaluate(display.value);
    resultPreview.textContent = "";
  } catch {
    display.value = "Error";
    resultPreview.textContent = "";
  }
}

function updatePreview() {
  try {
    if (/[+\-×÷%]/.test(display.value)) {
      resultPreview.textContent = "= " + evaluate(display.value);
    } else {
      resultPreview.textContent = "";
    }
  } catch {
    resultPreview.textContent = "";
  }
}

function evaluate(expr) {
  expr = expr.replace(/×/g, "*").replace(/÷/g, "/");

  const tokens = expr.match(/\d+(\.\d+)?|[+\-*/%]/g);
  if (!tokens) return 0;

  let current = parseFloat(tokens[0]);
  let operator = null;

  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i];

    if ("+-*/".includes(token)) {
      operator = token;
    } else if (token === "%") {
      current = current / 100;
    } else {
      const num = parseFloat(token);

      if (operator === "+") current += num;
      else if (operator === "-") current -= num;
      else if (operator === "*") current *= num;
      else if (operator === "/") current /= num;
      else {
        
        current *= num;
      }
    }
  }

  return +current.toFixed(10); 
}
