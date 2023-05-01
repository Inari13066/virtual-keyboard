import keysEn from "./keyboard.json" assert { type: "json" };
import keysRu from "./keyboardRu.json" assert { type: "json" };

let btnColor = "#538083";
let mainLang = "en";
let keys = keysEn;

const body = document.querySelector("body");

let header = document.createElement("h1");
header.innerHTML = "Virtual Keyboard";

let text = document.createElement("textarea");
text.autofocus;

let keyboardContainer = document.createElement("table");

let notes = document.createElement("p");
notes.innerHTML =
    'Created in Windows. Press "alt" + "shift" to change the language. Double click to pinch "shift" or "alt"';

let noChangeBtns = [];
let isShiftPressed = false;
let isAltPressed = false;
let isCapsPressed = false;

body.append(header);
body.append(text);
body.append(keyboardContainer);
createKeys("en");

body.append(notes);
text.focus();

text.addEventListener("keydown", function (e) {
    let btnPressed;
    if (e.key.toLowerCase().match(/[a-z]/i) && e.key.length == 1) {
        btnPressed = document.querySelector(`#${e.key.toLowerCase()}`);
    } else {
        btnPressed = document.querySelector(`#${e.code.toLowerCase()}`);
    }
    if (btnPressed.innerHTML == "shift") {
        if (!isShiftPressed) {
            if (isAltPressed) {
                changeLang();
            } else {
                handleShift();
            }
        }
    }
    if (btnPressed.innerHTML == "alt") {
        if (!isAltPressed) {
            isAltPressed = true;
            if (isShiftPressed) {
                changeLang();
            }
        }
    }
    // console.log(e.key)
    if (e.key == "Tab") {
        // console.log("Tab")
        e.preventDefault();
        addChar("tab", "tab");
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
        isShiftPressed = true;
        handleShift();
    }
    if (btnPressed.innerHTML == "alt") {
        isAltPressed = false;
    }

    btnPressed.style.removeProperty("background-color");
    text.focus();
});

function addChar(char, id) {
    // console.log(text.selectionStart);
    let position = text.selectionStart;
    let arr = text.value.split("");

    if (!noChangeBtns.includes(char)) {
        if (!isShiftPressed && !isCapsPressed) {
            arr.splice(position, 0, char);
            position++;
        } else {
            if (isCapsPressed && id.match(/[a-z]/i) && id.length == 1) {
                arr.splice(position, 0, findInKeys(char).shift);
            } else if (isCapsPressed) {
                arr.splice(position, 0, char);
            }
            if (isShiftPressed) {
                arr.splice(position, 0, findInKeys(char).shift);
            }
            position++;
        }
    } else if (id == "space") {
        arr.splice(position, 0, " ");
        position++;
    } else if (id == "backspace") {
        arr.splice(position - 1, 1);
        position--;
    } else if (id.includes("shift")) {
        // handleShift();
        // TODO: Handle short shift click
        if (isAltPressed) {
            changeLang();
        }
    } else if (id.includes("alt")) {
        if (isShiftPressed) {
            changeLang();
        }
    } else if (id == "enter") {
        arr.splice(position, 0, "\n");
        position++;
        // console.log(arr);
    } else if (id == "capslock") {
        handleCaps();
    } else if (char == "tab") {
        arr.splice(position, 0, "\t");
        position++;
        // console.log(arr);
    } else if (char == "del") {
        arr.splice(position, 1);
    }
    text.value = arr.join("");
    text.setSelectionRange(position, position);
    text.focus();
}

