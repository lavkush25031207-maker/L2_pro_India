const secondryNav = document.querySelector(".secondry-nav");

function closeSidebarOnMobile() {
    if (window.innerWidth <= 768 && secondryNav) {
        secondryNav.classList.remove("show");
    }
}

// ================= SIDEBAR TOGGLE =================
const sidebarHeaders = document.getElementsByClassName("sidebar-header");

for (let i = 0; i < sidebarHeaders.length; i++) {
    sidebarHeaders[i].onclick = function () {

        resetView(); // reset when switching module

        const icon = this.querySelector(".side-head-icon");
        let next = this.nextElementSibling;

        while (next && !next.classList.contains("sidebar-header")) {
            if (next.classList.contains("module")) {
                next.classList.toggle("show");
            }
            next = next.nextElementSibling;
        }

        icon.classList.toggle("rotate");
    };
}


// ================= PATENTS TOGGLE =================
const patentsOpens = document.getElementsByClassName("patents_open");

for (let i = 0; i < patentsOpens.length; i++) {
    patentsOpens[i].onclick = function () {

        resetView(); // reset when inner module changes

        const patents = this.nextElementSibling;
        const icon = this.querySelector(".side-head-icon");

        if (!patents || !patents.classList.contains("patents")) return;

        patents.classList.toggle("hidden");
        icon.classList.toggle("rotate");
    };
}


// ================= CARD & FORM TOGGLE =================
const forms = document.querySelectorAll(".forms");
const cardSection = document.getElementById("cardSection");
const introVideo = document.querySelector(".intro-video");

forms.forEach(form => {
    form.addEventListener("click", function () {

        closeSidebarOnMobile();   // 👈 ADD THIS LINE

        const isActive = this.classList.contains("active");

        forms.forEach(f => f.classList.remove("active"));

        if (!isActive) {
            this.classList.add("active");

            introVideo.classList.add("hidden");
            cardSection.classList.remove("hidden");
            cardSection.classList.add("show");

            video.pause();
        } else {
            resetView();
        }
    });
});



// ================= RESET FUNCTION =================
function resetView() {

    forms.forEach(f => f.classList.remove("active"));

    cardSection.classList.remove("show");
    cardSection.classList.add("hidden");

    introVideo.classList.remove("hidden");

    if (video) {
        video.pause();
    }
}



// ================= BASIC VIDEO ELEMENTS =================
const video = document.getElementById("mainVideo");
const source = document.getElementById("videoSource");
const titleEl = document.querySelector(".video-title");
const totalTimeEl = document.querySelector(".all-video-time");

const videoItems = document.querySelectorAll(".patents > li[data-video]");

let currentLi = null;


// ================= TIME FORMAT =================
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}m ${s < 10 ? "0" : ""}${s}s video`;
}


// ================= SINGLE VIDEO TIME =================
video.addEventListener("loadedmetadata", () => {
    if (!currentLi || isNaN(video.duration)) return;

    const timeEl = currentLi.querySelector(".video-time");
    if (timeEl) {
        timeEl.textContent = formatTime(video.duration);
    }
});


// ================= VIDEO CLICK =================
videoItems.forEach(li => {
    li.addEventListener("click", () => {

        closeSidebarOnMobile();   // 👈 ADD THIS LINE

        resetView();

        const path = li.dataset.video;
        const textSpan = li.querySelector(".text");

        if (!path || !textSpan) return;

        videoItems.forEach(v => v.classList.remove("active"));
        li.classList.add("active");

        currentLi = li;

        source.src = path;
        video.load();
        video.play();

        titleEl.textContent = textSpan.textContent;
    });
});


// ================= DEFAULT LOAD =================
window.addEventListener("DOMContentLoaded", () => {
    const active = document.querySelector(".patents > li.active");
    if (active) {
        currentLi = active;
        const textSpan = active.querySelector(".text");
        if (textSpan) titleEl.textContent = textSpan.textContent;
    }
});


// ================= TOTAL ALL VIDEOS TIME =================
let totalSeconds = 0;
let loaded = 0;

videoItems.forEach(li => {

    const path = li.dataset.video;
    const temp = document.createElement("video");

    temp.preload = "metadata";
    temp.src = path;

    temp.onloadedmetadata = () => {

        if (!isNaN(temp.duration)) {
            totalSeconds += temp.duration;
        }

        loaded++;

        if (loaded === videoItems.length && totalTimeEl) {
            totalTimeEl.textContent = formatTime(totalSeconds);
        }
    };
});
