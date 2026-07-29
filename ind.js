 const welcomeWindow = document.getElementById('welcomeWindow');
      const dragHandle = document.getElementById('windowDragHandle');
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

      function startDrag(targetWindow, handle, event) {
        const rect = targetWindow.getBoundingClientRect();
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
        targetWindow.style.transform = 'none';
        targetWindow.style.left = `${rect.left}px`;
        targetWindow.style.top = `${rect.top}px`;
        isDragging = true;
        dragTarget = targetWindow;
        handle.setPointerCapture(event.pointerId);
      }

      dragHandle.addEventListener('pointerdown', (event) => startDrag(welcomeWindow, dragHandle, event));

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

      const terminalCard = document.getElementById("terminalCard");
      const terminalWindow = document.getElementById("terminalWindow");
      const terminalClose = document.getElementById("terminalClose");
      const terminalBody = document.getElementById("terminalBody");
      const terminalInput = document.getElementById("terminalInput");
      const terminalOutput = document.querySelector(".terminal-output");

      const fortunes = [
        "🍒 Stay curious.",
        "🍒 Small progress is still progress.",
        "🍒 Every bug teaches something.",
        "🍒 Create before you consume.",
        "🍒 Keep building."
      ];

     

     