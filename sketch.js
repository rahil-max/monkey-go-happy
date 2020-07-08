
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var count = 0;

var monkey,monkeyimg;
var ground,groundimg;
var invisibleGround;
var bg,bgimg;
var stonesGroup,stoneimg;
var bananaGroup,bananaimg;
var gameOver,gameoverimg;
var restart,restartimg;
var edges;



function preload(){
  monkeyimg=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  groundimg=loadImage("ground.jpg");
  
  bgimg = loadImage("jungle.jpg");
  
  gameoverimg = loadImage("gameOver.png");
  
  restartimg = loadImage("restart.png");
                          
   stoneimg = loadImage("stone.png");                       
  bananaimg = loadImage("Banana.png");
  
  
  
}


function setup() {
  createCanvas(600,300);
  
  bg= createSprite(200,400,400,30);
 bg.addImage(bgimg);
bg.scale = 1;
bg.width =800;
  
  monkey = createSprite(200,220,20,50);
  monkey.addAnimation("monkeyboy",monkeyimg);
monkey.setCollider("circle",0,0,30);




monkey.scale = 0.18;
monkey.x = 50;


 ground = createSprite(200,400,400,30);
 ground.addImage(groundimg);
ground.scale = 0.3;
ground.width =800;

  
 

invisibleGround = createSprite(200,230,400,5);
invisibleGround.visible = false;

stonesGroup = new Group();
 bananaGroup = new Group();

 gameOver = createSprite(300,150);
gameOver.addImage("over",gameoverimg);
gameOver.scale = 1;
gameOver.visible = false;
  
  restart = createSprite(300,200);
restart.addImage("restart",restartimg);
restart.scale = 0.6;
restart.visible = false;

}


function draw() {
  
  background("white");
 edges=createEdgeSprites();
  
  text("Score: "+ count, 250, 100);
  console.log(gameState);

  if(gameState === PLAY){
    
    ground.velocityX = -(6 + 3*count/100);
    
   count += Math.round(getFrameRate()/60);
    
    if (bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      count+=20;
      //playSound("sound://category_collect/energy_bar_recharge_4.mp3");
    }
    
    if (count>0 && count%100 === 0){
      monkey.scale+=0.1
      //playSound("sound://category_points/vibrant_game_game_key_1.mp3"//);
  }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    if((keyDown("space")||keyDown(UP_ARROW)) && monkey.y >= 190){
      monkey.velocityY = -12 ;
     // playSound("sound://category_jump/arcade_game_jump_1.mp3");
    }
  
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
   
    spawnbanana();
  

    spawnstones();
    
   
    if(stonesGroup.isTouching(monkey)){
      
      gameState = END;
      //playSound("sound://category_explosion/vibrant_smack_game_object//_2.mp3");
    }
  }
  
  if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
   
    ground.velocityX = 0;
    monkey.velocityY = 0;
    stonesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
   
    
   
    stonesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    
  }
  
  if(gameState===END&&keyDown("r")) {
    reset();
    
  }
    
 
  monkey.collide(invisibleGround);
  
  drawSprites();
}


function spawnstones() {
  if(frameCount % 60 === 0) {
    var stone = createSprite(400,250,10,40);
    stone.velocityX = - (6 + 3*count/100);
    
    stone.addImage(stoneimg);
    
    stone.scale = 0.3;
    stone.lifetime = 70;
    
    stonesGroup.add(stone);
    //stone.debug=true;
    
    stone.setCollider("circle",30,0,200);
    
  }
}


function spawnbanana() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(400,200,40,10);
    banana.y = Math.round(random(100,150));
    banana.addImage(bananaimg);
    banana.scale = 0.11;
    banana.velocityX = -3;
    
    
    banana.lifetime = 134;
    
   
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
   
    bananaGroup.add(banana);
  }
  
}

function reset (){
  gameState=PLAY;
  stonesGroup.destroyEach();
  bananaGroup.destroyEach();
  gameOver.visible=false;
  restart.visible = false;
  monkey.addAnimation(monkeyimg);
  count=0;
}






  
