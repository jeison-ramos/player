document.getElementById('generator-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var videoUrl = document.getElementById('video-url').value;
    var vastUrl = document.getElementById('vast-url').value;
    var playerContainer = document.getElementById('player-container');
    var embedCode = document.getElementById('embed-code');

    playerContainer.innerHTML = '<video id="player" controls preload="auto" width="100%" height="100%"><source src="' + videoUrl + '" type="video/mp4"></video>';

    var player = fluidPlayer('player', {
        layoutControls: {
            fillToContainer: true
        },
        vastOptions: {
            adList: [
                {
                    roll: 'preRoll',
                    vastTag: vastUrl,
                    adText: 'Publicidad',
                    skip: true,
                    skipIn: 10
                }
            ]
        }
    });

    var iframeContent = '<video controls preload="auto" width="100%" height="100%"><source src="' + videoUrl + '" type="video/mp4"></video>';
    var iframeCode = '<iframe src="data:text/html;charset=utf-8,' + encodeURIComponent(iframeContent) + '" width="800" height="450" frameborder="0" allowfullscreen></iframe>';
    embedCode.value = iframeCode;
});
