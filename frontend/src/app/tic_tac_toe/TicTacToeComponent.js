import React from 'react';
import styles from './styles.TicTacToe.css';
import history from '../../history';
import Square from './SquareContainer';
import PlayerInfoComponent from './PlayerInfoComponent';
import Radium from 'radium';
import ExpireComponent from '../utils/ExpireComponent';
import { CSSTransition } from 'react-transition-group';
import '../transitions.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import HomeButtonComponent from '../utils/HomeButtonComponent';

class TicTacToeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if (!this.props.queued) {
            history.push('/');
        }
    }

    componentWillUnmount() {
        this.props.leave();
    }

    handleClick() {
        this.setState({
            clicked: true
        });
        setTimeout(() => {
            this.setState({
                clicked: false
            });
        }, 1000);
    }

    render() {
        let disabledPage = Object.assign({}, styles.disabledPage, 
            this.props.finished && styles.disabledPage.finished
        );

        return (
            <div style={styles.page}>
                {
                    (!this.props.opponent || (!this.props.finished && !this.props.isTurn)) ?
                    <div style={disabledPage} onClick={() => this.handleClick()}>
                        <ExpireComponent delay={ 1000 }>
                            <CSSTransition
                                in={ this.state.clicked }
                                appear={ true }
                                timeout={ 1000 }
                                classNames="fade"
                                unmountOnExit>
                                <div style={styles.displayAlert}>
                                    {
                                            this.props.opponent ?  
                                            <span>Opponent's Turn</span> : 
                                            <span>Opponent has left</span>
                                    }
                                </div>
                            </CSSTransition>
                        </ExpireComponent>
                    </div> :
                    <CSSTransition
                    in={ this.props.finished }
                    appear={ true }
                    timeout= { 1000 }
                    classNames="fade"
                    unmountOnExit>
                    <div style={disabledPage}>
                        {
                            this.props.finished && 
                            <div style={styles.endGameBlock.alert}>{this.props.endGameText}</div>
                        }
                        <div style={styles.endGameBlock}>   
                            {
                                !this.props.opponent && !this.props.declinePrompt ?
                                <div style={styles.prompt}>
                                    Opponent has left
                                </div> :
                                this.props.resetRequestPrompt ? 
                                <div style={styles.prompt}>
                                    Opponent has requested to play again
                                    <div style={styles.prompt.promptButtonWrapper}>
                                        <button key={`accept_button`} style={styles.prompt.promptButtonWrapper.button} onClick={this.props.acceptReset}>Accept</button>
                                        <button key={`decline_button`} style={styles.prompt.promptButtonWrapper.button} onClick={this.props.declineReset}>Decline</button>
                                    </div>
                                </div> :
                                this.props.waitingResponsePrompt ?
                                <div style={styles.prompt}>
                                    Waiting for a response
                                    <div style={styles.spinner}><FontAwesomeIcon icon={faSpinner} /></div>
                                </div> :
                                this.props.declinePrompt ?
                                <div style={styles.prompt}>
                                    Request declined
                                </div> :
                                this.props.acceptPrompt ? 
                                <div style={styles.prompt}>
                                    Request accepted. Game will start in
                                    <div>{this.props.countdown}</div>
                                </div> :
                                this.props.finished && <button style={styles.prompt.promptButtonWrapper.button} onClick={this.props.reset}>Play again</button>
                            }
                        </div>
                    </div>
                    </CSSTransition>
                }

                <HomeButtonComponent />
                <div style={styles.header}>
                    <PlayerInfoComponent username={this.props.user.username} isTurn={this.props.isTurn } currentIcon={this.props.currentIcon} spin={false}/>
                    {
                        this.props.opponent &&
                        <PlayerInfoComponent username={ this.props.opponent.username} isTurn={!this.props.isTurn} currentIcon={this.props.currentIcon} spin={true} />
                    }
                </div>
                <div style={styles.main}>
                    <div style={styles.game}>
                        {
                            Array.from(new Array(9), (e, index) => 
                            <Square key={`square-${index}`} id={index} />
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Radium(TicTacToeComponent);