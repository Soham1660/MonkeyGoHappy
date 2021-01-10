var monkey, monkey_running;
var banana, bananaImage;
var obstacle, obstacleImage, obstaclegroup;
var background, backImage;
var score = 0 ;


function preload(){
  
  backImage = loadImage("jungle.jpg");
  monkey_running =     loadAnimation("Monkey1.png","Monkey2.png","Monkey3.png","Monkey4.png","Monkey5.png","Monkey6.png",);
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
 
}



function setup() {
  createCanvas(displayWidth, displayHeight);
  background = createSprite(300,200);
  background.addImage(backImage);
 
  
  monkey = createSprite(80,300,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.3;
  
  ground = createSprite(400,400,900,10);
  ground.velocityX = -4;
  ground.x=ground.width/2
  console.log(ground.x)
  ground.visible = false;
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
}


function draw() {  
  //jump when the space key is pressed
    if(keyDown("space")) {
        monkey.velocityY = -10;
    }
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(FoodGroup.isTouching(monkey)){
    score=score + 2
    banana.destroy();
  }
  
  switch(score){
    case 10:monkey.scale=0.12
      break;
    case 20:monkey.scale=0.14
      break;
    case 30:monkey.scale=0.16
      break;
    case 40:monkey.scale=0.18
      break;
  }
  
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale = 0.2;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
  

  
  spawnFood();
  spawnObstacles();
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score,450,30);
}


function spawnFood(){
 if (frameCount % 80 === 0) {
   banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -6;
    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
       
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    FoodGroup.add(banana);
 }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
   
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}