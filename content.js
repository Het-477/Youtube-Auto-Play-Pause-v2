function togglePlayback() {
    const video = document.querySelector("video");
    if (!video) return;

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
}

togglePlayback();
