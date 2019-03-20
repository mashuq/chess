import gamestate from '../store/gamestate'
import { CHESS } from '../actions/actiontypes'
import produce from "immer"
import _ from 'lodash'

const black = 'black',
  white = 'white';

const chessReducer = (state = gamestate, action) => {
  switch (action.type) {
    case CHESS.WHITEMOVE: {
      if(state.chess.currentMove != white){
        return state;
      }
      let result = validateMove(action.move.draggedPiece.file,
        action.move.draggedPiece.rank,
        action.move.droppedSquare.file,
        action.move.droppedSquare.rank,
        action.move.draggedPiece.color,
        action.move.draggedPiece.type,
        action.move.draggedPiece.notation,
        state
      );
      return getNextState(action.move.draggedPiece.file,
        action.move.draggedPiece.rank,
        action.move.droppedSquare.file,
        action.move.droppedSquare.rank,
        action.move.draggedPiece.color,
        state, 
        result.error,
        result.engine);
    }
    case CHESS.BLACKMOVE: {
      if(state.chess.currentMove != black){
        return state;
      }
      let status = state.chess.engine.getStatus();
      let moveName = _.sample(Object.keys(status.notatedMoves));
      let moveDetails = status.notatedMoves[moveName];
      let result = validateMove(moveDetails.src.file,
        moveDetails.src.rank,
        moveDetails.dest.file,
        moveDetails.dest.rank,
        black,
        null,
        null,
        state,
        moveName
      );
      return getNextState(moveDetails.src.file,
        moveDetails.src.rank,
        moveDetails.dest.file,
        moveDetails.dest.rank,
        black,
        state, 
        result.error,
        result.engine);
    }
    default:
      return state
  }
}

const getNextState = (fromFile, fromRank, toFile, toRank, color, state, error, engine) => {
  const nextState = produce(state, draft => {
    draft.chess.engine = engine;
    if (error) {
      draft.chess.error = error;
    } else {      
      let forwardingPiece = draft.chess.pieces.filter(obj => {
        return obj.file == fromFile && obj.rank == fromRank;
      });
      forwardingPiece[0].rank = toRank;
      forwardingPiece[0].file = toFile;

      //If the opposing piece is eaten remove from board
      let opposingPiece = draft.chess.pieces.filter(obj => {
        return obj.file == toFile && obj.rank == toRank && obj.color == opposingColor(color);
      });
      if (opposingPiece && opposingPiece.length) {
        draft.chess.pieces = draft.chess.pieces.filter(function (x) {
          return opposingPiece.indexOf(x) < 0;
        });
      }
      draft.chess.currentMove = opposingColor(color);
      draft.chess.error = null;
    }
  });
  return nextState;
}

const validateMove = (fromFile, fromRank, toFile, toRank, color, type, notation, state, moveName = generateMove(fromFile, fromRank, toFile, toRank, color, type, notation, state)) => {
  let error = null;
  let engine = state.chess.engine;
  try {
    engine.move(moveName);
  } catch (e) {
    error = 'Invalid Move ' + moveName;
  }
  return {error:error, engine:engine};
}

const generateMove = (fromFile, fromRank, toFile, toRank, color, type, notation, state) => {
  let move = null;
  let opposingPiece = state.chess.pieces.filter(obj => {
    return obj.file == toFile && obj.rank == toRank && obj.color == opposingColor(color);
  });
  if (opposingPiece && opposingPiece.length) {
    if (type == 'pawn') move = fromFile + 'x' + toFile + toRank;
    else move = notation + 'x' + toFile + toRank;
  }
  else move = notation + toFile + toRank;
  return move;
}

const opposingColor = (color) => {
  if (color == black) return white;
  else return black;
}


export default chessReducer;