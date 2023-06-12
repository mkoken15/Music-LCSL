import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(...);
app.use(ElementPlus);

// ID de la chaîne YouTube
var channelId = "UC-m06mxfFvWCMs29uc1EN7Q";

// Options du lecteur YouTube
var playerOptions = {
  height: '360',
  width: '640',
  playerVars: {
    'rel': 0,
    'showinfo': 0,
    'autoplay': 0
  }
};

// Variables pour la pagination
var videosPerPage = 11;
var currentPage = 0;
var totalVideos = 0;
var totalPages = 0;
var videos = [];

// Récupération des vidéos de la playlist
function fetchPlaylistVideos() {
  var playlistId = 'PL4qgSvqO3653dy0X2H2OaG0WltnFz2-Wr';
  var apiKey = 'AIzaSyB4iw3Aedi36pGzj20f0e_2VhslficMZQA';

  var apiUrl = 'https://www.googleapis.com/youtube/v3/playlistItems';
  apiUrl += '?part=snippet&maxResults=50&playlistId=' + playlistId + '&key=' + apiKey;

  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      videos = data.items;
      totalVideos = videos.length;
      totalPages = Math.ceil(totalVideos / videosPerPage);
      displayVideos(currentPage);
    })
    .catch(function(error) {
      console.log('Une erreur s\'est produite lors de la récupération des vidéos :', error);
    });
}

// Affichage des vidéos dans le conteneur
function displayVideos(page) {
  var startIndex = page * videosPerPage;
  var endIndex = startIndex + videosPerPage;

  var youtubeContainer = document.getElementById("youtube-container");
  youtubeContainer.innerHTML = "";

  for (var i = startIndex; i < endIndex; i++) {
    if (i >= totalVideos) {
      break;
    }

    var video = videos[i];
    var videoId = video.snippet.resourceId.videoId;
    var videoTitle = video.snippet.title;

    var videoElement = document.createElement('div');
    videoElement.classList.add('video-wrapper');
    videoElement.innerHTML = '<h2>' + videoTitle + '</h2>';
    videoElement.innerHTML += '<iframe width="' + playerOptions.width + '" height="' + playerOptions.height + '" src="https://www.youtube.com/embed/' + videoId + '?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';

    youtubeContainer.appendChild(videoElement);
  }

  updatePaginationButtons();
}

// Mise à jour des boutons de pagination
function updatePaginationButtons() {
  var prevButton = document.querySelector('.pagination .prev');
  var nextButton = document.querySelector('.pagination .next');

  prevButton.disabled = (currentPage === 0);
  nextButton.disabled = (currentPage === totalPages - 1);
}

// Page précédente
function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    displayVideos(currentPage);
  }
}

// Page suivante
function nextPage() {
  if (currentPage < totalPages - 1) {
    currentPage++;
    displayVideos(currentPage);
  }
}

// Toggle du menu hamburger
function toggleMenu() {
  var playlistContainer = document.querySelector('.playlist-container');
  playlistContainer.classList.toggle('show');

  var menuLabel = document.getElementById('menu-label');
  if (menuLabel.innerHTML === 'Music LCSL') {
    menuLabel.innerHTML = 'Accueil';
    menuLabel.onclick = function() {
      window.location.href = 'file:///C:/Users/meric/Downloads/nouveau%201.html';
    };
  } else {
    menuLabel.innerHTML = 'Music LCSL';
    menuLabel.onclick = function() {
      toggleMenu();
    };
  }
}

// Chargement de l'API YouTube et récupération des vidéos
function onYouTubeIframeAPIReady() {
  fetchPlaylistVideos();
}
