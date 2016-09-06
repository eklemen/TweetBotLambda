var fs = require('fs')   
var singleTweet;  
var Promise = require("bluebird");
var readFilePromise = function(file){
    return new Promise(function(resolve, reject) {
    fs.readFile(file, function(err, data) {
        if(err) throw err; 
        var array = data.toString().split("\n");
        singleTweet = array[0];     
        array.splice(0, 1);
        array = array.join('\n');       
        fs.writeFile('tweets.txt', array);
        resolve(singleTweet);
    })
  })
    // fs.readFile('tweets.txt', function(err, data){
    //     if(err) throw err; 
    //     var array = data.toString().split("\n");
    //     singleTweet = array[0];     
    //     array.splice(0, 1);
    //     array = array.join('\n');       
    //     fs.writeFile('tweets.txt', array);
    //     someOtherFn(singleTweet);
    // })
}

// var someOtherFn = function(data){
//     console.log('someOtherFn: ' + data);
// }
readFilePromise('tweets.txt').then(function(tweet){
    console.log("tweet: " + tweet)
})
// console.log('derp(): ' + derp());
