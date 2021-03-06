var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  passwordHash: String,
  city: String,
  country: String,
  // PROFILE PHOTO USING AN UNDERSCORE
  profile_photo: String,
  attending_gigs: [{type: mongoose.Schema.ObjectId, ref: 'Gig'}],
  owned_gigs: [{type: mongoose.Schema.ObjectId, ref: 'Gig'}]

  // followers: [{
  //     type: mongoose.Schema.Types.ObjectId, ref: 'User'
  //   }],
  //   redeem_token: {type: String, unique: true},
  // following: [{
  //     type: mongoose.Schema.Types.ObjectId, ref: 'User'
  //   }],
  //   redeem_token: {type: String, unique: true}  

});

userSchema.set('toJSON', {
  transform: function(document, json) {
    delete json.passwordHash;
    delete json.__v;
    return json;
  }
});

userSchema.virtual('password')
.set(function(password) {

  console.log(password, "*****************************")
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
