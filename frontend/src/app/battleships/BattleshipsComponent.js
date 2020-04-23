import React from 'react';
import history from '../../history';
import Radium from 'radium';
import GameHeaderContainer from '../utils/GameHeaderContainer';
import styles from './styles.Battleships.css';
import GameContainer from './GameContainer';
import ShipArrangeContainer from './ShipArrangeContainer';

class BattleshipsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.queued) {
            //history.push('/');
        }
    }

    componentWillUnmount() {
        //this.props.leave();
    }

    render() {
        return (
            <div style={styles.page}>
                <GameHeaderContainer />

                <div style={styles.main}>
                    {
                        this.props.shipArrangeScreen ?
                        <ShipArrangeContainer /> :
                        <GameContainer />
                    }
                </div>
            </div>
        )
    }
}

export default Radium(BattleshipsComponent);