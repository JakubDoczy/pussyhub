import {Hls} from "./hls.min";

export function playVideo(elementId, videoSrcUrl) {
    let video = document.getElementById(elementId);
    //
    // First check for native browser HLS support
    //
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrcUrl;
    //
    // If no native HLS support, check if HLS.js is supported
    //
    } else if (Hls.isSupported()) {
        let hls = new Hls();
        hls.loadSource(videoSrcUrl);
        hls.attachMedia(video);
    }
}
