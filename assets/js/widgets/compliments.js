var compliment = {
  curCompliment: {},
  components: {},
};

compliment.updateDisplay = function() {
  var randInt = Utils.getRandomInt(0, config.compliments.array.length-1);
  compliment.curCompliment = config.compliments.array[randInt];

  compliment.fadeOut();
  $(compliment.components.section).on('fadeOutComplete', function() {
    compliment.replaceAndFadeIn();
  });
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
  Utils.CSSPrefixedEventListener(compliment.components.post, 'AnimationEnd', function() {
    $(compliment.components.section).trigger('fadeOutComplete');
  });
  $(compliment.components.post).animateCss('fadeOut');
}

compliment.fadeIn = function() {
  // Setup to fade in one at a time
  Utils.CSSPrefixedEventListener(compliment.components.meat, 'AnimationEnd', function() {
    $(compliment.components.post).animateCss('fadeInRightBig');
  });
  Utils.CSSPrefixedEventListener(compliment.components.pre, 'AnimationEnd', function() {
    $(compliment.components.meat).animateCss('fadeInLeftBig');
  });
  $(compliment.components.pre).animateCss('fadeInLeftBig');
}

compliment.init = function() {
  // Set cached component array
  compliment.components['pre'] = document.getElementById('compliment-pre');
  compliment.components['meat'] = document.getElementById('compliment-meat');
  compliment.components['post'] = document.getElementById('compliment-post');
  compliment.components['section'] = document.getElementById('compliment');
  // Setup the reset interval
  config.compliments.intervalID = setInterval(function() {
    compliment.updateDisplay();
  }, config.compliments.interval);
}
