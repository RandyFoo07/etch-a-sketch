const sketchPad = document.querySelector('.sketchPad');
const resizeButton = document.querySelector('.left button');

let size = 16;
let squareDiv = [];

setSize(size, squareDiv);

resizeButton.addEventListener('click', getSize);
squareDiv.forEach(square => square.addEventListener('mouseover', colorSquare));

function setSize(num, array) {
    sketchPad.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    sketchPad.style.gridTemplateRows = `repeat(${num}, 1fr)`;
    for (let i = 0; i < num * num; i++) {
        array[i] = document.createElement('div');
        array[i].classList.add('squareDiv');
        sketchPad.appendChild(array[i]);
    }
}

function getSize() {
    size = Number(prompt('What size to resize to (default = 16 (16x16))'));
    let squareDiv = [];
    sketchPad.innerHTML = '';
    setSize(size, squareDiv);
    squareDiv.forEach(square => square.addEventListener('mouseover', colorSquare));
}

function colorSquare(e) {
    e.target.style.backgroundColor = 'black';
}

//glear afer resizing