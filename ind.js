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

     

     