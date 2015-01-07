var mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
  profileName: String
});

mongoose.model('Profile', profileSchema);
