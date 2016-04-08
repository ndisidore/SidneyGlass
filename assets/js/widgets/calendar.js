var calendar = {
  cache: {},
};

calendar.loadData = function(name, url) {
  var jcalData = ICAL.parse(url);
  var vcalendar = new ICAL.Component(jcalData);
  var vevents = vcalendar.getAllSubcomponents('vevent');
}

"controllers/calendar.php" + "?url="+encodeURIComponent(this.calendarUrl)
