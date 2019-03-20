import chess from 'chess';

const black = 'black',
    white = 'white',
    rook = 'rook',
    knight = 'knight',
    bishop = 'bishop',
    queen = 'queen',
    king = 'king',
    pawn = 'pawn',
    rookNotation = 'R',
    knightNotation = 'N',
    bishopNotation = 'B',
    queenNotation = 'Q',
    kingNotation = 'K',
    pawnNotation = '',
    startCode = 97;



let gamestate = {
    chess: { board: createBoard(), pieces: setPieces(), engine:chess.create(), error:'' }
}

function createBoard() {
    let board = [];
    let color = true;
    for (let col = 8; col > 0; col--) {
        for (let row = 0; row < 8; row++) {
            if (row != 0) color = !color;
            let square = {};
            square.row = String.fromCharCode(startCode + row);
            square.col = col;
            square.id = square.row + square.col;
            if (color) square.color = white;
            else square.color = black;
            board.push(square);
        }

    }
    return board;
};

function setPieces() {
    let pieces = [];
    let row = 0;
    //setting the black pawns
    let col = 7;
    for (row = 0; row < 8; row++) {
        pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: pawn, color: black, notation: pawnNotation });
    }
    //setting black rooks
    col = 8;
    for (row of [0, 7]) {
        pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: rook, color: black, notation: rookNotation });
    }
    //Stting black knights
    for (row of [1, 6]) {
        pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: knight, color: black, notation: knightNotation });
    }
    //Stting black bishops
    for (row of [2, 5]) {
        pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: bishop, color: black, notation: bishopNotation });
    }
    //Setting black king
    row = 3;
    pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: king, color: black, notation: kingNotation });
    //Setting black queen
    row = 4;
    pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: queen, color: black, notation: queenNotation });

    //setting the white pawns
    col = 2;
    for (row = 0; row < 8; row++) {
        pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: pawn, color: white, notation: pawnNotation });
    }
    //setting white rooks
    col = 1;
    for (row of [0, 7]) {
        pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: rook, color: white, notation: rookNotation });
    }
    //Stting white knights
    for (row of [1, 6]) {
        pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: knight, color: white, notation: knightNotation });
    }
    //Stting white bishops
    for (row of [2, 5]) {
        pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: bishop, color: white, notation: bishopNotation });
    }
    //Setting white king
    row = 3;
    pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: king, color: white, notation: knightNotation });
    //Setting white queen
    row = 4;
    pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: queen, color: white, notation: queenNotation });



    return pieces;
}

export default gamestate;