const play = function (sound) {
    sound.pause()
    sound.load()
    sound.play()
}

const sounds = {
    moveToken: function () {
        play(document.getElementById('tokenClicked'))
    },
    applause: function () {
        play(document.getElementById('applause'))
    },
    scoreUpdate: function () {
        play(document.getElementById('scoreUpdate'))
    }
}

