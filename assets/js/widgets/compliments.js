var compliment = {
  curCompliment: {},
  components: {},
};

compliment.updateDisplay = function () {
  var randInt = Utils.getRandomInt(0, compliments.length);
  compliment.curCompliment = config.compliments.array[randInt];
  compliment.fadeOut();
  if (Utils.isVisible(compliment.components.post)) {
    //Utils.CSSPrefixedEventListener(compliment.components.post, 'AnimationEnd', function() {
    //  compliment.replaceAndFadeIn();
    //});
  } else {
    compliment.replaceAndFadeIn();
  }
}

compliment.replaceAndFadeIn = function() {
  // Update text
  $(compliment.components.pre).text(compliment.curCompliment.pre);
  $(compliment.components.meat).text(compliment.curCompliment.meat);
  $(compliment.components.post).text(compliment.curCompliment.post);
  // Update animation
  compliment.fadeIn();
}

compliment.fadeOut = function() {
  $(compliment.components.pre).animateCss('fadeOut');
  $(compliment.components.meat).animateCss('fadeOut');
  $(compliment.components.post).animateCss('fadeOut');
}

compliment.fadeIn = function() {
  $(compliment.components.pre).animateCss('fadeInLeftBig');
  $(compliment.components.meat).animateCss('fadeInDown');
  $(compliment.components.post).animateCss('fadeInRightBig');
}

compliment.init = function() {
  // Set cached component array
  compliment.components['pre'] = document.getElementById('compliment-pre');
  compliment.components['meat'] = document.getElementById('compliment-meat');
  compliment.components['post'] = document.getElementById('compliment-post');
  // Setup the reset interval
  config.compliments.intervalID = setInterval(function() {
    compliment.updateDisplay();
  }, config.compliments.interval);
}
