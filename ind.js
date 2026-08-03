 const welcomeWindow = document.getElementById('welcomeWindow');
      const dragHandle = document.getElementById('windowDragHandle');
      const terminalCard = document.getElementById("terminalCard");
      const terminalWindow = document.getElementById("terminalWindow");
      const terminalClose = document.getElementById("terminalClose");
      const terminalBody = document.getElementById("terminalBody");
      const terminalInput = document.getElementById("terminalInput");
      const terminalOutput = document.querySelector(".terminal-output");
      const terminalDragHandle = document.getElementById("terminalDragHandle");
      const closeButton = document.getElementById('windowCloseButton');
      const brandToggle = document.getElementById('brandToggle');
      const personalCard = document.getElementById('personalCard');
      const pixelCard = document.getElementById("pixelCard");
      const pixelWindow = document.getElementById("pixelWindow");
      const pixelClose = document.getElementById("pixelClose");
      const pixelDragHandle = document.getElementById("pixelDragHandle");
      let isDragging = false;
      let dragTarget = null;
      let offsetX = 0;
      let offsetY = 0;

      personalCard.addEventListener('click', () => {
        openWindow();
      });

      const openWindow = () => {
        welcomeWindow.hidden = false;
        welcomeWindow.style.display = 'grid';
      };

      const closeWindow = () => {
        welcomeWindow.hidden = true;
        welcomeWindow.style.display = 'none';
      };

      function startDrag(windowElement, event) {
       isDragging = true;
       dragTarget = windowElement;

      const rect = windowElement.getBoundingClientRect();

       offsetX = event.clientX - rect.left;
       offsetY = event.clientY - rect.top;

       windowElement.style.left = rect.left + "px";
       windowElement.style.top = rect.top + "px";
       windowElement.style.transform = "none";
      }


      dragHandle.addEventListener("pointerdown", (event) => {
        startDrag(welcomeWindow, event);
      });

      terminalDragHandle.addEventListener("pointerdown", (event) => {
       startDrag(terminalWindow, event);
      });

      closeButton.addEventListener('click', (event) => {
        event.stopPropagation();
        closeWindow();
      });

      brandToggle.addEventListener('click', () => {
        if (welcomeWindow.hidden) {
          openWindow();
        } else {
          closeWindow();
        }
      });

      document.addEventListener('pointermove', (event) => {
        if (!isDragging || !dragTarget) return;
        dragTarget.style.left = `${event.clientX - offsetX}px`;
        dragTarget.style.top = `${event.clientY - offsetY}px`;
      });

      document.addEventListener('pointerup', () => {
        isDragging = false;
        dragTarget = null;
      });

      const clockElement = document.getElementById('topbarClock');
      function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
      }
      updateClock();
      setInterval(updateClock, 1000);

      terminalClose.addEventListener("pointerdown", (e) => {
         e.stopPropagation();
      });

      const fortunes = [
        "🍒 Stay curious.",
        "🍒 Small progress is still progress.",
        "🍒 Every bug teaches something.",
        "🍒 Create before you consume.",
        "🍒 Keep building."
      ];

      terminalCard.addEventListener("click", () => {
        terminalWindow.style.display = "flex";
        terminalInput.focus();
        });

      terminalClose.addEventListener("click", () => {
        terminalWindow.style.display = "none";
      });

      function print(text = "") {
        terminalOutput.innerHTML += "<br>" + text;
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }

      function showHelp(){
        print(`
          Available Commands

          help      Show commands
          clear     Clear terminal
          date      Current date
          time      Current time
          fortune   Random quote
          about     About Cherry Terminal
        `);
      }

     terminalInput.addEventListener("keydown", function (e) {

    if (e.key !== "Enter") return;

    const command = terminalInput.value.trim();

    if (command === "") return;

    print(`<span class="pink">guest@cherry:~$</span> ${command}`);

    terminalInput.value = "";

    if (command === "help") {
        showHelp();
    }

    else if (command === "clear") {
        terminalOutput.innerHTML = "";
    }

    else if (command === "date") {
        print(new Date().toLocaleDateString());
    }

    else if (command === "time") {
        print(new Date().toLocaleTimeString());
    }

    else if (command === "about") {
        print(`
        Cherry Terminal v1.0

        A lightweight interactive shell
        built for CherryOS.
        `);
    }

    else if (command === "fortune") {
        const random = fortunes[Math.floor(Math.random() * fortunes.length)];
        print(random);
    }

    
        

    else {
        print(`Command not found: ${command}`);
        print(`Type "help" to see available commands.`);
    }

    });

    pixelCard.addEventListener("click", () => {
      pixelWindow.style.display = "flex";
    });

    pixelClose.addEventListener("click", () => {
      pixelWindow.style.display = "none";
    });

    pixelDragHandle.addEventListener("pointerdown", (event) => {
      startDrag(pixelWindow, event);
    });

    pixelClose.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
    });

    const pixelCanvas = document.getElementById("pixelCanvas");
    const colorPicker = document.getElementById("colorPicker");
    const clearButton = document.getElementById("clearButton");
    const eraserButton = document.getElementById("eraserButton");
    const saveButton = document.getElementById("saveButton");
    const savedProjects = document.getElementById("savedProjects");
    const saveModal = document.getElementById("saveModal");
    const drawingName = document.getElementById("drawingName");
    const confirmSave = document.getElementById("confirmSave");
    const cancelSave = document.getElementById("cancelSave");

    let currentColor = "#ff8db6";
    let eraserMode = false;

    // Create 16x16 grid
    for (let i = 0; i < 100; i++) {
      const pixel = document.createElement("div");
      pixel.classList.add("pixel");

      pixel.addEventListener("click", () => {
        pixel.style.backgroundColor = eraserMode
        ? "#ffffff"
        : currentColor;
      });

      pixelCanvas.appendChild(pixel);
    }

    colorPicker.addEventListener("input", () => {
      currentColor = colorPicker.value;
      eraserMode = false;
    });

    eraserButton.addEventListener("click", () => {
      eraserMode = true;
    });

    clearButton.addEventListener("click", () => {
      document.querySelectorAll(".pixel").forEach(pixel => {
        pixel.style.backgroundColor = "#ffffff";
      });
    });

    saveButton.addEventListener("click", () => {
      drawingName.value = "";
      saveModal.style.display = "flex";
      drawingName.focus();
    });

    confirmSave.addEventListener("click", () => {
      const projectName = drawingName.value.trim();
      if (projectName === "") return;
      const drawing = [];
      document.querySelectorAll(".pixel").forEach(pixel => {
        drawing.push(pixel.style.backgroundColor || "#ffffff");
      });
      localStorage.setItem(projectName, JSON.stringify(drawing));
      let option = document.querySelector(
        `#savedProjects option[value="${projectName}"]`
      );

      if(!option) {
        option = document.createElement("option");
        option.value = projectName;
        option.textContent = projectName;
        savedProjects.appendChild(option);
      }

      savedProjects.value = projectName;
      saveModal.style.display = "none";
    });

    cancelSave.addEventListener("click", () => {
      saveModal.style.display = "none";
    });

    saveModal.addEventListener("click", (e) => {
      if (e.target === saveModal) {
        saveModal.style.display = "none";
      }
    });

    savedProjects.addEventListener("change", () => {
      const data = localStorage.getItem(savedProjects.value);
      if(!data) return;
      const colors = JSON.parse(data);
      document.querySelectorAll(".pixel").forEach((pixel, index) => {
        pixel.style.backgroundColor = colors[index];
      });
    });

    for(let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const option = document.createElement("option");
      option.value = key;
      option.textContent = key;
      savedProjects.appendChild(option);
    }

    const musicCard = document.getElementById("musicCard");
    const musicWindow = document.getElementById("musicWindow");
    const musicClose = document.getElementById("musicClose");
    const musicDragHandle = document.getElementById("musicDragHandle");

    musicCard.addEventListener("click", () => {
      musicWindow.style.display = "flex";
    });

    musicClose.addEventListener("click", () => {
      musicWindow.style.display = "none";
    });

    musicDragHandle.addEventListener("pointerdown", (event) => {
      startDrag(musicWindow, event);
    });

    musicClose.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
    });

    const songs = [
      {
        title: "Beautiful Dream",
        artist: "Diego Nava",
        file: "beautiful-dream.mp3",
        cover: "cover/beautiful.jpg",
      },
      {
        title: "Discover",
        artist: "Eugenio Mininni",
        file: "discover.mp3",
        cover: "cover/discover.jpg",
      },

      {
        title: "Complicated",
        artist: "Arulo",
        file: "complicated.mp3",
        cover: "cover/complicated.jpg"
      }
    ];

    const audioPlayer = document.getElementById("audioPlayer");
    const albumArt = document.getElementById("albumArt");
    const songTitle = document.getElementById("songTitle");
    const artistName = document.getElementById("artistName");

    const playPause = document.getElementById("playPause");
    const prevSong = document.getElementById("prevSong");
    const nextSong = document.getElementById("nextSong");

    const progressBar = document.getElementById("progressBar");
    const currentTime = document.getElementById("currentTime");
    const duration = document.getElementById("duration");

    let currentSong = 0;

    function loadSong(index){
      audioPlayer.src = songs[index].file;
      albumArt.src = songs[index].cover;
      songTitle.textContent = songs[index].title;
      artistName.textContent = songs[index].artist;
    }

    loadSong(currentSong);
    audioPlayer.volume = 1;
    audioPlayer.muted = false;
    console.log(audioPlayer.volume);
    console.log(audioPlayer.muted);
    console.log(audioPlayer.src);

    audioPlayer.addEventListener("loadedmetadata", () => {
      console.log("Loaded!");
      console.log(audioPlayer.duration);
    });

    audioPlayer.addEventListener("error", () => {
      console.log(audioPlayer.error);
    });

    audioPlayer.addEventListener("play", () => {
      console.log("Playing...");
    });

    audioPlayer.addEventListener("pause", () => {
      console.log("Paused");
    });

    playPause.addEventListener("click", () => {
      if(audioPlayer.paused){
        audioPlayer.play();
        playPause.textContent = "⏸";
      } else {
        audioPlayer.pause();
        playPause.textContent = "▶";
      }
    });

    nextSong.addEventListener("click", () => {
      currentSong++;
      if(currentSong >= songs.length){
        currentSong = 0;
      }
      loadSong(currentSong);
      console.log(audioPlayer.src);
      console.log(albumArt.src);
      audioPlayer.play()
      playPause.textContent = "⏸";
    });

    prevSong.addEventListener("click", () => {
      currentSong--;
      if(currentSong < 0){
        currentSong = songs.length - 1;
      }

      loadSong(currentSong);
      audioPlayer.play();
      playPause.textContent = "⏸";
    });

    audioPlayer.addEventListener("timeupdate", () => {
      progressBar.value = 
      (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;

      currentTime.textContent =
      formatTime(audioPlayer.currentTime);

      duration.textContent =
      formatTime(audioPlayer.duration);
    });

    progressBar.addEventListener("input", () => {
      audioPlayer.currentTime = 
      (progressBar.value / 100) * audioPlayer.duration; 
    });

    function formatTime(time){
      if(isNaN(time)) return "0:00";
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${String(seconds).padStart(2,"0")}`;
    }

    audioPlayer.addEventListener("ended", () => {
      currentSong++;
      if(currentSong >= songs.length){
        currentSong = 0;        
      }

      loadSong(currentSong);
      console.log(audioPlayer.src);
      audioPlayer.play()
    });

    audioPlayer.addEventListener("timeupdate", () => {
    console.log(audioPlayer.currentTime);

    progressBar.value =
    (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;

    currentTime.textContent =
    formatTime(audioPlayer.currentTime);

    duration.textContent =
    formatTime(audioPlayer.duration);
});

   