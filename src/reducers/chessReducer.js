import gamestate from '../store/gamestate'
import { CHESS } from '../actions/actiontypes'
import produce from "immer"
import _ from 'lodash'

const chessReducer = (state = gamestate, action) => {
  switch (action.type) {
    case CHESS.MOVE: {
      let error = null;
      let move = null;
      try {
        let blackPiece = state.chess.pieces.filter(obj => {
          return obj.row == action.move.droppedSquare.row && obj.col == action.move.droppedSquare.col;
        });
        if(blackPiece && blackPiece.length) {
          if(action.move.draggedPiece.type == 'pawn')move = action.move.draggedPiece.row + 'x' + action.move.droppedSquare.row + action.move.droppedSquare.col;
          else move = action.move.draggedPiece.notation + 'x' + action.move.droppedSquare.row + action.move.droppedSquare.col;
        }
        else move = action.move.draggedPiece.notation + action.move.droppedSquare.row + action.move.droppedSquare.col;
        state.chess.engine.move(move);
      } catch (e) {
        error = 'Invalid Move ' + move;
      }

      const nextState = produce(state, draft => {
        if (error) {
          draft.chess.error = error;
        } else {
          // Moving the white piece into place
          let whitePiece = draft.chess.pieces.filter(obj => {
            return obj.row == action.move.draggedPiece.row && obj.col == action.move.draggedPiece.col;
          });
          whitePiece[0].col = action.move.droppedSquare.col;
          whitePiece[0].row = action.move.droppedSquare.row;

          //If the black piece is eaten - remove it from the board
          let blackPiece = draft.chess.pieces.filter(obj => {
            return obj.row == action.move.droppedSquare.row && obj.col == action.move.droppedSquare.col && obj.color == 'black';
          });
          if(blackPiece){
            draft.chess.pieces = draft.chess.pieces.filter(function(x) { 
              return blackPiece.indexOf(x) < 0;
            });
          }

          // Let computer do the move
          let status = state.chess.engine.getStatus();
          let blackMoveName = _.sample(Object.keys(status.notatedMoves));
          state.chess.engine.move(blackMoveName);

          let blackMoveDetail = status.notatedMoves[blackMoveName];
          
          blackPiece = draft.chess.pieces.filter(obj => {
            return obj.row == blackMoveDetail.src.file && obj.col == blackMoveDetail.src.rank;
          });
          blackPiece[0].col = blackMoveDetail.dest.rank;
          blackPiece[0].row = blackMoveDetail.dest.file;

          //If the white piece is eaten - remove it from the board
          whitePiece = draft.chess.pieces.filter(obj => {
            return obj.row == blackMoveDetail.dest.file && obj.col == blackMoveDetail.dest.rank && obj.color == 'white';
          });
          if(whitePiece && whitePiece.length){
            draft.chess.pieces = draft.chess.pieces.filter(function(x) { 
              return whitePiece.indexOf(x) < 0;
            });
          }

          draft.chess.error = null;
        }
      });
      return nextState;
    }
    default:
      return state
  }
}

export default chessReducer