function handleShift() {
    let btns = document.querySelectorAll("button");
    if (!isShiftPressed) {
        btns.forEach((b) => {
            // console.log("handling", b);
            if (b.id.toLowerCase().match(/[a-z]/i) && b.id.length == 1) {
                b.style.textTransform = "uppercase";
            } else if (!noChangeBtns.includes(b.id.toLowerCase())) {
                let key = findInKeys(b.id);
                b.innerHTML = key.shift;
            }
        });
        isShiftPressed = true;
    } else {
        btns.forEach((b) => {
            if (b.id.toLowerCase().match(/[a-z]/i) && b.id.length == 1) {
                b.style.textTransform = "none";
            } else if (!noChangeBtns.includes(b.id.toLowerCase())) {
                let key = findInKeys(b.id);
                b.innerHTML = key.name;
            }
        });
        isShiftPressed = false;
    }
}

function handleCaps() {
    let capsKey = document.querySelector("#capslock");
    let btns = document.querySelectorAll("button");
    if (!isCapsPressed) {
        btns.forEach((b) => {
            if (b.id.toLowerCase().match(/[a-z]/i) && b.id.length == 1) {
                b.style.textTransform = "uppercase";
            }
        });
        capsKey.style.backgroundColor = btnColor;
        isCapsPressed = true;
    } else {
        btns.forEach((b) => {
            if (b.id.toLowerCase().match(/[a-z]/i) && b.id.length == 1) {
                b.style.textTransform = "none";
            }
        });
        capsKey.style.removeProperty("background-color");
        isCapsPressed = false;
    }
}

function findInKeys(smth) {
    let key;
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i].find((item) => item.code == smth);
        if (key != undefined) {
            return key;
        }
        key = keys[i].find((item) => item.name == smth);
        if (key != undefined) {
            return key;
        }
    }
}

function changeLang() {
    console.log("lang change");
    if (mainLang == "en") {
        mainLang = "ru";
        createKeys("ru");
    } else {
        mainLang = "en";
        createKeys("en");
    }
}

function createKeys(lang) {
    if (lang == "en") {
        keys = keysEn;
    } else {
        keys = keysRu;
    }

    if (keyboardContainer.firstChild) {
        removeAllChildNodes(keyboardContainer);
    }

    isAltPressed = false;
    isShiftPressed = false;

    for (let i = 0; i < 5; i++) {
        let row = document.createElement("tr");
        keyboardContainer.append(row);
        keys[i].forEach((key) => {
            let btn = document.createElement("button");
            btn.innerHTML = key.name;
            if (key.id.match(/[a-z]/i) && key.id.length == 1) {
                btn.id = `${key.id}`;
            } else {
                btn.id = `${key.code}`;
            }

            keyboardContainer.rows[i].append(btn);
            btn.style.width = `${40 * key.size}px`;
            if (key.shift == "no") {
                noChangeBtns.push(key.id);
                noChangeBtns.push(key.code);
            }
            if (key.id == "shift") {
                btn.addEventListener("dblclick", function (e) {
                    handleShift();
                    let btnPressed = document.querySelector(`#${e.srcElement.id.toLowerCase()}`);
                    if (isShiftPressed) {
                        btnPressed.style.backgroundColor = btnColor;
                    } else {
                        btnPressed.style.removeProperty("background-color");
                    }
                });
                btn.addEventListener("mousedown", handleShift);
                btn.addEventListener("mouseup", handleShift);
            }
            if (key.id == "alt") {
                btn.addEventListener("dblclick", function (e) {
                    let btnPressed = document.querySelector(`#${e.srcElement.id.toLowerCase()}`);
                    if (!isAltPressed) {
                        btnPressed.style.backgroundColor = btnColor;
                        isAltPressed = true;
                    } else {
                        btnPressed.style.removeProperty("background-color");
                        isAltPressed = false;
                    }
                });
            }
            let char = btn.innerHTML;
            let charID = btn.id;
            btn.addEventListener("click", function () {
                addChar(char, charID);
            });
        });
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function setLocalStorage() {
    localStorage.setItem("lang", mainLang);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem("lang")) {
        mainLang = localStorage.getItem("lang");
    }
    createKeys(mainLang);
}
window.addEventListener("load", getLocalStorage);
