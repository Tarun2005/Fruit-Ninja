var PLAY = 1;
var END = 0;
var gameState = 1;

var sword, enemy, fruitGroup, enemyGroup;
var swordImage, monsterImage, fruit1, fruit2, fruit3, fruit4, gameoverImage;

function preload(){
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameoverImage = loadImage("gameover.png");
  gameOverSound=loadSound("gameover.mp3")
  knifeSwordSound=loadSound("knifeSwooshSound.mp3")
}

function setup() {
  createCanvas(400,400);
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();

  score = 0;
}

function draw() {
  background("skyblue")
   if(gameState === PLAY){
     fruits();
     Enemy();
     
     position = Math.round(random(1,2));
  
    if (position == 1) {
    fruits.x=600;
  }
     sword.y = World.mouseY;
     sword.x = World.mouseX;
     
      
     if (fruitGroup.isTouching(sword)) {
  fruitGroup.destroyEach();
    score=score+2;
    knifeSwordSound.play();
}
   }
   
     if (enemyGroup.isTouching(sword)) {
     gameState = END;
     fruitGroup.destroyEach();
     enemyGroup.destroyEach();
     fruitGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0);
     sword.addImage(gameoverImage);
     sword.x = 200;
     sword.y = 200;
     gameOverSound.play();
   }
   
  drawSprites();
  
  text("Score: "+ score,300,30);
}

function fruits(){
    if(World.frameCount%80===0){ 
      fruit = createSprite(400,200,20,20);
      fruit.scale = 0.2;
      r=Math.round(random(1,4));
     if(r == 1) {
      fruit.x = 400;
       fruit.addImage(fruit1);
     } else if (r == 2) {
       fruit.addImage(fruit2);
     } else if (r == 3) {
       fruit.addImage(fruit3);
     } else {
       fruit.addImage(fruit4);
     }
      
      fruit.y = Math.round(random(50,340));
      var set_position=Math.round(random(1,2));
  if (set_position==1){
    fruit.x = 400;
    fruit.velocityX= -7
    }else{
      fruit.x = 0;
      fruit.velocityX= 7
    }
      fruit.lifetime = 100;
      fruitGroup.add(fruit);
    }
}
  
function Enemy(){
  if(World.frameCount %200 === 0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100,300));
    var set_position=Math.round(random(1,2));
  if (set_position==1){
    monster.x = 400;
    monster.velocityX = -(8+(score/10));
    }else{
      monster.x=0;
      monster.velocityX = 8+(score/10)
    }
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
  }
}
