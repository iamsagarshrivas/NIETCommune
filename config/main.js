module.exports = {
    'secret' : 'somethingsecret',
    // 'database' : 'mongodb://localhost:27017/interview-panel-database',
    'database' : process.env.MONGODB_URI || 'mongodb://sagar:qwerty123 @ds137291.mlab.com:37291/heroku_bdlcjj7t'
};