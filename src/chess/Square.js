import React from 'react'
import styled from 'styled-components'

import whitepawn from '../images/whitepawn.png'
import blackpawn from '../images/blackpawn.png'
import whiterook from '../images/whiterook.png'
import blackrook from '../images/blackrook.png'
import whitebishop from '../images/whitebishop.png'
import blackbishop from '../images/blackbishop.png'
import whiteknight from '../images/whiteknight.png'
import blackknight from '../images/blackknight.png'
import whitequeen from '../images/whitequeen.png'
import blackqueen from '../images/blackqueen.png'
import whiteking from '../images/whiteking.png'
import blackking from '../images/blackking.png'

const pieces = {
    whitepawn:whitepawn,
    blackpawn:blackpawn,
    whiterook:whiterook,
    blackrook:blackrook,
    whitebishop:whitebishop,
    blackbishop:blackbishop,
    whiteknight:whiteknight,
    blackknight:blackknight,
    whitequeen:whitequeen,
    blackqueen:blackqueen,
    whiteking:whiteking,
    blackking:blackking,
}

const StyledSquare = styled.div`
    width:100px;
    height:100px;
    float:left;
    background-color: ${props => props.color};
`

const Piece = styled.img`
    width:100px;
    height:100px;
`

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let piece = null;
        if(this.props.piece){
            piece = this.props.piece.color + this.props.piece.type;
        }
        return (
            <StyledSquare color={this.props.color}>
                {null != piece &&
                    <Piece src={pieces[piece]} />
                }
            </StyledSquare>
        )
    }

}   

export default Square;