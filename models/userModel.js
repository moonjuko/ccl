const db = require("../services/database").config;

let getUsers = () => new Promise((resolve, reject) => {
    db.query("SELECT * from users", (err, users, fields) => {
        if(err) {
            reject(err);
        } else {
            resolve(users);
        }
    });
});

let getAdmins = () => new Promise((resolve, reject) => {
    db.query("SELECT * from isAdmin", (err, admins, fields) => {
        if(err) {
            reject(err);
        } else {
            resolve(admins);
        }
    });
});

let getUser = (id) => new Promise((resolve, reject) => {
    db.query("SELECT * from users WHERE id=?", [id], (err, user, fields) => {
        if(err) {
            reject(err);
        } else {
            resolve(user[0]);
        }
    });
});

let deleteUser = (id) => new Promise((resolve, reject) => {
    db.query("DELETE FROM users WHERE id = ?", [id], (err, user, fields) => {
        if(err) {
            reject(err);
        } else {
            resolve(id)
        }
    })
})

let updateUser = (userData) => new Promise((resolve, reject) => {
    let sql = "UPDATE users SET" +
        " name=" + db.escape(userData.name) +
        ", code=" + db.escape(userData.code) +
        ", password=" + db.escape(userData.password) +
        ", species=" + db.escape(userData.species) +
        ",  origin=" + db.escape(userData.origin) +
        " WHERE id=" + parseInt(userData.id);

    db.query(sql, function(err, user, fields) {
        if(err) reject(err);
        resolve(userData);
    });
});

let insertUser = (userData) => new Promise((resolve, reject) => {
    console.log(userData);
    let sql = "INSERT into users(name,code,password,species,origin) values (" +
        "" + db.escape(userData.name) +
        "," + db.escape(userData.code) +
        "," + db.escape(userData.password) +
        "," + db.escape(userData.species) +
        "," + db.escape(userData.origin) +
        ")"

    db.query(sql, function(err, user, fields) {
        if(err)
        {console.log(err); reject(err)}
        resolve(userData);
    });
});

module.exports = {
    getUsers,
    getUser,
    updateUser,
    getAdmins,
    deleteUser,
    insertUser
}