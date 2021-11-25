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
            let token = createToken();
            let tokenColor;

            if (whiteTokens.length) {
                whiteTokens.pop()
                tokenColor = 'white';
            } else if (redTokens.length) {
                redTokens.pop()
                tokenColor = 'red';
            }

            token.classList.add(tokenColor);
            colEl.appendChild(token)
        }

        rowEl.appendChild(colEl)
    })


    boardEl.appendChild(rowEl)
})

const sounds = {
    tokenClicked: document.getElementById('tokenClicked')
}

function createToken() {
    const token = document.createElement('div')
    token.classList.add('token')

    token.addEventListener("click", () => {
        sounds.tokenClicked.pause();
        sounds.tokenClicked.load();
        sounds.tokenClicked.play();
        // :( not sure why it does not work :(
        window.navigator.vibrate(200);
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
