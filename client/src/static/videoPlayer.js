export function playVideo(elementId, videoSrcUrl) {
    const dp = new DPlayer({
        container: document.getElementById(elementId),
        video: {
            url: videoSrcUrl,
            type: 'customHls',
            customType: {
                customHls: function (video, player) {
                    const hls = new Hls();
                    hls.loadSource(video.src);
                    hls.attachMedia(video);
                },
            },
        },
        theme: "#fa9b27",
        airplay: false
    });
}