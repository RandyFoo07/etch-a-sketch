const sketchPad = document.querySelector('.sketchPad');
const resizeButton = document.querySelector('.left button');
resizeButton.addEventListener('click', getSize);

let size = 16;
let squareDiv = [];

setSize(size);


function setSize(num) {
    sketchPad.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    sketchPad.style.gridTemplateRows = `repeat(${num}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        squareDiv[i] = document.createElement('div');
        squareDiv[i].classList.add('squareDiv');
        sketchPad.appendChild(squareDiv[i]);
    }
}

function getSize() {
    size = Number(prompt('What size to resize to (eg. type 16 for 16x16'));
    setSize(size);
}