import { connect } from 'react-redux';
import TicTacToeComponent from './TicTacToeComponent';
import { ticOperations } from './duck';

const mapStateToProps = (state) => {
    return {
        players: state.loading.players
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

const TicTacToeContainer = connect(mapStateToProps, mapDispatchToProps)(TicTacToeComponent);
export default TicTacToeContainer;