let rows = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
]

const boardEl = document.querySelector('.board');

const whiteTokens = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
const redTokens = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

rows.forEach((cols, rowIndex) => {
    const rowEl = createRow()
    cols.forEach((col, colIndex) => {
        const colEl = createCol()
        const isEven = (rowIndex + colIndex) % 2 === 0
        const isEmptyRow = rowIndex === 3 || rowIndex === 4

        if (isEven && !isEmptyRow) {
            let tokenColor;

            if (whiteTokens.length) {
                whiteTokens.pop()
                tokenColor = 'white';
            } else if (redTokens.length) {
                redTokens.pop()
                tokenColor = 'red';
            }

            let token = createToken(tokenColor, rowIndex, colIndex);

            token.classList.add(tokenColor);
            colEl.appendChild(token)
        }

        colEl.setAttribute("rowIndex", rowIndex)
        colEl.setAttribute("colIndex", colIndex)

        rowEl.appendChild(colEl)
    })


    boardEl.appendChild(rowEl)
})

function removeHighlightedBoxes() {
    document.querySelectorAll('.highlighted').forEach(element => {
        element.classList.remove('highlighted')
    })
}

const sounds = {
    tokenClicked: document.getElementById('tokenClicked')
}

function findNextMoves(tokenColor, rowIndex, colIndex) {
    const top = rowIndex - 1
    const right = colIndex + 1
    const bottom = rowIndex + 1
    const left = colIndex - 1

    if (tokenColor === 'white') {
        return [
            document.querySelector(`[colIndex="${left}"][rowIndex="${bottom}"]`),
            document.querySelector(`[colIndex="${right}"][rowIndex="${bottom}"]`)
        ]
    } else {
        return [
            document.querySelector(`[colIndex="${left}"][rowIndex="${top}"]`),
            document.querySelector(`[colIndex="${right}"][rowIndex="${top}"]`),
        ]
    }
}

function highlight(moves) {
    moves.forEach((move) => {
        if (move) {
            move.classList.add('highlighted')
        }
    })
}

function createToken(tokenColor, rowIndex, colIndex) {
    const token = document.createElement('div')
    token.classList.add('token')

    token.addEventListener("click", () => {
        sounds.tokenClicked.pause()
        sounds.tokenClicked.load()
        sounds.tokenClicked.play()
        // :( not sure why it does not work :(
        window.navigator.vibrate(200)

        const nextMoves = findNextMoves(tokenColor, rowIndex, colIndex)
        removeHighlightedBoxes()
        highlight(nextMoves)
    })

    return token
}


function createRow() {
    const row = document.createElement('div')
    row.classList.add('row')

    return row
}

function createCol() {
    const col = document.createElement('div')
    col.classList.add('column')

    return col
}
