/**
 * All state for this demo is held in a single top level context provider.
 */
import React, { createContext, useState } from "react"
import { Position, BoardTile, Board, ChessSide, BoardRow } from "./types"
import {
  createEmptyRow,
  createPawnRow,
  getTile,
  setTile,
  moveTile,
  clearTile,
} from "./utils"

type Context = {
  getTile: (position: Position) => BoardTile
  setTile: (position: Position, tile: BoardTile) => void
  clearTile: (position: Position) => void
  moveTile: (from: Position, to: Position) => void
  board: Board
}

export const Context = createContext((null as unknown) as Context)

const createMainRow = (side: ChessSide): BoardRow => {
  return [
    { piece: "rook", side },
    { piece: "knight", side },
    { piece: "bishop", side },
    { piece: "queen", side },
    { piece: "king", side },
    { piece: "bishop", side },
    { piece: "knight", side },
    { piece: "rook", side },
  ]
}

/** An 8x8 board filled with EMPTY_TILEs */
const DEFAULT_BOARD: Board = [
  createMainRow("black"),
  createPawnRow("black"),
  createEmptyRow(),
  createEmptyRow(),
  createEmptyRow(),
  createEmptyRow(),
  createPawnRow("white"),
  createMainRow("white"),
]

/**
 * React Hook that internally maintains a Chess Board state.
 * Methods are returned to allow manipulation of the board updates will be handled through react.
 * The hook wraps the board methods to include updates to React state.
 */
const useBoard = (): Context => {
  const [board, setBoard] = useState(DEFAULT_BOARD)

  return {
    getTile: position => getTile(board, position),
    setTile: (position, tile) => setBoard(setTile(board, position, tile)),
    clearTile: position => setBoard(clearTile(board, position)),
    moveTile: (from, to) => setBoard(moveTile(board, from, to)),
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
