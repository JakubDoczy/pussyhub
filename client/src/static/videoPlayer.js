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
}

export function playStream(elementId, streamUrl) {
    const dp = new DPlayer({
        container: document.getElementById(elementId),
        video: {
            quality: [
                {
                    name: 'HD',
                    url: `${streamUrl}_hd720.m3u8`,
                    type: 'hls',
                },
                {
                    name: 'High',
                    url: `${streamUrl}_high.m3u8`,
                    type: 'hls',
                },
                {
                    name: 'Medium',
                    url: `${streamUrl}_mid.m3u8`,
                    type: 'hls',
                },
                {
                    name: 'Low',
                    url: `${streamUrl}_low.m3u8`,
                    type: 'hls',
                },
                {
                    name: 'Source',
                    url: `${streamUrl}.m3u8`,
                    type: 'hls',
                },
            ],
            defaultQuality: 2,
        },
        theme: "#fa9b27",
        airplay: false
    });
    player.hlsQualitySelector({ displayCurrentQuality: true });

    player.play();
}