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
        ", name=" + db.escape(destinationData.name) +
        ", context=" + db.escape(destinationData.context) +
        ", humanPop=" + db.escape(destinationData.humanPop) +
        ", alienPop=" + db.escape(destinationData.alienPop) +
        ", map=" + db.escape(destinationData.map) +
        " WHERE id=" + parseInt(destinationData.id);

    db.query(sql, function(err, flower, fields) {
        if(err) reject(err);
        resolve(destinationData);
    });
});

module.exports = {
    getDestinations,
    getDestination,
    updateDestination
}