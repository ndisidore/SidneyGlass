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
  var computed = window.getComputedStyle(el, null);
  return computed.getPropertyValue('visibility') !== 'hidden' &&
    computed.getPropertyValue('display') !== 'none' &&
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
  if (element.id in Utils.varStorage.cssEvents
    && type in Utils.varStorage.cssEvents[element.id]
    && -1 !== Utils.varStorage.cssEvents[element.id][type].indexOf(callback.toString())) {
    return;
  }
  // Add to the cached list of animationListeners
  if ('undefined' === typeof Utils.varStorage.cssEvents[element.id]) {
    Utils.varStorage.cssEvents[element.id] = {};
    Utils.varStorage.cssEvents[element.id][type] = [];
  }
  Utils.varStorage.cssEvents[element.id][type].push(callback.toString());
  // Add the new event listener
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
  Utils.CSSPrefixedEventListener(section, 'AnimationEnd', function() {
    $(section).children().html('&nbsp;');
    //$(section).removeClass('animated fadeOut');
    $(section).trigger('contentFadeFinished');
  });
}

/**
 * Get a random integer between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {int} a random integer
 */
Utils.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function initVersionCheck() {
  config.version.intervalID = setInterval(function() {
    Utils.doVersionCheck();
  }, config.version.updateInterval);
}

String.prototype.stripSlashes = function(){
    return this.replace(/\\(.)/mg, "$1");
}

// Extend cash.js to support animate.css
$.fn.extend({
  animateCss: function(animationName) {
    var context = this;
    Utils.CSSPrefixedEventListener(context, 'AnimationEnd', function() {
      $(context).removeClass(animationName).removeClass('animated');
    });
    $(context).addClass('animated ' + animationName);
  }
});
