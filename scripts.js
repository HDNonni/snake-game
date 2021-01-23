let grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const scoreDisplay = document.getElementById("score");
let squaresArray = [];
let currentSnake = [2, 1, 0];
let direction = 1;
//10 squares width
const width = 10;
let appleIndex = 0;
let score = 0;
let interval = 1000;
let speed = 0.9;
let timerId = 0;

function createGrid() {
    //create 100 of these elements with a for loop
    for (let i = 0; i < width * width; i++) {
        //create element
        const square = document.createElement("div");
        //add styling to the element
        square.classList.add("square");
        //put the element into our grid
        grid.appendChild(square);
        //push it into a new squares array
        squaresArray.push(square);
    }
}

createGrid();
//apply something to each index in the array
currentSnake.forEach((index) => squaresArray[index].classList.add("snake"));

function startGame() {
    //remove the snake
    currentSnake.forEach((index) =>
        squaresArray[index].classList.remove("snake")
    );
    //remove the apple

    squaresArray[appleIndex].classList.remove("apple");

    clearInterval(timerId);
    currentSnake = [2, 1, 0];
    score = 0;
    //re add new score to browser
    scoreDisplay.textContent = score;
    direction = 1;
    interval = 1000;
    generateApples();
    //re add the class of snake to our currentSnake
    currentSnake.forEach((index) => squaresArray[index].classList.add("snake"));
    //apply something to each index in the array

    timerId = setInterval(move, interval);
}

function move() {
    //bottom
    if (
        (currentSnake[0] + width >= width * width && direction === width) ||//if snake has hit bottom
        (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) ||//if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) ||//if snake has hit top
        squaresArray[currentSnake[0] + direction].classList.contains("snake")
    ) {
        console.log("cleared");
        return clearInterval(timerId);
    }
    //remove last element from our currentSNake array
    const tail = currentSnake.pop();
    //remove styling from last element
    squaresArray[tail].classList.remove("snake");
    //add square in direction we are heading and add styling
    //add to beginning of array
    currentSnake.unshift(currentSnake[0] + direction);
    //console.log('current', currentSnake)
    //snake head getting apple
    if (squaresArray[currentSnake[0]].classList.contains("apple")) {
        //remove the class of apple
        squaresArray[currentSnake[0]].classList.remove("apple");

        //grow our snake by adding class of snake to it
        squaresArray[tail].classList.add("snake");

        //grow our snake array
        currentSnake.push(tail);

        //generate a new apple
        generateApples();

        //add one to the score
        score++;
        //snake eats apple
        scoreDisplay.textContent = score;
        //didn't need to append
        clearInterval(timerId);
        //speed up the snake
        interval *= speed;
        timerId = setInterval(move, interval);
    }

    squaresArray[currentSnake[0]].classList.add("snake");
}

//;
function generateApples() {
    do {
        //generate random number
        appleIndex = Math.floor(Math.random() * squaresArray.length);
        //while index contains class of snake get a new random number to go somewhere else
    } while (squaresArray[appleIndex].classList.contains("snake"));
    squaresArray[appleIndex].classList.add("apple");
}
generateApples();

// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

function controls(e) {
    if (e.keyCode === 39) {
        //console.log("right");
        direction = 1;
    } else if (e.keyCode === 38) {
        //console.log("up");
        direction = -width;
    } else if (e.keyCode === 37) {
        //console.log("left");
        direction = -1;
    } else if (e.keyCode === 40) {
        //console.log("down");
        direction = +width;
    }
}

document.addEventListener("keyup", controls);
startBtn.addEventListener("click", startGame);
