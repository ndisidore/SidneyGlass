function sectionUpdated(sectionNode, animation) {
  if ( sectionNode && sectionNode.nodeType ) {
    $(sectionNode).addClass('animated');
    $(sectionNode).addClass(animation);
  }
}

function updateSectionHTML(sectionID, html, animation) {
  var update_elem = document.getElementById(section);
  if (update_elem) {
    $(update_elem).html(html);
  }
}

function updateSectionText(sectionID, txt, animation) {
  var update_elem = document.getElementById(section);
  if (update_elem) {
    $(update_elem).text(txt);
  }
}

function doVersionCheck() {
  // @TODO: Make this type of call the only one that can do a git pull
  ajax('/hash', {}).then(function(xhr) {
    var curGitHash = xhr.responseText.replace(/(\r\n|\n|\r)/gm,'');
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

function initVersionCheck() {
	config.version.intervalID = setInterval(function () {
		checkVersion();
	}, config.version.updateInterval);
}
