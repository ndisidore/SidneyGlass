# SidneyGlass
A modern, lightweight magic mirror dashboard created with the Raspberry Pi Zero in mind.

![Now we can have some fun](https://31.media.tumblr.com/tumblr_lyua4zUR9E1qml86b.gif)

### Motivation
SidneyGlass was built to be as fast and lightweight as possible.

The complexity of the other magic mirror dashboards seemed like overkill for what essentially is a web server that serves up static files with a few API requests. SidneyGlass aims to fix that while providing a more modern front end stack that both works out of the box AND has the ability to always be up to date. The libraries it pulls are actively maintained

Advantages of SidneyGlass:
  - No jQuery. No massive libraries. Only the fairest of the all.
  - No PHP/Apache installs. Server runs on python which comes pre-packaged with the Pi distros.
  - Bower for dependencies and grunt for build. Always up to date and easy to tweak to your liking.
  - Animate.css to provide CSS powered, GPU accelerated animations. Shiny!

### Installation
For a simple come-as-you-are install, installing should be as simple as doing a git clone on this repo.

Once you've cloned the repo, you'll need to create your own config.js using the provided config.sample.js as a sample.

Finally, start the server and you should be in business. The system is setup to run locally by default listening on port 8080 - http://locahost:8080
```sh
$ python server.py
```

### What's in a name?
SidneyGlass has a legacy to live up to and is named after the character in Once Upon a Time based on the the magic mirror.

![Bad thing for a good reason](https://49.media.tumblr.com/tumblr_m5zhz1NDT61qd9agqo1_250.gif)

### Version
0.4.1

### Tech
SidneyGlass uses a number of open source projects to work properly:

* [Skeleton] - A Dead Simple, Responsive Boilerplate for Mobile-Friendly Development
* [cash.js] - An absurdly small jQuery alternative for modern browsers
* [Animate.css] - a bunch of cool, fun, and cross-browser animations for you to use in your projects
* [iCal.js] - Mozilla JS parser
* [FontAwesome] - all manner of icons
* [Bower] - dependency managment made easy
* [Grunt] - the streaming build system

### Development

Want to contribute and make the magic happen? Great!
SidneyGlass uses Bower + Grunt for fast developing.

Make a change in either assets/css or assets/js then run

(Optional) In the project root:
```sh
$ bower update
```

In the project root:
```sh
$ grunt
```

This will rebuild the frontend files.

### Todos

 - Use real magic

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [Skeleton]: <http://getskeleton.com/>
   [cash.js]: <https://github.com/kenwheeler/cash>
   [Animate.css]: <https://daneden.github.io/animate.css/>
   [iCal.js]: <https://github.com/mozilla-comm/ical.js/>
   [Bower]: <http://bower.io/>
   [Grunt]: <http://gruntjs.com/>
   [FontAwesome]: <https://fortawesome.github.io/Font-Awesome/>
