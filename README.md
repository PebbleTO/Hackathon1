Pebble.js
=========

Pebble.js lets you write beautiful Pebble applications completely in JavaScript.

Pebble.js applications run on your phone. They have access to all the resources of your phone (internet connectivity, GPS, almost unlimited memory, etc). Because they are written in JavaScript they are also perfect to make HTTP requests and connect your Pebble to the internet.

**Warning:** Pebble.js is still in beta, so breaking API changes are possible. Pebble.js is best suited for prototyping and applications that inherently require communication in response to user actions, such as accessing the internet. Please be aware that as a result of Bluetooth round-trips for all actions, Pebble.js apps will use more power and respond slower to user interaction than a similar native app.

> ![JSConf 2014](http://2014.jsconf.us/img/logo.png)
>
> Pebble.js was announced during JSConf 2014!

## BikeShare locator

This app was created during the First Pebble-Toronto Hackathon.

The app shows the ***bikeshare*** spots ordered by distance.

To build the app, change appinfo.json based on your needs and run:

```shell
make
```
