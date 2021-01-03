var dog, dogImg, happyDog, happyDogImg;
var database;
var foodS;
var foodStock;

function preload()
{
    dogImg = loadImage ("Dog.png");
    happyDogImg = loadImage("happydog.png");
}

function setup()
{
    database = firebase.database();

    createCanvas(500,500);
    dog = createSprite(250,250,50,50);
    dog.addImage(dogImg);
    dog.scale = 0.1;

    var foodStock=database.ref("Food");
    foodStock.on("value", readStock);

}

function draw()
{
    background(46,139,87);

    if(keyWentDown(UP_ARROW))
    {
        writeStock(foodS);
        
        dog.addImage(happyDogImg);
    }

    drawSprites();

    textSize (20);
    fill(255);
    stroke(0);
    text("Food remaining:  ",180,200);
    text("Note: Press UP_ARROW key to feed Drago milk!", 30, 50);
}

function readStock(data)
{
    foodS=data.val();
}

function writeStock(x)
{
    if (x<=0)
    {
        x=0;
    }
    else
    {
        x=x-1;
    }

    database.ref('/').update({Food:x})
}