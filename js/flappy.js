// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var width = 1150;
var height = 400;
var gameSpeed = 200;
var gameGravity = 500;
var jumpPower = 175;
var gapSize = 150;
var gapMargin = 50;
var blockHeight = 50;
var pipeEndExtraWidth = 10;
var splashDisplay;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);
var score;
var labelScore;
var player;
var pipes = [];
var balloons = [];
var weights = [];
var pipeBlock;
var first = 0;
var second = 0;
var third = 0;
var fourth = 0;
var no2 = 0;
var no3 = 0;
var county = 0;
var bonusWidth=50;
var pipeWidth=50;
var music;
//var zabor1;
//var zabor2;
score = 0;



/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("playerImg", "./assets/jamesBond.gif");
  //game.add.sprite(0, 300, 'playerImg');
  game.load.audio("score", "./assets/point.ogg");
  game.load.image('Bird', './assets/Bird.gif');
  game.load.image('pipeBlock', './assets/pipe.png');
  //game.load.image('zabor', '../assets/Zabor.png');
  game.load.image('pipeEnd', './assets/pipe-end.png');
  game.load.image('balloons', './assets/balloons.png');
  game.load.image('weights', './assets/weight.png');
  game.load.image('bg', './assets/bg2.png');
  game.load.audio('soundtrack', './assets/Song.wav');
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
  var backgroungVelocity = gameSpeed / 10;
  var backgroundSprite = game.add.tileSprite(0, 0, width, height, "bg");
  backgroundSprite.autoScroll(-backgroungVelocity, 0);
  game.stage.setBackgroundColor("#0099cc");
  //game.add.text(0, 0, "Welcome to Aleksey's Bird!", {font: '30px Impact', fill: '#FFFFFF'});
  game.add.text(900, 0, 'Your score:', {font: '30px Impact', fill: '#FFFFFF'});
  game.input.onDown.add(clickHandler);
  labelScore = game.add.text(1040, 0, score.toString(), {font: '40px Impact', fill: '#FF0000'});
  player = game.add.sprite(100, 200, "Bird");
  game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(start);
  game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(four);
  game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(three);
  game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(one);
  game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(two);
  music = game.add.audio('soundtrack');
  music.play();
  //zabor1 = game.add.sprite(110, 1, 'zabor');
  //zabor2 = game.add.sprite(110, 399, 'zabor');
  //game.physics.arcade.enable(zabor1);
  //game.physics.arcade.enable(zabor2);
  player.width = 50;
  player.height = 50;
  player.x=150;
  player.y=200;
  game.physics.arcade.enable(player);
  //game.add.text(0,0, '' + player.x);
  splashDisplay = game.add.text(100,200, "Press ENTER to start, SPACEBAR to jump, try to score AS MUCH AS POSSIBLE", {fill: '#77bc01', font: '30px Impact'});
}
function start(){
  score-=1;
  //game.input.keyboard.addKey(Phaser.Keyboard.R).onDown.add(reset);
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
  player.anchor.setTo(0.5, 0.5);
  generateSth();
  game.physics.startSystem(Phaser.Physics.ARCADE);
  player.body.gravity.y = gameGravity;
  var pipeInterval = 2.50 * Phaser.Timer.SECOND;
  game.time.events.loop(pipeInterval, generateSth);
  game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.remove(start);
  splashDisplay.destroy();
  county = 0;
}



    // set the background colour of the scene


/*
 * This function updates the scene. It is called for every new frame.
 */
 function noWay(){
   first=0;
   second=0;
   third=0;
   fourth=0;
 }
