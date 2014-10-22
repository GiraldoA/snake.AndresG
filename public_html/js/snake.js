/*-----------------------------------------------------------------------------
 * variables
 * ----------------------------------------------------------------------------
 */
var snake;
var snakeLength;
var snakeSize;
var snakeDirection;

var food;

var conntext;
var screenwidth;
var screenheight;


/*-----------------------------------------------------------------------------
 * executing game code
 * ----------------------------------------------------------------------------
 */

gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 1000/30);

/*-----------------------------------------------------------------------------
 * game functions
 * ----------------------------------------------------------------------------
 */

function gameInitialize() {
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    document.addEventListener("keydown", keyboardHandler);
}

function gameLoop() {
    gameDraw();
    snakeUpdate();
    snakeDraw();
    foodDraw();
}

function gameDraw() {
    context.fillStyle = "rgb(105, 157, 255)";
    context.fillRect(0, 0, screenWidth, screenHeight);
}  

/*-----------------------------------------------------------------------------
 *snake function
 *-----------------------------------------------------------------------------
 */

function snakeInitialize() {
    snake = [];
    snakeLength = 1;
    snakeSize = 20;
    snakeDirection = "down";
    
    for(var index = snakeLength - 1; index >=0; index--) {
        snake.push({
            x: index,
            y: 0
        });
        
    }
}

function snakeDraw() {
    for(var index = 0; index < snake.length; index++) {
  context.fillStyle = "white";  
  context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
    if(snakeDirection == "down"){
        snakeHeadY++;
    }
    else if(snakeDirection == "right"){
        snakeHeadX++;
    }
    else if(snakeDirection == "left"){
        snakeHeadX--;
    }
    else if(snakeDirection == "up") {
        snakeHeadY--;
    }
    
    checkFoodCollisions(snakeHeadX, snakeHeadY);
    checkWallCollisions(snakeHeadX, snakeHeadY);
    
    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}

/*-----------------------------------------------------------------------------
 * food functions
 * ----------------------------------------------------------------------------
 */

function foodInitialize() {
    food = {
        x: 0,
        y: 0
    };
    setFoodPosition();
}

function foodDraw() {
    context.fillStyle = "white";
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

function setFoodPosition() {
    var randomX = Math.floor(Math.random() * screenWidth); 
    var randomY = Math.floor(Math.random() * screenHeight);
    
    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
    
    checkFoodCollisions( randomX, randomY);
}

/*-----------------------------------------------------------------------------
 * input functions
 * ----------------------------------------------------------------------------
 */

function keyboardHandler(event) {
    console.log(event);
    
    if(event.keyCode == "39" && snakeDirection != "left") {
        snakeDirection = "right";
    }
    else if(event.keyCode == "40" && snakeDirection != "up"){
        snakeDirection = "down";
    }
    else if(event.keyCode == "37" && snakeDirection != "right"){
        snakeDirection = "left";
    }
    else if(event.keyCode == "38" && snakeDirection != "down") {
        snakeDirection = "up";
    }
}

/*-----------------------------------------------------------------------------
 * collision Handling
 * ----------------------------------------------------------------------------
 */

function checkFoodCollisions(snakeHeadX, snakeHeadY, randomX, randomY) {
    if(snakeHeadX == food.x && snakeHeadY == food.y) {
       snake.push({
           x: 0,
           y: 0
       });
       snakeLength++;
    }
    
    if(snakeHeadX == food.x && snakeHeadY == food.y){
        randomX = Math.floor(Math.random() * screenWidth); 
     randomY = Math.floor(Math.random() * screenHeight);
    
    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
    }
}

function checkWallCollisions(snakeHeadX, snakeHeadY) {
    if(snakeHeadX * snakeSize >= screenWidth || snakeHeadX * snakeSize < 0) {
        console.log("wallCollision");
    }
}

function checkSnakeCollisions() {
    if(snakeHeadX == snakeBody && snakeHeadY == snakeBody) {
        snake.push({
            x:0,
            y:0
        });
        snakeLength--;
    }
}