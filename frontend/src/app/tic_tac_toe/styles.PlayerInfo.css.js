import global from '../styles.global.css';

let style = {
    playerInfo: {
        boxShadow: '0 0 3px 1px white',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '5px',
        opacity: '0.5',
        transition: 'all 0.5s',
        turn: {
            opacity: '1',
            transition: 'all 0.5s'
        }
    },
    turnIndicator: {
        playerOne: {
            color: global.playerOneColor
        },
        playerTwo : {
            color: global.playerTwoColor
        }
    }
}

export default style;