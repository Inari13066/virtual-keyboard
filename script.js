import keys from "./keyboard.json" assert { type: "json" };

let btnColor = "#538083";

const body = document.querySelector("body");

let header = document.createElement("h1");
header.innerHTML = "Virtual Keyboard";

let text = document.createElement("textarea");

let keyboardContainer = document.createElement("table");

let notes = document.createElement("p");
notes.innerHTML = 'Created in Windows. Press "alt" + "shift" to change the language. Double click to pinch "shift"';

let noChangeBtns = [];
let isShiftPressed = false;

body.append(header);
body.append(text);
body.append(keyboardContainer);
for (let i = 0; i < 5; i++) {
    let row = document.createElement("tr");
    keyboardContainer.append(row);
    keys[i].forEach((key) => {
        let btn = document.createElement("button");
        btn.innerHTML = key.name;
        if (key.name.match(/[a-z]/i) && key.name.length == 1) {
            btn.id = `${key.name}`;
        } else {
            btn.id = `${key.code}`;
        }

        keyboardContainer.rows[i].append(btn);
        btn.style.width = `${40 * key.size}px`;
        if (key.shift == "no") {
            noChangeBtns.push(key.name);
        }
        if (key.name == "shift") {
            btn.addEventListener("dblclick", function (e) {
                handleShift();
                console.log(e.srcElement.id);
                let btnPressed = document.querySelector(`#${e.srcElement.id.toLowerCase()}`);
                if (isShiftPressed) {
                    btnPressed.style.backgroundColor = btnColor;
                } else {
                    btnPressed.style.removeProperty("background-color");
                }
            });
        }
        let char = btn.innerHTML;
        btn.addEventListener("click", function () {
            addChar(char);
        });
    });
}

body.append(notes);
text.focus();

let btns = document.querySelectorAll("button");

text.addEventListener("keydown", function (e) {
    console.log(e.key);
    let btnPressed;
    if (e.key.toLowerCase().match(/[a-z]/i) && e.key.length == 1) {
        btnPressed = document.querySelector(`#${e.key.toLowerCase()}`);
    } else {
        btnPressed = document.querySelector(`#${e.code.toLowerCase()}`);
    }
    if (btnPressed.innerHTML == "shift") {
        if (!isShiftPressed) {
            handleShift();
        }
    }

    btnPressed.style.backgroundColor = btnColor;
});

text.addEventListener("keyup", function (e) {
    let btnPressed;
    if (e.key.toLowerCase().match(/[a-z]/i) && e.key.length == 1) {
        btnPressed = document.querySelector(`#${e.key.toLowerCase()}`);
    } else {
        btnPressed = document.querySelector(`#${e.code.toLowerCase()}`);
    }
    if (btnPressed.innerHTML == "shift") {
        handleShift();
    }

    btnPressed.style.removeProperty("background-color");
});

function addChar(char) {
    if (!noChangeBtns.includes(char)) {
        console.log("here again", text, text.value);
        text.value += char;
    } else if (char == "space") {
        text.value += " ";
    } else if (char == "backspace") {
        text.value = text.value.slice(0, -1);
    } else if (char == "shift") {
        // handleShift();
    }
    text.focus();
    text.selectionStart = text.value.length;
}

function handleShift() {
    console.log("handled");
    if (!isShiftPressed) {
        btns.forEach((b) => {
            if (b.id.toLowerCase().match(/[a-z]/i) && b.id.length == 1) {
                b.style.textTransform = "uppercase";
            }
        });
        isShiftPressed = true;
    } else {
        btns.forEach((b) => {
            if (b.id.toLowerCase().match(/[a-z]/i) && b.id.length == 1) {
                b.style.textTransform = "none";
            }
        });
        isShiftPressed = false;
    }
}
