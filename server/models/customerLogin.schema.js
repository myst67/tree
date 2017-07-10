var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;   // these values can be whatever you want - we're defaulting to a   
var MAX_LOGIN_ATTEMPTS = 5;   // max of 5 attempts, resulting in a 2 hour lock
var LOCK_TIME = 2 * 60 * 60 * 1000;

var customerSchema = new Schema({
    firstname: { type: String, required: true, index: { unique: false } },
    lastname: { type: String, required: true, index: { unique: false } },
    email: { type: String, required: true, index: { unique: true } },
    dob: { type: String, required: true, index: { unique: false } },
    location: { type: String, required: true, index: { unique: false } },
    phone: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    craete_date: { type: String, required: true }
    /* ,
    loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: { type: Number }
    */
});

/* customerSchema.virtual('isLocked').get(function() {
    // check for a future lockUntil timestamp
    return !!(this.lockUntil && this.lockUntil > Date.now());
});
*/

customerSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // set the hashed password back on our user document
            user.password = hash;
            this.password = hash;
            next();
        });
    });
});

customerSchema.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

/* customerSchema.methods.incLoginAttempts = function(cb) {
    // if we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.update({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 }
        }, cb);
    }
    // otherwise we're incrementing
    var updates = { $inc: { loginAttempts: 1 } };
    // lock the account if we've reached max attempts and it's not locked already
    if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
        updates.$set = { lockUntil: Date.now() + LOCK_TIME };
    }
    return this.update(updates, cb);
};
*/

// expose enum on the model, and provide an internal convenience reference 
var reasons = customerSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1
    /*,
    MAX_ATTEMPTS: 2
    */
};

customerSchema.statics.getAuthenticated = function(email, password, cb) {
    this.findOne({ email: email }, function(err, user) {
        if (err) return cb(err);

        console.log('get user details in authenticated function====');
        console.log(user);

        // bcrypt.compare(user.password, this.password, function(err, isMatch) 
        // {
        //     if (err){
        //         console.log('error=====');
        //         console.log(err);
        //     }
        //     console.log('success');
        // });

        return;

        // make sure the user exists
        if (!user) {
            return cb(null, null, reasons.NOT_FOUND);
        }

        // check if the account is currently locked
        /* if (user.isLocked) {
            // just increment login attempts if account is already locked
            return user.incLoginAttempts(function(err) {
                if (err) return cb(err);
                return cb(null, null, reasons.MAX_ATTEMPTS);
            });
        }
        */

        // test for a matching password
        user.comparePassword(password, function(err, isMatch) {
            if (err) return cb(err);

            // check if the password was a match
            if (isMatch) {
                // if there's no lock or failed attempts, just return the user
                if (!user.loginAttempts && !user.lockUntil) return cb(null, user);
                // reset attempts and lock info
                var updates = {
                    $set: { loginAttempts: 0 },
                    $unset: { lockUntil: 1 }
                };
                return user.update(updates, function(err) {
                    if (err) return cb(err);
                    return cb(null, user);
                });
            }

            // password is incorrect, so increment login attempts before responding
            /* user.incLoginAttempts(function(err) {
                if (err) return cb(err);
                return cb(null, null, reasons.PASSWORD_INCORRECT);
            }); */
        });
    });
};

module.exports = mongoose.model('customer', customerSchema);

// module.exports = mongoose.model('jobdetails', jobdetailsSchema);
