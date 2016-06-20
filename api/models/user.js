var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  passwordHash: String,
  city: String,
  country: String,
  profile_photo: String,
  gigs: {},
  // attending_gigs: {},
  // follower_ids: [{type: Schema.Types.ObjectId, ref: 'Follower'}]

});

// var userSchema = mongoose.Schema({
//   firstName: { type: String, unique: true, required: true },
//   lastName: { type: String, unique: true, required: true },
//   email:    { type: String, unique: true, required: true },
//   passwordHash: { type: String, required: true },
//   city: String,
//   country: String,
//   profile_photo: String,
//   // owned_gigs: {},
//   // attending_gigs: {},
//   // follower_ids: [{type: Schema.Types.ObjectId, ref: 'Follower'}]

// });

userSchema.set('toJSON', {
  transform: function(document, json) {
    delete json.passwordHash;
    delete json.__v;
    return json;
  }
});

userSchema.virtual('password')
.set(function(password) {
    this._password = password;
    console.log("YOU WANT TO CHECK PASS" + this._passwordConfirmation);
    this.passwordHash = bcrypt.hashSync(this._password, bcrypt.genSaltSync(8));
    console.log("IS THIS OKAY????" + this.passwordHash);
  });

userSchema.virtual('passwordConfirmation')
  .set(function(passwordConfirmation) {
    console.log("YOU WANT TO CHECK" + this._passwordConfirmation)
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.path('passwordHash')
  .validate(function(passwordHash) {
    if(!this._password) {
      return this.invalidate('password', 'A password is required');
    }
    if(this._password !== this._passwordConfirmation) {
      return this.invalidate('passwordConfirmation', 'Passwords do not match');
    }
  });

// hook to hash password before save
userSchema.pre('save' , function(next){

    if(!this.isModified('password') ) return next();
    
    if(this.passwordConfirmation && this.passwordConfirmation != this.password) {
        var err = new Error('Password and confirmation do not match');
        return next(err);
    }

    this.passwordHash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
  
    next();

});


userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

module.exports = mongoose.model("User", userSchema);
