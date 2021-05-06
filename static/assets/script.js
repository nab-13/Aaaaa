//var s = new Spotify(); // Initiases spotify class
var spotifyApi = new SpotifyWebApi(); // Init spotify api class
var myData = {};

if (window.location.href.includes('#')) {
    console.log('Improper query data, redirecting')
    window.location = window.location.href.replace('#','?');
}
// check if there's a spotify code

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('access_token');

var login = async function(token,callback) {
    try {
        spotifyApi.setAccessToken(String(code));
        console.log("Attempting to retrieve user information...");
        var me = await spotifyApi.getMe();
        console.info(me);
        console.log('Logged in!');
        callback(me);
    } catch (e) {
        console.error('Failed to login');
        console.error(e);
        callback(false);
    }
}

if (code) {
    console.log('User signed in and gave us code: '+String(code))
    console.info('Logging into Spotify...')
    login(code,callback=>{
        if (login) {
            console.log(`Signed in as ${callback.display_name} using email ${callback.email}`)
            myData = callback;
            document.getElementById('user').text = myData.display_name
        }
    })
}
else {
    console.log('User is not signed in.')
}



/*
get songs - user picks how many songs
randomise
put into playlist
*/

// Get a users top songs

// Randomise the songs

// Create a playlist

// Insert the songs into the playlist

