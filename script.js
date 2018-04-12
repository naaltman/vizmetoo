var data;
var result;
var timing = [10,20,30,40];
var currentTweet;
var story=["In 2006 Tarana Burke started the me too movement, helping survivors of sexual assault \n and violence to reclaim their bodies, and create a radical community of healing through declaration.",
"In early 2017, the wealthy and powerful were finally being exposed and expunged from their \ncommunities for their egregious actions that had previously gone unnoticed. Then, on October 15, \nin response to rising media stir of Harvey Weinstein assaulting dozens of women, Alyssa Milano took to twitter, \nasking individuals to reply #MeToo to her tweet, if they too had experienced acts of violence. \nHer tweet brought to the forefront a conversation Tarana Burke had been having for years, \nand brought together a community larger than anyone could have imagined.",
"In the months following thousands were brought together to share their stories, \nand unlike many other viral campaigns their voices aren't getting quieter.",
"Listen to a glimpse of the conversation from December 13, 2017."]
var part;
var curTime;
var storyElms = [];

function preload(){
  data = loadTable("data/unique_tweets.csv", "csv", "header")
}

function setup(){
  // tweet raw text is in row 1
  print("loaded data")
  var myCanvas = createCanvas(windowWidth, windowHeight);
  console.log(typeof(myCanvas))
  myCanvas.parent('myContainer')
  tweets = new Tweets();
  part = 0
  isDisplayed = false

}

function Story(element, x, y){
  element.position(x,y)

  this.placement = function(){
    x += random(0, windowWidth)
    y += random(0,windowHeight)
    element.position(x,y)
  }
}

function draw(){
  curTime = millis()
  if(part < 4){
    if(isDisplayed==false){
      textAlign(CENTER)
      textStyle(BOLD)
      textSize(15)
      text(story[part], (windowWidth/2)-100, windowHeight/2)
      isDisplayed=true
    }
    if(ceil(curTime % 200) == 1){
      print("here")
      isDisplayed = false
      clear()
      part +=1
    }
  } else{
    tweets.display()
  }
}

function Tweets(){
  this.x = windowWidth/2
  this.y = windowHeight/2
  this.curTweet = 0
  this.showedTweet = false

  this.showTweet = function(){
    toPrint = data.getString(this.curTweet, 1) + " @" + data.getString(this.curTweet, 2)
    tweet = text(toPrint, this.x, this.y, windowWidth/4, windowHeight/4)
    this.x = random(windowWidth-180)
    this.y = random(windowHeight)
  }

  this.display = function(){
    startTime = millis()
    // have tweets show slowly at first & then speed up
    if(this.curTweet == 0){
      toPrint = data.getString(this.curTweet, 1) + " @" + data.getString(this.curTweet,2)
      textSize(15)
      textStyle(BOLD)
      text(toPrint, (windowWidth/2) - 250, (windowHeight/2) - 80, windowWidth/4, windowHeight/4)
      this.curTweet +=1
    }
    else{
      if(ceil(startTime % 80) == 1){
          this.showTweet()
      } else{
        if(ceil(startTime % 40) == 1){
          this.showTweet()
        }
      }
      this.curTweet +=1
    }
  }

}