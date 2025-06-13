function setupPlayback(video) {
  if (!video || video.__autoPausePlayHandled) return;
  video.__autoPausePlayHandled = true;

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !video.paused) {
      video.pause();
      console.log("⏸️ Paused video due to tab blur");
    } else if (!document.hidden && video.paused) {
      video.play();
      console.log("▶️ Played video due to tab focus");
    }
  });

  window.addEventListener("blur", () => {
    if (!video.paused) {
      video.pause();
      console.log("⏸️ Paused video due to window blur");
    }
  });

  window.addEventListener("focus", () => {
    if (video.paused) {
      video.play();
      console.log("▶️ Played video due to window focus");
    }
  });

  console.log("✅ Video event listeners set.");
}

function waitForVideo() {
  const checkAndSetup = () => {
    const video = document.querySelector("video");
    if (video) {
      setupPlayback(video);
    }
  };

  // Initial check
  checkAndSetup();

  // Observe for video appearing later
  const observer = new MutationObserver(() => {
    checkAndSetup();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Also hook into YouTube's dynamic page loads
  let lastUrl = location.href;
  new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      setTimeout(checkAndSetup, 1000); // Delay allows YouTube to render video
    }
  }).observe(document.body, { childList: true, subtree: true });
}

// Ensure page is interactive
if (document.readyState === "complete" || document.readyState === "interactive") {
  waitForVideo();
} else {
  window.addEventListener("DOMContentLoaded", waitForVideo);
}
