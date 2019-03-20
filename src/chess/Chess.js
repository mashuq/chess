import React from 'react'
import { connect } from 'react-redux'
import Square from './Square'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChessBoard = styled.div`
    width:720px;
    height:720px;
    margin:auto;
    border: 1px solid black;
`

class Chess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        if(this.props.chess.error){
            toast(this.props.chess.error);                    
        }
        return (            
            <div>
                <ChessBoard>
                    {this.props.chess.board.map((value, index) => {
                        let piece = this.props.chess.pieces.filter(obj => {
                            return obj.row == value.row && obj.col == value.col;
                        })
                        return <Square square={value} piece={piece[0]} key={value.id} />
                    })}
                </ChessBoard>
                <ToastContainer autoClose={2000} toastClassName="dark-toast"/>
            </div>
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