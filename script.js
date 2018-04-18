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
var speaker = new p5.Speech();
var voices = ['Google US English', 'Google UK English Female', 'Alice',
'Amelie', 'Anna', 'Ellen', 'Fiona', 'Ioana', 'Joana', 'Karen', 'Laura', 'Luciana',
'Mei-Jia', 'Melina', 'Milena', 'Moira', 'Monica', 'Nora', 'Paulina', 'Samantha',
'Sara', 'Tessa', 'Victoria', 'Zosia', 'Zuzana']
var eng_voices = ['Google UK English Female']
var shouldSpeak
var isCleaned
var tweetIndex
var mySound

function preload(){
  data = loadTable("data/Tweets_Without_URL.csv", "csv", "header")
  mySound = loadSound('song.mp3');
}

function setup(){
  // tweet raw text is in row 1
  print("loaded data")
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('myContainer')
  tweets = new Tweets()
  part = 0
  isDisplayed = false
  shouldSpeak = false
  isCleaned = true
  tweetIndex = 6
  speakButton = createButton('speak tweets')
  speakButton.class('btn btn-light btn-style')
  stopButton = createButton('stop speaking')
  stopButton.class('btn btn-light btn-style')
  playMusic = createButton('music on')
  playMusic.class('btn btn-light btn-style')
  musicOff = createButton('music off')
  musicOff.class('btn btn-light btn-style')
  cleanTweets = createButton('clean tweets')
  cleanTweets.class('btn btn-light btn-style')
  speakButton.position(265, 76)
  speakButton.mousePressed(tweets.makeSpeak)
  stopButton.position(395, 76)
  stopButton.mousePressed(tweets.stopSpeaking)
  playMusic.position(530, 76)
  playMusic.mousePressed(tweets.playMusic)
  musicOff.mousePressed(tweets.musicOff)
  musicOff.position(630, 76)
  cleanTweets.position(733, 76)
  cleanTweets.mousePressed(tweets.clean)
  mySound.play()

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
      textSize(20)
      text(story[part], (windowWidth/2)-100, windowHeight/2)
      isDisplayed=true
    }
    if(ceil(curTime % 173) == 1){
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
  this.tweetIndex = 1

  this.showTweet = function(){
    // draw tweet time
    noStroke()
    fill("#fff")
    rect(65,35,130,25)
    tweet_time = data.getString(this.curTweet,2)
    textSize(20)
    fill("#000")
    text(tweet_time, 65, 50)

    // draw username
    textSize(20)
    textStyle(BOLD)
    fill("#000000")
    user = "@" + data.getString(this.curTweet,3) + "\n"
    text(user,  this.x, this.y+2, windowWidth/4, windowHeight/4)

    // draw tweet
    tweet = data.getString(this.curTweet, tweetIndex)
    textSize(15)
    textStyle(NORMAL)
    text(tweet, this.x, this.y+30, (windowWidth/3) , windowHeight/4)

    if(shouldSpeak == true){
      var rand = ceil(random(0,eng_voices.length-1))
      speaker.setVoice(eng_voices[rand])
      speaker.speak(tweet)
    }

    this.curTweet +=1

    // next tweet in random location within the frame
    this.x = random(windowWidth/3 + 200)
    this.y = random(windowHeight-100)
  }

  this.display = function(){
    startTime = millis()
    // have tweets show slowly at first & then speed up
    if(this.curTweet == 0){
      // draw tweet time
      tweet_time = data.getString(this.curTweet,2)
      textSize(20)
      text(tweet_time, 65, 50)

      // draw username
      textSize(20)
      textStyle(BOLD)
      fill("#000000")
      user = "@" + data.getString(this.curTweet,3) + "\n"
      text(user,  (windowWidth/3) - 118, (windowHeight/2) - 80, windowWidth/4, windowHeight/4)

      // draw tweet
      tweet = data.getString(this.curTweet, tweetIndex)

      // speak tweet in female voice
      if(shouldSpeak == true){
        var rand = ceil(random(0,eng_voices.length-1))
        speaker.setVoice(eng_voices[rand])
        speaker.speak(tweet)
      }

      textSize(15)
      textStyle(NORMAL)
      text(tweet, (windowWidth/3) - 118, (windowHeight/2) - 50, (windowWidth/3) , windowHeight/4)
      this.curTweet +=1

    }
    else{
    //   // start drawing slowly, then go faster as more load
      if(ceil(startTime % 93) == 1){
          this.showTweet()
      } else{
        if(ceil(startTime % 52) == 1){
          this.showTweet()
        }
      }
      if(this.curTweet > data.length){
        this.curTweet = 0
      }
    }
  }

  this.makeSpeak = function(){
    shouldSpeak = true
  }

  this.stopSpeaking = function(){
    shouldSpeak = false
  }

  this.clean = function(){
    // tweets without URL are at position 6
    // raw tweets are at 1
    if(tweetIndex == 6){
      tweetIndex = 1
    } else{
      tweetIndex = 6
    }
  }

  this.playMusic = function(){
    mySound.play()
  }

  this.musicOff = function(){
    mySound.stop()
  }

}
