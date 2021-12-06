function startGame() {
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

    const boardEl = $('.board')

    const whiteTokens = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const redTokens = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    const rowElements = rows.map((cols, rowIndex) => {
        const rowEl = $('<div>').addClass('row')
        const colElements = cols.map((col, colIndex) => {
            const cuadro = $('<div>').addClass('column')
            const isEven = (rowIndex + colIndex) % 2 === 0
            const isEmptyRow = rowIndex === 3 || rowIndex === 4

            if (isEven && !isEmptyRow) {
                let tokenColor

                if (whiteTokens.length) {
                    whiteTokens.pop()
                    tokenColor = 'white'
                } else if (redTokens.length) {
                    redTokens.pop()
                    tokenColor = 'red'
                }

                let token = createToken(tokenColor, rowIndex, colIndex)

                token.addClass(tokenColor)
                cuadro.append(token)
            }

            cuadro.attr("rowIndex", rowIndex)
            cuadro.attr("colIndex", colIndex)

            return cuadro
        })

        rowEl.append(colElements)


        return rowEl
    })

    boardEl.append(rowElements)

    function removeHighlightedBoxes() {
        // what is this doing?
        $('.highlighted')
            // what is this doing?
            .each((index, element) => {
                // what is this doing?
                $(element).removeClass('highlighted')
            })
    }

    function findNextMoves(tokenColor, rowIndex, colIndex) {
        const top = parseInt(rowIndex) - 1
        const right = parseInt(colIndex) + 1
        const bottom = parseInt(rowIndex) + 1
        const left = parseInt(colIndex) - 1

        if (tokenColor === 'white') {
            return [
                // https://www.w3schools.com/css/css_attribute_selectors.asp
                $(`[colIndex="${left}"][rowIndex="${bottom}"]`),
                $(`[colIndex="${right}"][rowIndex="${bottom}"]`)
            ]
        } else {
            return [
                $(`[colIndex="${left}"][rowIndex="${top}"]`),
                $(`[colIndex="${right}"][rowIndex="${top}"]`),
            ]
        }
    }

    function highlight(nextMoves) {
        nextMoves.forEach((move) => {
            if (move) {
                move.addClass('highlighted')
            }
        })
    }

    function moveToken(cuadros, token) {
        function move(event) {
            const cuadro = $(event.target)
            const isToken = cuadro.hasClass('token')

            if (!isToken && cuadro.is(":empty")) {
                cuadro.append(token)

                removeHighlightedBoxes()

                cuadros.forEach((cuadro) => {
                    cuadro.off('click', move)
                })

                sounds.moveToken()
                switchPlayer()
            }
        }

        cuadros.forEach((cuadro) => {
            if (cuadro) {
                cuadro.on("click", move)
            }
        })
    }

    function createToken(tokenColor) {
        const token = $('<div>')
        token.addClass('token')
        token.attr('color', tokenColor)

        token.on("click", () => {
            if ($('body').attr('currentturn') === tokenColor) {
                // :( not sure why it does not work :(
                // it turns out it works if you have an android :(
                // window.navigator.vibrate(200)

                const parentElement = token.parent()

                // https://gomakethings.com/converting-strings-to-numbers-with-vanilla-javascript/
                const rowIndex = parentElement.attr('rowindex')
                const colIndex = parentElement.attr('colindex')

                let nextMoves = findNextMoves(tokenColor, rowIndex, colIndex)

                nextMoves = nextMoves.map((cuadro) => {
                    if (cuadro === null) {
                        return null
                    } else if (cuadro.is(":empty")) {
                        return cuadro
                    } else {
                        // I need to find out how to eat the oponent
                        const nextTokenRowIndex = cuadro.attr('rowindex')
                        const nextTokenColIndex = cuadro.attr('colindex')
                        const nextMoveToken = $(cuadro.children()[0])
                        const nextMoveTokenColor = nextMoveToken.attr('color')


                        // it is my own token
                        if (tokenColor === nextMoveTokenColor) {
                            return null
                        } else {
                            const [left, right] = findNextMoves(tokenColor, nextTokenRowIndex, nextTokenColIndex)

                            function isLeftToRight(row1, col1, row2, col2) {
                                let sameRow
                                let sameCol

                                row1 = parseInt(row1)
                                col1 = parseInt(col1)
                                row2 = parseInt(row2)
                                col2 = parseInt(col2)

                                if (tokenColor === "red") {
                                    sameRow = row1 - 1 === row2
                                } else {
                                    sameRow = row1 + 1 === row2
                                }
                                console.log({ row1, row2, sameRow })
                                sameCol = col1 + 1 === col2
                                console.log({ tokenColor, row1, col1, row2, col2 })
                                return sameRow && sameCol
                            }

                            let emptyBox = null

                            if (isLeftToRight(rowIndex, colIndex, nextTokenRowIndex, nextTokenColIndex)) {
                                if (right.is(':empty')) {
                                    emptyBox = right
                                }
                            } else if (left.is(':empty')) {
                                emptyBox = left
                            }

                            if (emptyBox) {
                                emptyBox.one('click', () => {
                                    nextMoveToken.remove()
                                    addScore(tokenColor)
                                    displayScores()
                                })
                            }


                            return emptyBox
                        }

                    }
                })

                nextMoves = nextMoves.filter(cuadro => cuadro !== null)

                removeHighlightedBoxes()
                highlight(nextMoves)
                moveToken(nextMoves, token)

            }
        })

        return token
    }

}
