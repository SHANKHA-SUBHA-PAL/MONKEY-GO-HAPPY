var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var BananaGroup, obstacleGroup
var survivalTime,bananaPoint;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collided = loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  backGroundImage = loadImage("monkey go happy.png")
  
  groundImage = loadImage("groundimage.png");
 
}



function setup() {      
createCanvas(425,400);
  
  
  backGround = createSprite(200,200,600,10); 
  backGround.addImage(backGroundImage);   
  backGround.scale = 1.4;
  backGround.x = backGround.width/2
  backGround.velocityX = -3;  
  
  
  ground = createSprite(200,390,400,30);
  ground.addImage(groundImage);
  ground.scale = 1.40;
  ground.velocityX = -3;
  ground.x = ground.width/2
  
  invisibleGround = createSprite(200,390,400,5);
  invisibleGround.velocityX = -3;
  invisibleGround.visible = false;
  
  monkey = createSprite(75,355,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.11;
  
  
  //monkey.debug = true;

  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  survivalTime=0;
  bananaPoint=0;
}


function draw() {
background("green");
  
  
  if(gameState === PLAY){
  
  survivalTime = Math.round(frameCount/100);
  
  if (backGround.x&&ground.x&&invisibleGround.x<144){
  
  backGround.x=240;
  ground.x=240;
  invisibleGround.x = 200
  
  }
  
  if (keyWentDown("space")&& monkey.y >= 350){
      
  monkey.velocityY=-15;   
  
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
  
  if(bananaGroup.isTouching(monkey)){
  
  bananaPoint = bananaPoint+1;
  bananaGroup.destroyEach();
  
  }
  
  spawnBanana();
  spawnObstacles();
    
  if(obstacleGroup.isTouching(monkey)){
  
  gameState = END;
  
  }
  monkey.collide(invisibleGround);
  }else if(gameState === END){
  
  backGround.velocityX = 0;
  ground.velocityX = 0;
  invisibleGround.velocityX = 0;
  
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  monkey.destroy();
  
  }
  
  
  
  drawSprites();
  stroke("black");
  textSize(15);
  fill("green");
  
  text("SURVIVAL POINTS: "+survivalTime,150,50)
  stroke("black");
  textSize(15);
  fill("green");
  
  text("BANANA POINTS: "+bananaPoint,158,70)
}

function spawnBanana(){

if (frameCount % 80 === 0){

banana = createSprite(390,120,20,20);
banana.y = Math.round(random(200,300));
banana.addImage(bananaImage);
banana.scale = 0.06;
banana.velocityX=-5;
banana.lifetime = 70;

bananaGroup.add(banana);
}
}

function spawnObstacles(){
if (frameCount % 150 === 0){

obstacle = createSprite(390,375,20,20);
obstacle.addImage(obstacleImage);
obstacle.scale = 0.16;
obstacle.velocityX=-5;
obstacle.lifetime = 80;

obstacleGroup.add(obstacle);
obstacle.setCollider("circle",0,0,200)
//obstacle.debug = true;
}
}

