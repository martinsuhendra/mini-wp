const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltround = 10;
const salt = bcrypt.genSaltSync(saltround)



const userSchema = new Schema({
    email : {
        type: String,
        required : [true, 'please input the correct email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type : String,
        required : [true, 'please input the correct password']
    }
})

userSchema.pre('save', function(next){
    let hash = bcrypt.hashSync(this.password, salt);
    this.password = hash
    next()
})

userSchema.path('email').validate(function (value, respond) {
    return mongoose
      .model('User')
      .collection
      .countDocuments({ email: value })
      .then(function (count) {
        if (count > 0) {
          return false
        }
      })
      .catch(function (err) {
        throw err
      })
  }, 'Email already exists!!')

const User = mongoose.model('User', userSchema)

module.exports = User