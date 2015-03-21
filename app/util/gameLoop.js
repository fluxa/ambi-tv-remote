/**
Length of a tick in milliseconds. The denominator is your desired framerate.
e.g. 1000 / 20 = 20 fps,  1000 / 60 = 60 fps
*/
var tickLengthMs = 1000 / 5;

/* gameLoop related variables */
// timestamp of each loop
var previousTick = Date.now();
// number of times gameLoop gets called
var actualTicks = 0;

var shouldRun = false;

var gameLoop = function () {
  if (shouldRun) {
    var now = Date.now();

    actualTicks++
    if (previousTick + tickLengthMs <= now) {
      var delta = (now - previousTick) / 1000;
      previousTick = now;

      exports.update(delta, now);

      console.log('delta', delta, '(target: ' + tickLengthMs +' ms)', 'node ticks', actualTicks);
      actualTicks = 0;
    }

    if (Date.now() - previousTick < tickLengthMs - 16) {
      timeOutObj = setTimeout(gameLoop);
    } else {
      immediateObj = setImmediate(gameLoop);
    }
  }
}

exports.stop = function() {
  shouldRun = false;
}

exports.run = function() {
  shouldRun = true;
  gameLoop();
}


/**
Update is normally where all of the logic would go. In this case we simply call
a function that takes 10 milliseconds to complete thus simulating that our game
had a very busy time.
*/
exports.update = function(delta, now) {

}
