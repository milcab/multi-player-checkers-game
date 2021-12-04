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
    const top = parseInt(rowIndex) - 1
    const right = parseInt(colIndex) + 1
    const bottom = parseInt(rowIndex) + 1
    const left = parseInt(colIndex) - 1

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
    token.setAttribute('color', tokenColor);

    token.addEventListener("click", () => {
        sounds.tokenClicked.pause()
        sounds.tokenClicked.load()
        sounds.tokenClicked.play()
        // :( not sure why it does not work :(
        // it turns out it works if you have an android :(
        window.navigator.vibrate(200)

        const parentElement = token.parentElement

        // https://gomakethings.com/converting-strings-to-numbers-with-vanilla-javascript/
        const rowIndex = parentElement.getAttribute('rowindex')
        const colIndex = parentElement.getAttribute('colindex')

        let nextMoves = findNextMoves(tokenColor, rowIndex, colIndex)

        nextMoves = nextMoves.map((cuadro) => {
            if (cuadro === null) {
                return null
            } else if (cuadro.innerHTML === "") {
                return cuadro
            } else {
                // I need to find out how to eat the oponent
                const nextTokenRowIndex = cuadro.getAttribute('rowindex')
                const nextTokenColIndex = cuadro.getAttribute('colindex')
                const nextMoveToken = cuadro.childNodes[0]
                const nextMoveTokenColor = nextMoveToken.getAttribute('color')


                // it is my own token
                if (tokenColor === nextMoveTokenColor) {
                    return null
                } else {
                    const [left, right] = findNextMoves(tokenColor, nextTokenRowIndex, nextTokenColIndex)

                    function isLeftToRight(row1, col1, row2, col2) {
                        let sameRow;
                        let sameCol;

                        if (tokenColor === "red") {
                            sameRow = row1 - 1 === row2
                        } else {
                            sameRow = row1 + 1 === row2
                        }

                        sameCol = col1 + 1 === col2

                        return sameRow && sameCol
                    }

                    if (isLeftToRight(rowIndex, colIndex, nextTokenRowIndex, nextTokenColIndex)) {
                        if (right.innerHTML === "") {
                            return right
                        } else {
                            return null
                        }
                    } else {
                        if (left.innerHTML === "") {
                            return left
                        } else {
                            return null
                        }
                    }
                }

            }
        })

        nextMoves.filter(cuadro => cuadro !== null)

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
