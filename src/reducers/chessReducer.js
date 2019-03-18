import gamestate from '../store/gamestate'
import {CHESS} from '../actions/actiontypes'
import produce from "immer"

const chessReducer = (state = gamestate, action) => {
  switch (action.type) {    
    case CHESS.MOVE:{
      const nextState = produce(state, draft => {
        draft.chess.board = state.chess.board + 1;
      })
      return nextState;
    }      
    default:
      return state
  }
}

export default chessReducer