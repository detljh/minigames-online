import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import './transitions.scss';
import styles from './styles.PlayerInfo.css';
import Radium from 'radium';

class PlayerInfoComponent extends React.Component {
    render() {
        let playerInfoStyle = Object.assign({}, styles.playerInfo,
            this.props.isTurn && styles.playerInfo.turn  
        );
        let turnIndicatorStyle = Object.assign({}, styles.turnIndicator,
            (this.props.isTurn && this.props.currentIcon === 'x') ? styles.turnIndicator.playerOne : this.props.isTurn ? styles.turnIndicator.playerTwo : styles.turnIndicator.playerOne
        );
        return (
            <div style={playerInfoStyle}>                    
                {this.props.name}
                <CSSTransition
                    in={ this.props.isTurn }
                    appear={ true }
                    timeout={ 1000 }
                    classNames="fade"
                    unmountOnExit>
                    {
                        <div style={turnIndicatorStyle}><FontAwesomeIcon icon={faChevronUp} /></div>

                    }
                </CSSTransition>
            </div>
        )
    }
}

export default Radium(PlayerInfoComponent);