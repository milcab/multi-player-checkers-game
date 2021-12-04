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
        const cuadro = createCol()
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
            cuadro.appendChild(token)
        }

        cuadro.setAttribute("rowIndex", rowIndex)
        cuadro.setAttribute("colIndex", colIndex)

        rowEl.appendChild(cuadro)
    })


    boardEl.appendChild(rowEl)
})

function removeHighlightedBoxes() {
    // what is this doing?
    document.querySelectorAll('.highlighted')
        // what is this doing?
        .forEach(element => {
            // what is this doing?
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
            // https://www.w3schools.com/css/css_attribute_selectors.asp
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

function highlight(nextMoves) {
    nextMoves.forEach((move) => {
        if (move) {
            move.classList.add('highlighted')
        }
    })
}

function moveToken(cuadros, token) {
    function move(event) {
        const cuadro = event.target;
        if (cuadro.innerHTML === "") {
            cuadro.appendChild(token)
            removeHighlightedBoxes()

            cuadros.forEach((cuadro) => {
                cuadro.removeEventListener('click', move)
            })
        }
    }

    cuadros.forEach((cuadro) => {
        if (cuadro) {
            cuadro.addEventListener("click", move)
        }
    })
}

function createToken(tokenColor) {
    const token = document.createElement('div')
    token.classList.add('token')

    token.addEventListener("click", () => {
        sounds.tokenClicked.pause()
        sounds.tokenClicked.load()
        sounds.tokenClicked.play()
        // :( not sure why it does not work :(
        // it turns out it works if you have an android :(
        window.navigator.vibrate(200)

        const parentElement = token.parentElement

        // https://gomakethings.com/converting-strings-to-numbers-with-vanilla-javascript/
        const rowIndex = parseInt(parentElement.getAttribute('rowindex'), 10)
        const colIndex = parseInt(parentElement.getAttribute('colindex'), 10)

        const nextMoves = findNextMoves(tokenColor, rowIndex, colIndex)

        removeHighlightedBoxes()
        highlight(nextMoves)
        moveToken(nextMoves, token)

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
