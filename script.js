import keys from "./keyboard.json" assert { type: "json" };

const body = document.querySelector("body");

let header = document.createElement("h1");
header.innerHTML = "Virtual Keyboard";

let text = document.createElement("textarea");

let keyboardContainer = document.createElement("table");

let notes = document.createElement("p");
notes.innerHTML = 'Created in Windows<br>Press "alt" + "shift" to change the language';

body.append(header);
body.append(text);
body.append(keyboardContainer);
for (let i = 0; i < 5; i++) {
    let row = document.createElement("tr");
    keyboardContainer.append(row);
    keys[i].forEach((key) => {
        let btn = document.createElement("button");
        btn.innerHTML = key.name;
        keyboardContainer.rows[i].append(btn);
        btn.style.width = `${40*key.size}px`;
    });
}

body.append(notes);

