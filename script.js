// ==========================
// SONGS DATA
// ==========================

const songs = [
    {
        id: 1,
        name: "Song 1",
        artist: "Artist 1",
        img: "/music/song1.jpeg",
        genre: "pop",
        source: "/music/song1.mpeg"
    },
    {
        id: 2,
        name: "Song 2",
        artist: "Artist 2",
        img: "/music/song1.jpeg",
        genre: "rock",
        source: "/music/song2.mpeg"
    },
    {
        id: 3,
        name: "Song 3",
        artist: "Artist 3",
        img: "/music/song1.jpeg",
        genre: "hiphop",
        source: "/music/song3.mpeg"
    },
    {
        id: 4,
        name: "Song 4",
        artist: "Artist 4",
        img: "/music/song2.jpeg",
        genre: "classical",
        source: "/music/song4.mpeg"
    },
    {
        id: 5,
        name: "Song 5",
        artist: "Artist 5",
        img: "/music/song2.jpeg",
        genre: "pop",
        source: "/music/song5.mpeg"
    },
    {
        id: 6,
        name: "Song 6",
        artist: "Artist 6",
        img: "/music/song2.jpeg",
        genre: "rock",
        source: "/music/song6.mpeg"
    }
];


// ==========================
// DOM ELEMENTS
// ==========================

const songsList = document.getElementById("songsList");

const currentSongImage =
    document.getElementById("currentSongImage");

const currentSongName =
    document.getElementById("currentSongName");

const currentSongArtist =
    document.getElementById("currentSongArtist");

const playBtn =
    document.getElementById("playBtn");

const nextBtn =
    document.getElementById("nextBtn");

const prevBtn =
    document.getElementById("previousBtn");

const genreFilter =
    document.getElementById("genreFilter");

const playlistInput =
    document.getElementById("playlistInput");

const createPlaylistBtn =
    document.getElementById("createPlaylistBtn");

const playlistsContainer =
    document.getElementById("playlistsContainer");

const addToPlaylistBtn =
    document.getElementById("addToPlaylistBtn");

const playlistSearch =
    document.getElementById("playlistSearch");

const playlistSongsContainer =
    document.getElementById("playlistSongsContainer");

const themeToggle =
    document.getElementById("themeToggle");


// ==========================
// VARIABLES
// ==========================

const playlists = [];

let currentSong;

const audio = new Audio();


// ==========================
// LOAD SONG
// ==========================

function loadSong(song) {

    currentSong = song;

    currentSongName.textContent =
        song.name;

    currentSongImage.src =
        song.img;

    currentSongArtist.textContent =
        song.artist;

    audio.src =
        song.source;
}


// ==========================
// AUDIO ENDED
// ==========================

audio.addEventListener("ended", function () {

    playBtn.textContent = "▶";

});


// ==========================
// PLAY / PAUSE
// ==========================

playBtn.addEventListener("click", function () {

    if (!currentSong) {
        return;
    }

    if (audio.paused) {

        audio.play();

        playBtn.textContent = "⏸";

    } else {

        audio.pause();

        playBtn.textContent = "▶";

    }

});


// ==========================
// NEXT SONG
// ==========================

nextBtn.addEventListener("click", function () {

    if (!currentSong) {
        return;
    }

    const currentIndex =
        songs.indexOf(currentSong);

    const nextIndex =
        (currentIndex + 1) % songs.length;

    loadSong(songs[nextIndex]);

    audio.play();

    playBtn.textContent = "⏸";

});


// ==========================
// PREVIOUS SONG
// ==========================

prevBtn.addEventListener("click", function () {

    if (!currentSong) {
        return;
    }

    const currentIndex =
        songs.indexOf(currentSong);

    const prevIndex =
        (currentIndex - 1 + songs.length)
        % songs.length;

    loadSong(songs[prevIndex]);

    audio.play();

    playBtn.textContent = "⏸";

});


// ==========================
// GENRE FILTER
// ==========================

