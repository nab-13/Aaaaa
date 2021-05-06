const   options = {
    clientid: "a1153f70681947b6903d467a4bd95dd2",
    clientsecret: "a4b2cd36c78e4fc090e11ea217e3122c",
    redirect_uri: "http://localhost:3000"
};
// Load your web app
const express = require('express');
const app = express();
const path = require('path');

// Import spotify api.js
const Spotify = require('spotify-api.js');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './static/index.html'));
});
app.use('/assets',express.static('static/assets'))

// Login site
app.get('/login', (req, res) => {
    res.redirect("https://accounts.spotify.com/en/authorize?" +
        "client_id=" +
        options.clientid +
       // "&amp;" +
        "&redirect_uri=" +
        //encodeURIComponent(options.redirect_uri) +
        options.redirect_uri +
       // "&amp;" +
        "&response_type=token" +
       // "&amp;" +
        "&scope=" +
        encodeURIComponent(`user-read-recently-played playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative user-library-read user-read-email user-read-private`)
    );
});

app.get('/callback', async (req, res) => {

    const user = await Spotify.createUser({
        clientId: options.clientid, // Your spotify app client id
        client_secret: options.clientsecret, //our spotify app client secret
        redirect_uri: options.redirect_uri, //redirect, it is a verification method so keep the same redirect uri
        code: req.query.code // Code sent by the api
    }); // Short hand method

    res.send({
        name: user.name,
        id: user.id
    }); // Returns the user information!
    // If you have the required scopes you can also access the user's player, etc!
});

app.listen(3000);