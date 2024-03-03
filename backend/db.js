//First we import the mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL); // here we connect to our datbase

const urlSchema = mongoose.Schema({
    mainUrl : String,
    shortUrl : String
});
const url = mongoose.model('url',urlSchema);

module.exports = {
    url
}