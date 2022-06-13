const db = require("../services/database").config;
const bcrypt = require("bcrypt");

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
        " username=" + db.escape(userData.username) +
        ", email=" + db.escape(userData.email) +
        ", password=" + db.escape(userData.password) +
        ", image=" + db.escape(userData.image) +
        " WHERE id=" + parseInt(userData.id);

    db.query(sql, function(err, user, fields) {
        if(err) reject(err);
        resolve(userData);
    });
});

let insertUser = (userData) => new Promise(async (resolve, reject) => {
    console.log(userData);

    let salt = Math.ceil(Math.random()*1024);
    let encryptedPassword = await bcrypt.hash(userData.password, salt)

    let sql = "INSERT into users(username, email, password, image, salt) values (" +
        "" + db.escape(userData.username) +
        "," + db.escape(userData.email) +
        "," + db.escape(encryptedPassword) +
        "," + db.escape(userData.image)+
        "," + db.escape(salt) +
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
    insertUser,
}