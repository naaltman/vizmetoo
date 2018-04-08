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


function preload(){
  data = loadTable("data/unique_tweets.csv", "csv", "header")
}

function setup(){
  // tweet raw text is in row 1
  print("loaded data")
  createCanvas(windowWidth, windowHeight);
  tweets = new Tweets();
  part = 0
}

function draw(){
  curTime = millis()
  if(part < 4){
    textAlign(CENTER)
    text(story[part], windowWidth/2, windowHeight/2)
    if(ceil(curTime % 200) == 1){
      print("here")
      clear()
      part +=1
    }
  } else{
    tweets.display()
  }
}

function Tweets(){
  this.x = windowWidth/3
  this.y = windowHeight/2
  this.curTweet = 0
  this.showedTweet = false

  this.showTweet = function(){
    tweet = text(data.getString(this.curTweet, 1), this.x, this.y)
    this.x = random(windowWidth-180)
    this.y = random(windowHeight)
  }

  this.display = function(){
    startTime = millis()
    // have tweets show slowly at first & then speed up
    if(ceil(startTime % 60) == 1){
        this.showTweet()
    } else{
      if(ceil(startTime % 20) == 1){
        this.showTweet()
      }
    }
    this.curTweet +=1
  }
}
