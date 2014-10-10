var snake;
var snakeLength;
var snakeSize;

var conntext;
var screenwidth;
var screenheight;

gameInitialize();
gameDraw();

function gameInitialize() {
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
}

function gameLoop() {
    
}

function gameDraw() {
    context.fillStyle = "rgb(105, 157, 255)";
    context.fillRect(0, 0, screenWidth, screenHeight);
}  

function snakeInitialize() {
    snake = [];
    snakeLength = 15;
    snakeSize = 20;
}

function snakeDraw() {
    
}

function snakeUpdate() {
    
}