const mongoose = require("mongoose");

function dbconnection() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Database Connected Successfully");
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = dbconnection;