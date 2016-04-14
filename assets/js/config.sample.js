var config = {
  lang: 'en',
  time: {
    timeFormat: 12,
    displaySeconds: true,
    digitFade: false,
  },
  weather: {
    //change weather params here:
    params: {
      q: 'Washington, D. C., US',
      units: 'imperial',
      lang: 'en',
      APPID: 'YOUR_FREE_OPENWEATHER_API_KEY'
    }
  },
  compliments: {
    interval: 30000,
    fadeInterval: 4000,
    morning: [
      'Good morning, handsome!',
      'Enjoy your day!',
      'How was your sleep?'
    ],
    afternoon: [
      'Hello, beauty!',
      'You look sexy!',
      'Looking good today!'
    ],
    evening: [
      'Wow, you look hot!',
      'You look nice!',
      'Hi, sexy!'
    ]
  },
  calendars: {
    maximumEntries: 10, // Total Maximum Entries
    displaySymbol: true,
    defaultSymbol: 'calendar', // Fontawsome Symbol see http://fontawesome.io/cheatsheet/
    urls: [{
      name: 'Home Calendar',
      symbol: 'fort-awesome',
      url: 'http://home-calendar-url'
    }, {
      name: 'US National Holidays',
      symbol: 'star',
      url: 'https://calendar.google.com/calendar/ical/en.usa%23holiday%40group.v.calendar.google.com/public/basic.ics',
    }, ]
  },
  news: {
    feed: 'http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml'
  },
  quotes: {
    interval: 30000,
    fadeInterval: 4000
  },
  version: {
    updateInterval: 600000,
    intervalID: null
  }
}
