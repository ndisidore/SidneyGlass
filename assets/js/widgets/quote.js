var quoteWidget = {
  curQuote: {},
};

quoteWidget.getNew = function(doUpdate) {
  doUpdate = doUpdate || false;
  ajax('/quote', {}).then(function(xhr) {
    var quoteJSON = xhr.responseText;
    var parsedQuote = null;
    try {
      parsedQuote = JSON.parse(quoteJSON);
    } catch(SyntaxError) {
      try {
        parsedQuote = JSON.parse(quoteJSON.stripSlashes());
      } catch (err) {
        console.log('ERROR: JSON parse', quoteJSON);
      }
    }
    if (parsedQuote) {
      quoteWidget.curQuote = parsedQuote;
      if (doUpdate) {
        quoteWidget.updateDisplay();
      }
    }
  }, function(xhr) {
    console.error('ERROR: QUOTE API returned', xhr.status, xhr.statusText);
    console.log(xhr);
  });
}

quoteWidget.updateDisplay = function() {
  var quoteElem = document.getElementById('quote');
  $(quoteElem).on('contentFadeFinished', function() {
    // Update text
    $(quoteElem).find('#quote-meat').text(quoteWidget.curQuote.quoteText);
    $(quoteElem).find('#quote-author').text(quoteWidget.curQuote.quoteAuthor);
    // Update animation
    $(quoteElem).animateCss('fadeInUp');
  });
  Utils.fadeOutCurrentContent(quoteElem);
}

quoteWidget.init = function() {
  config.quotes.intervalID = setInterval(function() {
    quoteWidget.getNew(true);
  }, config.quotes.interval);
}
