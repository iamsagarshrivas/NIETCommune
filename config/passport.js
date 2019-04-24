var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var user = require('../models/user');
var config =require('./main');

module.exports = (passport)=>{
    var opts={};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts,(jwt_payloads,done)=>{
        user.findOne({_id:jwt_payloads._id},(err,user)=>{
            if(err) return done(err,false);
            if(user) return done(null,user);
            else return done(null,false);
        })
    }));
}

