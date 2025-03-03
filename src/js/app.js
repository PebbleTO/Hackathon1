var UI          = require('ui'),
    ajax        = require('ajax'),
    menu        = [],
    loader      = new UI.Window({}),
    loadingText = new UI.Text({text: 'loading'}),
    Vector2     = require('vector2'),
    distance    = require('./distance');

var itemList = [],
    itemIndex = 0;

var locationOptions = {
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
};

loader.add(loadingText);
loader.show();


navigator.geolocation.getCurrentPosition(function (pos) {
    getJSON(pos);
}, function (err) {
    console.log(err, ' =/');
}, locationOptions);

navigator.geolocation.watchPosition(function (pos) {
    if (itemList[itemIndex] === undefined) {
        return;
    }

    itemList[itemIndex].distance = distance(pos.coords.latitude, pos.coords.longitude, itemList[itemIndex].obj.latitude, itemList[itemIndex].obj.longitude);
});


function getJSON(currentLocation) {
    ajax(
        {
            url: 'https://tor.publicbikesystem.net/ube/stations',
            type: 'json'
        },
        function (data) {

            data.stationBeanList.forEach(function (obj) {
                obj.distance = distance(currentLocation.coords.latitude, currentLocation.coords.longitude, obj.latitude, obj.longitude);
            });

            data.stationBeanList.sort(function (first, second) {
                return second.distance - first.distance;
            });

            data.stationBeanList.forEach(function (obj, index) {
                if (index > 6) {
                    return;
                }

                console.log('DD:', obj.distance);
                itemList.unshift({
                    'backgroundColor': 'black',
                    'title': obj.stationName,
                    'subtitle': " " + obj.distance.toPrecision(2) + " km",
                    'data': obj
                })
            });

            mainscreen = new UI.Menu({
                backgroundColor: 'cyan',
                textColor: 'black',
                highlightBackgroundColor: 'red',
                highlightTextColor: 'white'
            });

            mainscreen.sections([{
                backgroundColor: 'cyan',
                title: 'BikeShare',
                items: itemList
            }]);

            mainscreen.on('hide', function () {
                isInDetails = false;
            });

            mainscreen.on('select', function (event) {
                var bikeStop = event.item;
                var card = new UI.Window({
                    title: bikeStop.title,
                    backgroundColor: 'cyan',
                    fullscreen: true
                });

                itemIndex = event.itemIndex;

                var windowSize = new Vector2(144, 168);

                var paddingX = windowSize.x - 12;

                var docks = new UI.Text({
                    text: 'Docks: ' + bikeStop.data.availableDocks, position: new Vector2(6, 140),
                    size: new Vector2(paddingX, 20),
                    font: 'gothic-18-bold',
                    color: 'black'
                });
                var bikes = new UI.Text({
                    text: 'Bikes: ' + bikeStop.data.availableBikes, position: new Vector2(6, 120),
                    size: new Vector2(paddingX, 20),
                    font: 'gothic-18-bold',
                    color: 'black'
                });
                var subtitle = new UI.Text({
                    text: 'Distance: ' + bikeStop.subtitle, position: new Vector2(6, 100),
                    size: new Vector2(paddingX, 20),
                    font: 'gothic-18-bold',
                    color: 'black'
                });
                var title = new UI.Text({
                    text: bikeStop.title, position: new Vector2(6, 5),
                    size: new Vector2(paddingX, 30),
                    font: 'gothic-24-bold',
                    color: 'black'
                });

                card.add(title);
                card.add(subtitle);
                card.add(bikes);
                card.add(docks);

                card.show();
            });

            mainscreen.show();
        }
    );
}