genreFilter.addEventListener("change", function () {

    const selectedGenre =
        genreFilter.value;

    if (selectedGenre === "all") {

        renderSongs(songs);

        return;
    }

    const filteredSongs =
        songs.filter(function (song) {

            return song.genre ===
                selectedGenre;

        });

    renderSongs(filteredSongs);

});


// ==========================
// CREATE PLAYLIST
// ==========================

createPlaylistBtn.addEventListener(
    "click",
    function () {

        const playlistName =
            playlistInput.value.trim();

        if (playlistName === "") {
            return;
        }


        // Prevent duplicate playlist names

        const playlistExists =
            playlists.some(function (playlist) {

                return playlist.name.toLowerCase()
                    === playlistName.toLowerCase();

            });


        if (playlistExists) {

            alert("Playlist already exists!");

            return;
        }


        const playlistObj = {

            name: playlistName,

            songs: []

        };


        playlists.push(playlistObj);

        playlistInput.value = "";

        renderPlaylists();

    }
);


// ==========================
// ADD SONG TO PLAYLIST
// ==========================

addToPlaylistBtn.addEventListener(
    "click",
    function () {

        if (!currentSong) {

            alert("Please select a song first.");

            return;
        }


        if (playlists.length === 0) {

            alert("Please create a playlist first.");

            return;
        }


        const playlistNames =
            playlists
                .map(function (playlist) {

                    return playlist.name;

                })
                .join("\n");


        const selectedPlaylistName =
            prompt(
                "Which playlist do you want to add the song to?\n\n"
                + playlistNames
            );


        if (!selectedPlaylistName) {
            return;
        }


        const selectedPlaylist =
            playlists.find(function (playlist) {

                return playlist.name.toLowerCase()
                    === selectedPlaylistName
                        .trim()
                        .toLowerCase();

            });


        if (!selectedPlaylist) {

            alert("Playlist not found!");

            return;
        }


        // Check duplicate song

        const songExists =
            selectedPlaylist.songs.some(
                function (song) {

                    return song.id ===
                        currentSong.id;

                }
            );


        if (songExists) {

            alert(
                "This song is already in the playlist!"
            );

            return;
        }


        selectedPlaylist.songs.push(
            currentSong
        );


        renderPlaylists();

        alert(
            currentSong.name +
            " added to " +
            selectedPlaylist.name
        );

    }
);


// ==========================
// RENDER PLAYLISTS
// ==========================

function renderPlaylists(
    playlistArray = playlists
) {

    playlistsContainer.innerHTML = "";


    if (playlistArray.length === 0) {

        playlistsContainer.textContent =
            "No playlists found.";

        return;
    }


    playlistArray.forEach(
        function (playlist) {

            const playlistDiv =
                document.createElement("div");

            playlistDiv.classList.add(
                "playlist"
            );


            const playlistH3 =
                document.createElement("h3");

            playlistH3.textContent =
                playlist.name;


            const playlistPara =
                document.createElement("p");

            playlistPara.textContent =
                playlist.songs.length +
                " songs";


            // Delete button

            const deleteBtn =
                document.createElement("button");

            deleteBtn.textContent =
                "Delete";


            deleteBtn.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    const playlistIndex =
                        playlists.indexOf(
                            playlist
                        );


                    playlists.splice(
                        playlistIndex,
                        1
                    );


                    playlistSongsContainer.innerHTML =
                        "";

                    renderPlaylists();

                }
            );


            playlistDiv.append(
                playlistH3,
                playlistPara,
                deleteBtn
            );


            // Click playlist to view songs

            playlistDiv.addEventListener(
                "click",
                function () {

                    renderPlaylistSongs(
                        playlist
                    );

                }
            );


            playlistsContainer.append(
                playlistDiv
            );

        }
    );

}


// ==========================
// VIEW PLAYLIST SONGS
// ==========================

