import { connect } from 'react-redux';
import TicTacToeComponent from './TicTacToeComponent';
import { roomOperations } from '../loading_room/duck';

const mapStateToProps = (state) => {
    return {
        finished: state.tic.game.finished,
        opponent: state.room.room.opponent,
        isTurn: state.room.room.players.length === 2 ? (state.room.room.players[state.room.room.currentPlayerIndex].username === state.home.auth.user.username) : false,
        queued: state.home.socket.queued
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        leave: () => {
            dispatch(roomOperations.leave());
        }
    }
}

const TicTacToeContainer = connect(mapStateToProps, mapDispatchToProps)(TicTacToeComponent);
export default TicTacToeContainer;