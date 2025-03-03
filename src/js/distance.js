/**
 *
 * @param lat1
 * @param lon1
 * @param lat2
 * @param lon2
 *
 * @returns {number}
 */
module.exports = function (lat1,lon1,lat2,lon2) {
    var R    = 6371, // Radius of the earth in km
        dLat = deg2rad(lat2-lat1),  // deg2rad below
        dLon = deg2rad(lon2-lon1),
        a    =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ,
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
        d = R * c; // Distance in km

    return d;
};

function deg2rad(deg) {
    return deg * (Math.PI/180)
}