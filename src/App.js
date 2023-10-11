import { useState } from 'react'
import './App.css'

const TURNS = {
    X: 'x',
    O: 'o'
}

const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const Square = ({ children, isSelected, updateBoard, index }) => {
    // Constante para definir clase y aplicar estilos por medio de op. ternario donde si se cumple la condición la clase es is-selected, caso contrario, no se aplica clase. Esta constante se asigna como valor del atributo className del div
    const className = `square ${isSelected ? 'is-selected' : ''}`

    const handleClick = () => {
        updateBoard(index)
    }
    
    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}

function App() {
    // States
    const [board, setBoard] = useState(Array(9).fill(null))
    const [turn, setTurn] = useState(TURNS.X)
    const [winner, setWinner] = useState(null)

    /**
     * 
     * @param {Array} boardToCheck Tablero para verificar si se cumple alguna de las condiciones de victoria
     */
    const checkWinner = (boardToCheck) => {
        for (const combo of WINNER_COMBOS) {
            const [a, b, c] = combo
            if (
                boardToCheck[a] &&
                boardToCheck[a] === boardToCheck[b] &&
                boardToCheck[a] === boardToCheck[c]
            ) return boardToCheck[a]

        }

        return null
    }

    /**
     * Método para actualizar el tablero cada que un jugador juegue su turno y a su vez habilite al jugador contrario su siguiente turno
     * @param {Number} index Posición del array seleccionado
     */
    const updateBoard = (index) => {
        // Condicional que verifica que la casilla esté o no vacía
        if (board[index] || winner) return 
        
        // Actualizar tablero
        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)

        // Cambiar el turno
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)

        // Verificar si hay ganador
        const newWinner = checkWinner(newBoard)
        if (newWinner) {
            setWinner(newWinner)
        } // TODO: Check if game if over
    }

    return (
        <main className='board'>
            <h1>Tic tac toe</h1>
            <section className='game'>
                {
                    board.map((_, index) => {
                        return (
                            <Square key={index} index={index} updateBoard={updateBoard}>
                                {board[index]}
                            </Square>
                        )
                    })
                }
            </section>

            <section className='turn'>
                <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
                <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
            </section>
            {
                winner !== null && (
                    <section className='winner'>
                        <div className='text'>
                            <h2>
                                {
                                    winner === false
                                        ? 'Empate'
                                        : 'Ganó: ' + winner
                                }
                            </h2>

                            <header className='win'>
                                {winner && <Square>{winner}</Square>}
                            </header>
                            <footer>
                                <button>Empezar de nuevo</button>
                            </footer>
                        </div>
                    </section>
                )
            }
        </main>
    )
}

export default App