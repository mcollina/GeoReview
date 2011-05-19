GeoReview
====================

Introduction
------------

GeoReview is a demo application built by [Mavigex][1] for the [WhyMCA conference][2].
You can find the slides of the presentation here (missing link).

GeoReview is an extremely simple use case of a geolocalized review
application, and we open sourced it for the conference.
See also the [PhoneGap][4] wrapping project at [GeoReview-PhoneGap-Android][5]

[4]: http://www.phonegap.com/home
[5]: https://github.com/mcollina/GeoReview-PhoneGap-Android
[1]: http://www.mavigex.com
[2]: http://www.whymca.org


Setup the Development Environment
---------------------------------

This application requires a full ruby installation plus bundler, and I
recommend using [RVM][3] to manage it. 
To setup the development environment you should:

1. Install bundler: `gem install bundler`.
2. Clone the repository: `git clone git://github.com/mcollina/GeoReview.git`.
3. Install all required dependencies: `bundle install`.
4. Run it: `rackup`.
5. Point your browser to [http://localhost:9292](http://localhost:9292).

[3]: https://rvm.beginrescueend.com/

Development
-----------

* Source hosted at GitHub.
* Report Issues/Questions/Feature requests on GitHub Issues.

Pull requests are very welcome! Make sure your patches are well tested. 
Please create a topic branch for every separate change you make.
