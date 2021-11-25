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

            if (whiteTokens.length) {
                whiteTokens.pop()
                const token = createToken()

                token.classList.add('white');

                colEl.appendChild(token)
            } else if (redTokens.length) {
                redTokens.pop()
                const token = createToken()

                token.classList.add('red');

                colEl.appendChild(token)
            }

        }

        rowEl.appendChild(colEl)
    })


    boardEl.appendChild(rowEl)
})

function createToken() {
    const token = document.createElement('div')
    token.classList.add('token')

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
