# atruestory

an interactive book on real life

## Running and testing the app

This generator brings you a preconfigured gulp-pipeline.
Please check the available npm scripts, or the gulpfile to see what you can do.

Basically there's:
* gulp start #development
* gulp build #production
* various testing and linting tasks

Basically we use gulp here just for the sake of watching for changes.
Jspm does all the hard packaging-work.

## Directory Layout

All we got here is:
* src #all non-test SourceCode goes in here
  * vendor #should something not be available as node-module, put it in here
  * modules #you should organize your components in here
* dist #the packaged product
* config #your testing configuration
* test #the test SourceCode

JSPM does a lot for us, so don't worry if you feel like - that's it?? - but read up on jspm.io.

## LICENCE

[MIT](http://mit-license.org/)
