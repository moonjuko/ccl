const db = require("../services/database").config;

let getDestinations = () => new Promise((resolve, reject) => {
    db.query("SELECT * from destinations", (err, destinations, fields) => {
        if(err) {
            reject(err);
        } else {
            resolve(destinations);
        }
    });
});

let getDestination = (id) => new Promise((resolve, reject) => {
    db.query("SELECT * from destinations WHERE id=?", [id], (err, destination, fields) => {
        if(err) {
            reject(err);
        } else {
            resolve(destination[0]);
        }
    });
});

let updateDestination = (destinationData) => new Promise((resolve, reject) => {
    let sql = "UPDATE destinations SET" +
        " image=" + db.escape(destinationData.image) +
        " ,planet=" + db.escape(destinationData.planet) +
        ", name=" + db.escape(destinationData.name) +
        ", context=" + db.escape(destinationData.context) +
        ", humanPop=" + db.escape(destinationData.humanPop) +
        ", alienPop=" + db.escape(destinationData.alienPop) +
        ", mapa=" + db.escape(destinationData.mapa) +
        ", image1=" + db.escape(destinationData.image1) +
        ", image2=" + db.escape(destinationData.image2) +
        ", image3=" + db.escape(destinationData.image3) +
        ", image4=" + db.escape(destinationData.image4) +
        ", image5=" + db.escape(destinationData.image5) +
        " WHERE id=" + parseInt(destinationData.id);

    db.query(sql, function(err, destination, fields) {
        if(err) reject(err);
        resolve(destinationData);
    });
});

module.exports = {
    getDestinations,
    getDestination,
    updateDestination
}