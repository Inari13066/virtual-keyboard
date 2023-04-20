import keys from "./keyboard.json" assert { type: "json" };

let btnColor = "#538083";

const body = document.querySelector("body");

let header = document.createElement("h1");
header.innerHTML = "Virtual Keyboard";

let text = document.createElement("textarea");

let keyboardContainer = document.createElement("table");

let notes = document.createElement("p");
notes.innerHTML = 'Created in Windows. Press "alt" + "shift" to change the language';

let noChangeBtns = [];

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
        let char = btn.innerHTML;
        btn.addEventListener("click", function () {
            console.log("here", char);
            addChar(char);
        });
    });
}

body.append(notes);
text.focus();

text.addEventListener("keydown", function (e) {
    console.log(e.key);
    let btnPressed;
    if (e.key.toLowerCase().match(/[a-z]/i) && e.key.length == 1) {
        btnPressed = document.querySelector(`#${e.key.toLowerCase()}`);
    } else {
        btnPressed = document.querySelector(`#${e.code.toLowerCase()}`);
    }

    btnPressed.style.backgroundColor = btnColor;
});

text.addEventListener("keyup", function (e) {
    console.log(e.key);
    let btnPressed;
    if (e.key.toLowerCase().match(/[a-z]/i) && e.key.length == 1) {
        btnPressed = document.querySelector(`#${e.key.toLowerCase()}`);
    } else {
        btnPressed = document.querySelector(`#${e.code.toLowerCase()}`);
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
    }
    text.focus();
    text.selectionStart = text.value.length;
}
