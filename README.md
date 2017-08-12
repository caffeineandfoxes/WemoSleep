# WemoSleep
WemoSleep is an [Apache Cordova](https://cordova.apache.org) app which ties in with the [IFTTT Maker Webhooks service](https://ifttt.com/maker_webhooks) to add sleep timer functionality to [Wemo](http://www.belkin.com/us/Products/home-automation/c/wemo-home-automation/) switches.

## Requirements
* A supported Wemo switch
* An [IFTTT](https://ifttt.com/) account configured to receive triggers through the Maker Webhooks service
* A compatible device or browser (see Current Target Platforms)

## Setup
Please note that these instructions assume you have installed and configured Cordova for the platform(s) you wish to use with the app.

1. Clone the project repository to your local machine.
2. Configure a new applet using the Maker and Wemo channels in IFTTT. When the Maker event is received, the specified Wemo switch should be set to turn off.
3. On the [Maker Webhooks service page](https://ifttt.com/maker_webhooks), select “Documentation”. Replace `{event}` with the event name you specified, and copy the resulting URL string. *REMEMBER NOT TO SHARE THIS URL.*
4. In `www/js`, open index.js, set `IFTTT_MAKER_ADDRESS` to the IFTTT trigger URL you copied, and save the file.
5. Using a terminal application, navigate to the project directory, and run `cordova build <PLATFORM>`.
6. Install the app on your device using the freshly built binary. These will be located in `platforms/<PLATFORM>/build`. :)

## Usage
Using WemoSleep is simple. All you have to do is set the timer and let it run. When the timer expires, your Wemo switch will turn off.

## Current Target Platforms
* iOS
* Android - **Currently untested on hardware devices**
* macOS
* Browser

## Upcoming Changes
* Correct an issue where the timer doesn't continue to run when the app is in the background (currently only occurring on iOS).
* Add graphical assets for the app's icon, splash screen, etc.
* Add functionality in-app to allow user to enter their IFTTT information to eliminate the need for the user to modify and build the app from project source.
