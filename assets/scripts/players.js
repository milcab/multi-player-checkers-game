const firstPlayer = "red"
$('body').attr('currentturn', firstPlayer)

function switchPlayer() {
    const currentPlayer = $('body').attr('currentturn')

    if (currentPlayer === 'red') {
        $('body').attr('currentturn', 'white')
    } else {
        $('body').attr('currentturn', 'red')
    }
}