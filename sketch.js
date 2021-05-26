var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, lastFed;
var hour;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new DogFood();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed = createButton("Feed Dog");
  feed.position(600, 100);
  feed.mousePressed(feedDog);
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  lastFed = database.ref('FeedTime');

  //write code to display text lastFed time here

  fill("white");

  if(lastFed>=12){
    console.log("good");
    text("Last Fed: PM", 500, 30);
  }else if(lastFed==0){
    text("Last Fed: 12 AM", 500, 30)
  }else{
    text("Last Fed: AM", 500, 30);
  }
  
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time

  var food_stock_value = foodObj.getFoodStock();
  if(food_stock_value <= 0){
    foodObj.updateFoodStock(food_stock_value *0);
  }else{
    foodObj.updateFoodStock(food_stock_value -1);
  }

  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}
