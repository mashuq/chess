import gamestate from '../store/gamestate'
import {CHESS} from '../actions/actiontypes'
import produce from "immer"

const chessReducer = (state = gamestate, action) => {
  switch (action.type) {    
    case CHESS.MOVE:{
      const nextState = produce(state, draft => {
        let piece = draft.chess.pieces.filter(obj => {
          return obj.row == action.move.draggedPiece.row && obj.col == action.move.draggedPiece.col;
        });
        piece[0].col = action.move.droppedSquare.col;
        piece[0].row = action.move.droppedSquare.row;
      })
      return nextState;
    }      
    default:
      return state
  }
}

export default chessReducer