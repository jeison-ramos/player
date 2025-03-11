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

    // Reemplaza VIDEO_URL y VAST_URL en player.html
    var playerHtmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Embedded Video</title>
            <link href="https://cdn.fluidplayer.com/v3/current/fluidplayer.min.css" rel="stylesheet">
        </head>
        <body>
            <video id="player" controls preload="auto" width="100%" height="100%">
                <source src="${videoUrl}" type="video/mp4">
            </video>
            <script src="https://cdn.fluidplayer.com/v3/current/fluidplayer.min.js"></script>
            <script>
                fluidPlayer('player', {
                    layoutControls: {
                        fillToContainer: true
                    },
                    vastOptions: {
                        adList: [
                            {
                                roll: 'preRoll',
                                vastTag: '${vastUrl}',
                                adText: 'Publicidad',
                                skip: true,
                                skipIn: 10
                            }
                        ]
                    }
                });
            </script>
        </body>
        </html>
    `;

    // Crear un blob con el contenido HTML
    var blob = new Blob([playerHtmlContent], { type: 'text/html' });
    var playerUrl = URL.createObjectURL(blob);

    var iframeCode = `<iframe src="${playerUrl}" width="800" height="450" frameborder="0" allowfullscreen></iframe>`;
    embedCode.value = iframeCode;
});
