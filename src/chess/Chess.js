import React from 'react'
import { connect } from 'react-redux'
import { move } from '../actions/chessActions'

class Chess extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }    

    render() {
        return (
            <div>{this.props.chess.board}
            <button onClick={this.props.doMove}>Increment</button>
            </div>
        )
    }

}



const mapStateToProps = (state) => {
    console.log(6);
    return {
        chess : state.chessReducer.chess,
    }
}

const mapDispatchToProps = (dispatch) => ({
    doMove: () => dispatch(move('x'))
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chess)