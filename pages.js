
      const noteTakerCard = document.getElementById('noteTakerCard');
      const musicCard = document.getElementById('musicCard');
      const clickerCard = document.getElementById('clickerCard');
      const settingsCard = document.getElementById('settingsCard');
      const terminalCard = document.getElementById('terminalCard');
      const screentimeCard = document.getElementById('screentimeCard');
      const noteModal = document.getElementById('noteModal');
      const musicModal = document.getElementById('musicModal');
      const clickerModal = document.getElementById('clickerModal');
      const settingsModal = document.getElementById('settingsModal');
      const terminalModal = document.getElementById('terminalModal');
      const screentimeModal = document.getElementById('screentimeModal');
      const noteCloseButton = document.getElementById('noteCloseButton');
      const musicCloseButton = document.getElementById('musicCloseButton');
      const clickerCloseButton = document.getElementById('clickerCloseButton');
      const settingsCloseButton = document.getElementById('settingsCloseButton');
      const terminalCloseButton = document.getElementById('terminalCloseButton');
      const screentimeCloseButton = document.getElementById('screentimeCloseButton');
      const startTimerButton = document.getElementById('startTimerButton');
      const pauseTimerButton = document.getElementById('pauseTimerButton');
      const resetTimerButton = document.getElementById('resetTimerButton');
      const screentimeDisplay = document.getElementById('screentimeDisplay');
      const addNoteButton = document.getElementById('addNoteButton');
      const noteTitle = document.getElementById('noteTitle');
      const noteBody = document.getElementById('noteBody');
      const previewText = document.getElementById('previewText');
      const playBtn = document.getElementById('playBtn');
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      const progressBar = document.getElementById('progressBar');
      const progressFull = document.getElementById('progressFull');
      const trackTitle = document.getElementById('trackTitle');
      const trackArtist = document.getElementById('trackArtist');
      const currentTimeDisplay = document.getElementById('currentTime');
      const durationDisplay = document.getElementById('duration');
      let isPlaying = false;
      let currentTrackIndex = 0;
      let totalSeconds = 252;
      const tracks = [
        { title: "Slip Away", artist: 'Blue Beat', duration: 261 },
        { title: 'Idol', artist: 'YOASOBI', duration: 245 },
        { title: 'Kabutsu', artist: 'YOASOBI', duration: 238 },
        { title: 'Unravel', artist: 'Tokyo Ghoul', duration: 256 },
        { title: 'Renai Circulation', artist: 'Kana Hanazawa', duration: 241 },
        { title: 'Clannad After Story', artist: 'Dango Daikazoku', duration: 210 }
      ];
         
        

      function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${String(secs).padStart(2, '0')}`;
      }

      function updateTrackDisplay() {
        trackTitle.textContent = tracks[currentTrackIndex].title;
        trackArtist.textContent = tracks[currentTrackIndex].artist;
        totalSeconds = tracks[currentTrackIndex].duration;
        durationDisplay.textContent = formatTime(totalSeconds);
        elapsedSeconds = 0;
        currentTimeDisplay.textContent = '0:00';
        progressBar.style.width = '0%';
      }

      noteTakerCard.addEventListener('click', () => {
        noteModal.hidden = false;
      });

      noteCloseButton.addEventListener('click', () => {
        noteModal.hidden = true;
      });

      clickerCard.addEventListener('click', () => {
        clickerModal.hidden = false;
      });

      clickerCloseButton.addEventListener('click', () => {
        clickerModal.hidden = true;
      });

      clickerModal.addEventListener('click', (e) => {
        if (e.target === clickerModal) {
          clickerModal.hidden = true;
        }
      });

      musicCard.addEventListener('click', () => {
        musicModal.hidden = false;
      });

      musicCloseButton.addEventListener('click', () => {
        musicModal.hidden = true;
      });

      musicModal.addEventListener('click', (e) => {
        if (e.target === musicModal) {
          musicModal.hidden = true;
        }
      });

      playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playBtn.textContent = isPlaying ? '⏸' : '▶';
      });

      

      prevBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        updateTrackDisplay();
      });

      nextBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        updateTrackDisplay();
      });

      progressFull.addEventListener('click', (e) => {
        const rect = progressFull.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        elapsedSeconds = percent * totalSeconds;
        progressBar.style.width = (percent * 100) + '%';
        currentTimeDisplay.textContent = formatTime(elapsedSeconds);
      });

      updateTrackDisplay();

      setInterval(() => {
        if (isPlaying) {
          elapsedSeconds += 0.5;
          if (elapsedSeconds >= totalSeconds) {
            currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
            updateTrackDisplay();
          }
          progressBar.style.width = (elapsedSeconds / totalSeconds * 100) + '%';
          currentTimeDisplay.textContent = formatTime(elapsedSeconds);
        }
      }, 500);

      addNoteButton.addEventListener('click', () => {
        const title = noteTitle.value.trim() || 'Untitled note';
        const body = noteBody.value.trim() || 'Write something sweet...';
        previewText.innerHTML = `<strong>${title}</strong><p>${body}</p>`;
        noteTitle.value = '';
        noteBody.value = '';
      });

        

      settingsCard.addEventListener('click', () => {
        settingsModal.hidden = false;
      });

      settingsCloseButton.addEventListener('click', () => {
        settingsModal.hidden = true;
      });

      settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
          settingsModal.hidden = true;
        }
      });

      terminalCard.addEventListener('click', () => {
        terminalModal.hidden = false;
      });

      terminalCloseButton.addEventListener('click', () => {
        terminalModal.hidden = true;
      });

      terminalModal.addEventListener('click', (e) => {
        if (e.target === terminalModal) {
          terminalModal.hidden = true;
        }
      });

      let elapsedSeconds = 0;
      let timerInterval = null;
      let isTimerRunning = false;

      function updateTimerDisplay() {
        const hours = String(Math.floor(elapsedSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(elapsedSeconds % 60).padStart(2, '0');
        screentimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
      }

      function stopTimer() {
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }
        isTimerRunning = false;
      }

      function startTimer() {
        if (isTimerRunning) return;
        isTimerRunning = true;
        timerInterval = setInterval(() => {
          elapsedSeconds += 1;
          updateTimerDisplay();
        }, 1000);
      }

      screentimeCard.addEventListener('click', () => {
        screentimeModal.hidden = false;
        updateTimerDisplay();
      });

      screentimeCloseButton.addEventListener('click', () => {
        screentimeModal.hidden = true;
        stopTimer();
      });

      screentimeModal.addEventListener('click', (e) => {
        if (e.target === screentimeModal) {
          screentimeModal.hidden = true;
          stopTimer();
        }
      });

      startTimerButton.addEventListener('click', startTimer);
      pauseTimerButton.addEventListener('click', stopTimer);
      resetTimerButton.addEventListener('click', () => {
        stopTimer();
        elapsedSeconds = 0;
        updateTimerDisplay();
      });

      updateTimerDisplay();

      
  