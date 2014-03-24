// The client ID is obtained from the {{ Google Cloud Console }}
// at {{ https://cloud.google.com/console }}.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
var OAUTH2_CLIENT_ID = '157761386106.apps.googleusercontent.com';
var API_KEY = 'AIzaSyA_32yjaPOmjs_8x0trtPH5vKT41pivkrw';
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube'
];

function loadApiClient(){
    gapi.client.setApiKey(API_KEY);
    loadAPIClientInterfaces();
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// http://code.google.com/p/google-api-javascript-client/wiki/GettingStarted#Loading_the_Client
function loadAPIClientInterfaces() {
  gapi.client.load('youtube', 'v3', function() {
    console.log("youtube API loaded");
  });
}
