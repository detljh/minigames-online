import { connect } from 'react-redux';
import BattleshipsComponent from './BattleshipsComponent';
import { roomOperations } from '../loading_room/duck';

const mapStateToProps = (state) => {
    return {
        finished: state.tic.game.finished,
        opponent: state.room.room.opponent,
        isTurn: state.room.room.players.length === 2 ? (state.room.room.players[state.room.room.currentPlayerIndex].username === state.home.auth.user.username) : false,
        shipArrangeScreen: state.bs.game.shipArrangeScreen,
        queued: state.home.socket.queued,
        playerOneState: state.bs.game.playerOneState,
        playerTwoState: state.bs.game.playerTwoState,
        finishedShipArrange: state.bs.arrange.finishedShipArrange,
        alert: state.room.ui.alert
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        leave: () => {
            dispatch(roomOperations.leave());
        }
    }
}

const BattleshipsContainer = connect(mapStateToProps, mapDispatchToProps)(BattleshipsComponent);
export default BattleshipsContainer;