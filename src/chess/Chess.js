import React from 'react'
import { connect } from 'react-redux'
import Square from './Square'
import styled from 'styled-components'

const ChessBoard = styled.div`
    width:800px;
    height:800px;
    float:left; 
    border: 1px solid black;
`

class Chess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <ChessBoard>
                {this.props.chess.board.map((value, index) => {
                    let piece = this.props.chess.pieces.filter(obj => {
                        return obj.row == value.row && obj.col == value.col;
                    })   
                    return <Square row={value.row} col={value.col} color={value.color} piece={piece[0]} key={value.id} id={value.id} />
                })}
            </ChessBoard>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        chess: state.chessReducer.chess,
    }
}

export default connect(
    mapStateToProps,
    {}
)(Chess)