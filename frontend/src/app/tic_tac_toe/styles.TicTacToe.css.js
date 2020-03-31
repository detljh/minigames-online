let styles = {
    page: {
        width: '100%',
        minHeight: '100%',
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    disabledPage: {
        width: '100%',
        minHeight: '100%',
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '10',
        position: 'absolute',
        finished: {
            backgroundColor: 'hsla(0, 0%, 50%, 0.5)',
        }
    },
    prompt: {
        backgroundColor: 'white',
        width: '30%',
        height: '30%',
        promptButtonWrapper: {
            display: 'flex',
            button: {
                cursor: 'pointer'
            }
        }
    },
    game: {
        width: '35vw',
        height: 'calc(35vw)',
        display: 'grid',
        gridTemplate: 'repeat(3, minmax(0, 1fr)) / repeat(3, minmax(0, 1fr))',
        gridGap: '1px',
        backgroundColor: 'black',
    }
}

export default styles;