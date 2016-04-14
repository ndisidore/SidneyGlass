var calendar = {
  allCalCache: {},
  upcomingEvents: [],
  components: {},
};

calendar.loadData = function(name, symbol, url) {
  ajax('http://localhost:8080/calendar?d=2&url=' + url, {}).then(function(xhr) {
    // Fulfilled Promise
    if (200 !== xhr.status || -1 === xhr.responseText.indexOf('BEGIN:VCALENDAR')) {
      console.log('ERROR: Invalid calendar - ' + name + ' at ' + url);
      return;   // Invalid calendar
    }
    var jcalData = null;
    try {
      jcalData = ICAL.parse(xhr.responseText);
    } catch (err) {
      console.log('ERROR: Calendar parse error on ' + name + ' at ' + url);
      return;   // Bail.
    }
    var vcalendar = new ICAL.Component(jcalData);
    // Grab each event and create a new Event object for said event
    var vevents = vcalendar.getAllSubcomponents('vevent');
    var iCalEvents = [];
    for (var j = 0; j < vevents.length; j++) {
      iCalEvents.push(new ICAL.Event(vevents[j]));
    }
    // Sort the data so its in date order.
		iCalEvents.sort(calendar.sort);
    calendar.getFutureEvents(name, symbol, iCalEvents);
    $(calendar.components.table).trigger('calendarLoadFinished');
  }, function(xhr) {
    // Rejected Promise
    if (200 !== xhr.status || -1 === xhr.responseText.indexOf('BEGIN:VCALENDAR')) {
      console.log('ERROR: Invalid calendar - ' + name + ' at ' + url);
      return;   // Invalid calendar
    }
  });
}

calendar.getFutureEvents = function(name, symbol, iCalEvents) {
  var nextEventIdx = 0;
  var today = new Date();
  while (iCalEvents[nextEventIdx].startDate.toJSDate() < today) {
    nextEventIdx++;
  }

  // Now get the upcoming events
  calendar.allCalCache[name] = [];
  var totalEvents = iCalEvents.length;
  for(var i = 0; i < config.calendars.maximumEntries; i++) {
    // Bounds check
    if (nextEventIdx + i > totalEvents - 1) { break; }
    // Add the source calendar to the event for use later
    iCalEvents[nextEventIdx + i]['from'] = name;
    iCalEvents[nextEventIdx + i]['symbol'] = symbol;
    // And Add to the cache
    calendar.allCalCache[name].push(iCalEvents[nextEventIdx + i]);
  }
}

calendar.mergeAllAndSort = function() {
  // Clear current upcoming event list
  calendar.upcomingEvents.length = 0;
  // Merge All "Upcoming 10 Events" calendars
  for (cal in calendar.allCalCache) {
    Array.prototype.push.apply(calendar.upcomingEvents, calendar.allCalCache[cal]);
  }
  // Now sort the merged array
  calendar.upcomingEvents.sort(calendar.sort);
  // And grab the first X
  if (calendar.upcomingEvents.length > config.calendars.maximumEntries) {
    calendar.upcomingEvents.length = config.calendars.maximumEntries;
  }
}

calendar.updateDisplay = function() {
  $(calendar.components.table).removeClass('fadeIn');
  // Build row html
  var html = '';
  for (var i=0; i < calendar.upcomingEvents.length; i++) {
    html += calendar.addRow(calendar.upcomingEvents[i]);
  }
  // Fade out current event list
  Utils.CSSPrefixedEventListener(calendar.components.table, 'AnimationEnd', function() {
    // Update html
    $(calendar.components.tbody).html(html);
    // And fade in
    $(calendar.components.table).animateCss('fadeIn');
  });
  $(calendar.components.table).animateCss('fadeOut');
}

calendar.addRow = function(event) {
  var html = '';
  html += '<tr>';
  // event.symbol
  html += '<td class="date-time">' + event.symbol + '</td>';
  html += '<td class="summary">' + event.summary + '</td>';
  html += '</tr>';
  return html;
}

calendar.sort = function(a,b) {
  return a.startDate.toJSDate() - b.startDate.toJSDate();
}

calendar.init = function() {
  // Set cached component array
  calendar.components['tbody'] = document.getElementById('calendar-tbody');
  calendar.components['table'] = document.getElementById('calendar-events');

  // Fetch and cache.
  var curCal = null;
  for (cal in config.calendars.cals) {
    curCal = config.calendars.cals[cal];
    if (curCal.hasOwnProperty('symbol') && curCal.hasOwnProperty('url')) {
      calendar.loadData(cal, curCal.symbol, curCal.url);
    }
  }

  // Merge and purge (and update, purge just sounds cooler).
  calendar.mergeAllAndSort();
  calendar.updateDisplay();
}

// http://localhost:8080/?d=2&url=https://calendar.google.com/calendar/ical/en.usa%23holiday%40group.v.calendar.google.com/public/basic.ics
