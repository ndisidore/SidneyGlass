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
  $.getJSON('controllers/hash.php')
    .success(function(data) {
			// The githash variable is located in index.php
			if (data && data.gitHash !== gitHash) {
				window.location.reload();
				window.location.href = window.location.href;
      }
    });
}

function initVersionCheck {
	config.version.intervalID = setInterval(function () {
		checkVersion();
	}, config.version.updateInterval);
}
