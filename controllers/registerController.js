const userDB = {
  users: require("../model/users.json"),
  setUser: function(data) { this.users = data}
}
const path = require("path");
const fsPromises = require("fs").promises;