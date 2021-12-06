const gameStats = {
    totalGamesPlayed: 0,
    players: {
        white: {
            gamesPlayed: 0,
            score: 0,
            wins: 0,
            draws: 0,
            losses: 0
        },
        red: {
            gamesPlayed: 0,
            score: 0,
            wins: 0,
            draws: 0,
            losses: 0
        }
    }
}

function addScore(color) {
    gameStats.players[color].score += 1
    sounds.scoreUpdate()
}

function addDraw(color) {
    gameStats.players[color].draws += 1
    sounds.scoreUpdate()
}

function addWin(color) {
    gameStats.players[color].wins += 1
    sounds.scoreUpdate()
}

function addLosses(color) {
    gameStats.players[color].losses += 1
    sounds.scoreUpdate()
}

function displayScores() {
    $('.scores .white').text(gameStats.players.white.score)
    $('.scores .red').text(gameStats.players.red.score)

    const winner = $('#winner');

    if (gameStats.players.red.score === 12) {
        sounds.applause()
        winner.addClass('rotate-scale-up')
        winner.text('red is the winner')
    }

    if (gameStats.players.white.score === 12) {
        sounds.applause()
        winner.addClass('rotate-scale-up')
        winner.text('white is the winner')
    }
}