function renderPlaylistSongs(playlist) {

    playlistSongsContainer.innerHTML = "";


    const heading =
        document.createElement("h2");

    heading.textContent =
        playlist.name;


    playlistSongsContainer.append(
        heading
    );


    if (playlist.songs.length === 0) {

        const emptyMessage =
            document.createElement("p");

        emptyMessage.textContent =
            "This playlist has no songs yet.";

        playlistSongsContainer.append(
            emptyMessage
        );

        return;
    }


    playlist.songs.forEach(
        function (song) {

            const songDiv =
                document.createElement("div");

            songDiv.classList.add(
                "playlist-song"
            );


            const songImage =
                document.createElement("img");

            songImage.src =
                song.img;


            const songDetails =
                document.createElement("div");


            const songName =
                document.createElement("p");

            songName.textContent =
                song.name;


            const artistName =
                document.createElement("p");

            artistName.textContent =
                song.artist;


            const removeBtn =
                document.createElement("button");

            removeBtn.textContent =
                "Remove";


            // Play song from playlist

            songDiv.addEventListener(
                "click",
                function () {

                    loadSong(song);

                    audio.play();

                    playBtn.textContent =
                        "⏸";

                }
            );


            // Remove song

            removeBtn.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    const songIndex =
                        playlist.songs.findIndex(
                            function (playlistSong) {

                                return playlistSong.id
                                    === song.id;

                            }
                        );


                    playlist.songs.splice(
                        songIndex,
                        1
                    );


                    renderPlaylists();

                    renderPlaylistSongs(
                        playlist
                    );

                }
            );


            songDetails.append(
                songName,
                artistName
            );


            songDiv.append(
                songImage,
                songDetails,
                removeBtn
            );


            playlistSongsContainer.append(
                songDiv
            );

        }
    );

}


// ==========================
// SEARCH PLAYLISTS
// ==========================

playlistSearch.addEventListener(
    "input",
    function () {

        const searchValue =
            playlistSearch.value
                .toLowerCase()
                .trim();


        const filteredPlaylists =
            playlists.filter(
                function (playlist) {

                    return playlist.name
                        .toLowerCase()
                        .includes(
                            searchValue
                        );

                }
            );


        renderPlaylists(
            filteredPlaylists
        );

    }
);


// ==========================
// RENDER SONGS
// ==========================

function renderSongs(songArray) {

    songsList.innerHTML = "";


    songArray.forEach(
        function (song) {

            const songDiv =
                document.createElement("div");

            songDiv.classList.add(
                "song"
            );


            // Select song

            songDiv.addEventListener(
                "click",
                function () {

                    loadSong(song);

                }
            );


            const songLeft =
                document.createElement("div");

            songLeft.classList.add(
                "song-left"
            );


            const songImg =
                document.createElement("img");

            songImg.src =
                song.img;


            const songDetails =
                document.createElement("div");

            songDetails.classList.add(
                "song-details"
            );


            const songName =
                document.createElement("p");

            songName.classList.add(
                "song-name"
            );

            songName.textContent =
                song.name;


            const songArtist =
                document.createElement("p");

            songArtist.classList.add(
                "artist-name"
            );

            songArtist.textContent =
                song.artist;


            songDetails.append(
                songName,
                songArtist
            );


            songLeft.append(
                songImg,
                songDetails
            );


            const genre =
                document.createElement("p");

            genre.classList.add(
                "genre"
            );

            genre.textContent =
                song.genre;


            songDiv.append(
                songLeft,
                genre
            );


            songsList.append(
                songDiv
            );

        }
    );

}


// ==========================
// THEME TOGGLE
// ==========================

themeToggle.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "light-theme"
        );


        if (
            document.body.classList.contains(
                "light-theme"
            )
        ) {

            themeToggle.textContent =
                "🌙";

        } else {

            themeToggle.textContent =
                "☀️";

        }

    }
);


// ==========================
// INITIAL RENDER
// ==========================

renderSongs(songs);

renderPlaylists();