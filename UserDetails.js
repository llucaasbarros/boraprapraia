const mongoose = require('mongoose');

const UserDetailSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String }
});

const User = mongoose.model("UserInfo", UserDetailSchema);

module.exports = User;
