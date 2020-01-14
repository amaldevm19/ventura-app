const mongoose = require('mongoose');

exports.db = mongoose.connect('mongodb+srv://amaldevm19:KMahadevAn@cluster0-kir0r.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true},(err)=>{
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});