function update() {
  player.rotation = Math.atan(player.body.velocity.y / gameSpeed);
  //game.physics.arcade.overlap(player, zabor1, gameOver);
  //game.physics.arcade.overlap(player, zabor2, gameOver);
  checkBonus(balloons, -50);
  checkBonus(weights, 50);
  for(var i=pipes.length - 1; i >= 0; i--) {
   if(pipes[i].body.x - pipeWidth < 0){
     pipes[i].destroy();
     pipes.splice(i,1);
   }
 }
 game.physics.arcade.overlap(player, pipes, gameOver);
  if(player.body.y <0 || player.body.y > 400) {
    gameOver();
  }
  function gameOver() {
    //game.destroy();
    registerScore(score);
    game.state.restart();
    score=-1;
    gameGravity = 500;
    music.stop();
  if (player.y>490) {
      gameOver();
    }
  }

 if (county > 3){
   noWay();
   no2=0;
   no3=0;
   county=0;
 }
}

function clickHandler(event) {
//  alert('Click in ' + event.x +',' + event.y);
  game.add.sprite(event.x, event.y, 'playerImg');
}
function spaceHandler() {
  game.sound.play("score");
  player.body.velocity.y = -jumpPower;
}
function one(){
  first = 1;
  second = 0;
  third = 0;
  fourth = 0;
  county++;
}
function two(){
  if (first == 1 && no2 < 1) {
   second=1;
   county++;
 no2+=1;}
  else  {
  noWay();
  no2=0;
  county++;
 }
}

function three(){
  if (first==1 && second==1 && no3 < 1){
    third=1;
    no3+=1;
    county++;
  }
  else {
    noWay();
    no3=0;
    county++;
  }
}
function four(){
  if (first==1 && second==1 && third==1){
    noRules();
    noWay();
    county++;
  }
  else{
    noWay();
    county++;
  }
}
function changeScore(){
  score+=1;
  labelScore.setText(score.toString());
}
function changeGravity(g){
  gameGravity+=g;
  player.body.gravity.y = gameGravity;
}
/*function moveRight() {
  player.x+=10;
}
function moveLeft() {
  player.x-=10;
}
function moveUp() {
  player.y-=10;
}
function moveDown() {
  player.y+=10;
}*/
function noRules(){
  score+=15;
}
/*function reset() {
  player.x=395;
  player.y=200;
}*/
function generatePipe() {
  var gapStart = game.rnd.integerInRange(gapMargin,height - gapSize - gapMargin);
  addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart);
  for (var y = gapStart; y>0 ; y-=blockHeight){
        addPipeBlock(width, y - blockHeight);
       }
  addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart + gapSize - 25);
  for (var y = gapStart + gapSize; y < height; y += blockHeight) {
        addPipeBlock(width, y);
   }
   changeScore();
}
function addPipeBlock(x,y) {
  var pipeBlock = game.add.sprite(x, y, 'pipeBlock');
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -gameSpeed;
}
function addPipeEnd(x,y) {
  var pipeEnd = game.add.sprite(x, y, 'pipeEnd');
  pipes.push(pipeEnd);
  game.physics.arcade.enable(pipeEnd);
  pipeEnd.body.velocity.x = -gameSpeed;
}
function generateBalloons(){
  var bonus = game.add.sprite(width, height, 'balloons');
  balloons.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = -gameSpeed;
  bonus.body.velocity.y = - game.rnd.integerInRange(34,68);
}
function generateWeights(){
  var bonus = game.add.sprite(width, 0, 'weights');
  weights.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = -gameSpeed;
  bonus.body.velocity.y = game.rnd.integerInRange(34,68);
}
function generateSth(){
  var random = game.rnd.integerInRange(0,100);
  if (random > 11 ){
    generatePipe();
  }
  else if (random > -1 && random <6) {
    generateWeights();
  }
  else{
    generateBalloons();
  }
}
function checkBonus(bonusArray, bonusEffect) {
for(var i=bonusArray.length - 1; i>=0; i--){
  if(bonusArray[i].body.x - bonusWidth < 0){
    bonusArray[i].destroy();
    bonusArray.splice(i,1);
    }
  else {
    game.physics.arcade.overlap(player,bonusArray[i], function(){
      bonusArray[i].destroy();
      bonusArray.splice(i,1);
      changeGravity(bonusEffect); });
} } }
