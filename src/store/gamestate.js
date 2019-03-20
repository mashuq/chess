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
    chess: { board: createBoard(), pieces: setPieces(), engine:chess.create({ PGN : true }), error:'' }
}

function createBoard() {
    let board = [];
    let color = true;
    for (let rank = 8; rank > 0; rank--) {
        for (let file = 0; file < 8; file++) {
            if (file != 0) color = !color;
            let square = {};
            square.file = String.fromCharCode(startCode + file);
            square.rank = rank;
            square.id = square.file + square.rank;
            if (color) square.color = white;
            else square.color = black;
            board.push(square);
        }

    }
    return board;
};

function setPieces() {
    let pieces = [];
    let file = 0;
    //setting the black pawns
    let rank = 7;
    for (file = 0; file < 8; file++) {
        pieces.push({ file: String.fromCharCode(startCode + file), rank: rank, type: pawn, color: black, notation: pawnNotation });
    }
    //setting black rooks
    rank = 8;
    for (file of [0, 7]) {
        pieces.push({ file: String.fromCharCode(startCode + file), rank: rank, type: rook, color: black, notation: rookNotation });
    }
    //Stting black knights
    for (file of [1, 6]) {
        pieces.push({ file: String.fromCharCode(startCode + file), rank: rank, type: knight, color: black, notation: knightNotation });
    }
    //Stting black bishops
    for (file of [2, 5]) {
        pieces.push({ file: String.fromCharCode(startCode + file), rank: rank, type: bishop, color: black, notation: bishopNotation });
    }
    //Setting black king
    file = 3;
    pieces.push({ file: String.fromCharCode(startCode + file), rank: rank, type: king, color: black, notation: kingNotation });
    //Setting black queen
    file = 4;
    pieces.push({ file: String.fromCharCode(startCode + file), rank: rank, type: queen, color: black, notation: queenNotation });

    //setting the white pawns
    rank = 2;
    for (file = 0; file < 8; file++) {
        pieces.push({ file: String.fromCharCode(startCode + file), rank: rank, type: pawn, color: white, notation: pawnNotation });
    }
    //setting white rooks
    rank = 1;
    for (file of [0, 7]) {
        pieces.push({ file: String.fromCharCode(startCode + file), rank: rank, type: rook, color: white, notation: rookNotation });
    }
    //Stting white knights
    for (file of [1, 6]) {
        pieces.push({ file: String.fromCharCode(startCode + file), rank: rank, type: knight, color: white, notation: knightNotation });
    }
    //Stting white bishops
    for (file of [2, 5]) {
        pieces.push({ file: String.fromCharCode(startCode + file), rank: rank, type: bishop, color: white, notation: bishopNotation });
    }
    //Setting white king
    file = 3;
    pieces.push({ file: String.fromCharCode(startCode + file), rank: rank, type: king, color: white, notation: knightNotation });
    //Setting white queen
    file = 4;
    pieces.push({ file: String.fromCharCode(startCode + file), rank: rank, type: queen, color: white, notation: queenNotation });



    return pieces;
}

export default gamestate;