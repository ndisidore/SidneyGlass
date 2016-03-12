'use strict';

var Utils = {};

Utils.varStorage = {
  cssEvents: {}
};

Utils.sectionUpdated = function(sectionNode, animation) {
  if (sectionNode && sectionNode.nodeType) {
    $(sectionNode).addClass('animated');
    $(sectionNode).addClass(animation);
  }
}

Utils.updateSectionHTML = function(sectionID, html, animation) {
  var update_elem = document.getElementById(section);
  if (update_elem) {
    $(update_elem).html(html);
  }
}


Utils.updateSectionText = function(sectionID, txt, animation) {
  var update_elem = document.getElementById(section);
  if (update_elem) {
    $(update_elem).text(txt);
  }
}

Utils.isVisible = function(el) {
  return el && el.clientWidth !== 0 &&
    el.clientHeight !== 0 &&
    el.style.opacity !== 0 &&
    el.style.visibility !== 'hidden';
}

Utils.doVersionCheck = function() {
  // @TODO: Make this type of call the only one that can do a git pull
  ajax('/hash', {}).then(function(xhr) {
    var curGitHash = xhr.responseText.replace(/(\r\n|\n|\r)/gm, '');
    if ('' !== curGitHash && curGitHash !== cachedGitHash) {
      // Hash mismatch; reload the page
      window.location.reload();
      window.location.href = window.location.href;
    }
  }, function(xhr) {
    console.error('HASH API returned', xhr.status, xhr.statusText);
    console.log(xhr);
  });
}

// Helper for adding CSS event listeners
Utils.CSSPrefixedEventListener = function(element, type, callback) {
  if ( typeof element === 'object' && element[0] ) element = element[0];
  // Lets make sure there's not a bunch of the same listener
  if (element.id in Utils.varStorage.cssEvents && Utils.varStorage.cssEvents[element.id] == type) {
    return;
  }
  // Add to the cached list of animationListeners
  Utils.varStorage.cssEvents[element.id] = type;
  var pfx = ["webkit", "moz", "MS", "o", ""];
	for (var p = 0; p < pfx.length; p++) {
		if (!pfx[p]) type = type.toLowerCase();
		element.addEventListener(pfx[p] + type, callback, false);
	}
}

Utils.fadeOutCurrentContent = function(section) {
  if (typeof section == "string") section = document.getElementById('section');
  // Grab all the children
  //$(section).children().animateCss('fadeOut');
  $(section).animateCss('fadeOut');
}

function initVersionCheck() {
  config.version.intervalID = setInterval(function() {
    Utils.doVersionCheck();
  }, config.version.updateInterval);
}

// Extend cash.js to support animate.css
$.fn.extend({
  animateCss: function(animationName) {
    var context = this;
    Utils.CSSPrefixedEventListener(context, 'AnimationEnd', function() {
      $(context).removeClass('animated ' + animationName);
    });
    $(context).addClass('animated ' + animationName);
  }
});
