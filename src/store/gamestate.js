const black = 'black',
    white = 'white',
    rook = 'rook',
    knight = 'knight',
    bishop = 'bishop',
    queen = 'queen',
    king = 'king',
    pawn = 'pawn',
    startCode = 65;



let gamestate = {
    chess: { board: createBoard(), pieces: setPieces()}
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
        pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: pawn, color: black });
    }
    //setting black rooks
    col = 8;
    for (row of [0, 7]) {
        pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: rook, color: black });
    }
    //Stting black knights
    for (row of [1, 6]) {
        pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: knight, color: black });
    }
    //Stting black knights
    for (row of [2, 5]) {
        pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: bishop, color: black });
    }
    //Setting black king
    row = 3;
    pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: king, color: black });
    //Setting black queen
    row = 4;
    pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: queen, color: black });

    //setting the white pawns
    col = 2;
    for (row = 0; row < 8; row++) {
        let piece = { row: String.fromCharCode(startCode + row), col: col, type: pawn, color: white };
        pieces.push(piece);
    }
    //setting white rooks
    col = 1;
    for (row of [0, 7]) {
        pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: rook, color: white });
    }
    //Stting white knights
    for (row of [1, 6]) {
        pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: knight, color: white });
    }
    //Stting white knights
    for (row of [2, 5]) {
        pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: bishop, color: white });
    }
    //Setting white king
    row = 3;
    pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: king, color: white });
    //Setting white queen
    row = 4;
    pieces.push({ row: String.fromCharCode(startCode + row), col: col, type: queen, color: white });



    return pieces;
}

export default gamestate;