const image = document.querySelector('img');
const title = document.querySelector('title');
const artist = document.querySelector('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationE1 = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'M',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'h',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design',
    },
    {
        name: 's',
        displayName: 'Front Row (Remix)',
        artist: 'Metric Jacinto Design',
    },
    
]; 
//Check if playing
let isPlaying = false;

//Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//play or pause Event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
  }


function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
  }
  
  // On Load - Select First Song
  loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e){
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        console.log(duration, currentTime);
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
//  Calculate display for duration
        const durationMinutes = duration / 60;
        console.log('minutes', durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        
    //   Delay switching duration Element to avoid NaN
        if (durationSeconds) {      
        durationE1.textContent = `${durationMinutes}:${durationSeconds}`;
        }
    //  Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    console.log('minutes', currentMinutes);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    } 
        
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    } 
}

// Set ProgressBar(e) 
function setProgressBar(e) {
    console.log(e);
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);