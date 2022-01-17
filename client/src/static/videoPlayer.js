export function playVideo(elementId, sourceUrl, thumbnailUrl) {
    // https://docs.videojs.com/tutorial-options.html
    var player = videojs(elementId, {
        controls: true,
        preload: 'metadata',
        poster: thumbnailUrl,
        fluid: true,
        sources: [{
            src: sourceUrl,
            type: 'application/x-mpegURL'
        }]
    });

    player.play();
}