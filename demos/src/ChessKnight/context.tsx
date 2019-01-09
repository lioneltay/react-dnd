/**
 * All state for this demo is held in a single top level context provider.
 */
import React, { createContext, useReducer, useRef, useState } from "react"
import { Position, BoardTile, Board } from "./types"

type Context = {
  getTile: (position: Position) => BoardTile
  setTile: (position: Position, tile: BoardTile) => void
  clearTile: (position: Position) => void
  moveTile: (from: Position, to: Position) => void
  board: Board
}

export const Context = createContext((null as unknown) as Context)

const EMPTY_TILE = { piece: null }

/** An 8x8 board filled with EMPTY_TILEs */
const DEFAULT_BOARD = Array(8)
  .fill(Array(8).fill(null))
  .map(row => row.map(() => ({ ...EMPTY_TILE }))) as Board

/** Place a knight at position in row 2 on column 3 */
DEFAULT_BOARD[1][2] = { piece: "knight" }

/**
 * React Hook that internally maintains a Chess Board state.
 * Methods are returned to allow manipulation of the board updates will be handled through react.
 * A hook is used instead of simply a data structure class as we need to let React know when we are updating our board.
 */
const useBoard = () => {
  const [board, setBoard] = useState(DEFAULT_BOARD)

  const getTile = ([x, y]: Position): BoardTile => {
    return { ...board[x][y] }
  }

  const setTile = ([x, y]: Position, tile: BoardTile): void => {
    setBoard(b => {
      const new_board = [
        ...b.slice(0, x),
        [...b[x].slice(0, y), { ...EMPTY_TILE, ...tile }, ...b[x].slice(y + 1)],
        ...b.slice(x + 1),
      ] as Board

      return new_board
    })
  }

  const clearTile = (position: Position): void => {
    setTile(position, EMPTY_TILE)
  }

  const moveTile = (from: Position, to: Position): void => {
    setTile(to, getTile(from))
    clearTile(from)
  }

  return {
    getTile,
    setTile,
    clearTile,
    moveTile,
    board,
  }
}

/** Top level provider that holds all the app state */
export const Provider: React.FunctionComponent = ({ children }) => {
  const { getTile, setTile, clearTile, moveTile, board } = useBoard()

  return (
    <Context.Provider value={{ getTile, setTile, clearTile, moveTile, board }}>
      {children}
    </Context.Provider>
  )
}
