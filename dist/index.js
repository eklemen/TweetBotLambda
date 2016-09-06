var Twit = require('twit');
var wordfilter = require('wordfilter');
var T = new Twit(require('botfiles/config.js'));
var myText = require('botfiles/sample-text.js');
var Promise = require("bluebird");
var fs = require('fs') 

//a nice 'pick' function thanks to Darius Kazemi: https://github.com/dariusk
Array.prototype.pick = function() {
  return this[Math.floor(Math.random()*this.length)];
};

//functions 
  function tweetOK(phrase) {
      if (!wordfilter.blacklisted(phrase) && phrase !== undefined && phrase !== "" && tweetLengthOK(phrase)){
        return true;
      } else {
        return false;
      }
  }

  function tweetLengthOK(phrase) {
      if (phrase.length <= 130){
        return true;
      } else {
        return false;
      }
  }

function pickTweet(){
      return new Promise(function(resolve, reject) {
        fs.readFile(myText, function(err, data) {
            if(err) throw err; 
            var array = data;
            singleTweet = array[0];     
            array.splice(0, 1);
            // array = array.join('\n');    
            fs.writeFile(myText, array);
            resolve(singleTweet);
        })
      })
  }


exports.handler = function myBot(event, context) {

    pickTweet().then(function(tweet){
      var textToTweet =  tweet;
        T.post('statuses/update', { status: textToTweet }, function(err, reply) {
              if (err) {
                console.log('error:', err);
                context.fail();
              }
              else {
                console.log('tweet:', reply);
                context.succeed();
              }
            });
    });
  
  	
};

