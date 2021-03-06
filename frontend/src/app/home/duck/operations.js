import Creators from './actions';
import axios from 'axios';
import setAuthToken from "../../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import sActions from '../../../socket/actions';
import history from '../../../history';

const hideLoginForm = Creators.hideLoginForm;
const hideRegisterForm = Creators.hideRegisterForm;
const setConnection = Creators.setConnection;
const updateUsersOnline = Creators.updateUsersOnline;
const setQueue = Creators.setQueue;

const showLoginForm = () => {
    return (dispatch) => {
        dispatch(Creators.errors({}));
        dispatch(Creators.showLoginForm());
    }
}
const showRegisterForm = () => {
    return (dispatch) => {
        dispatch(Creators.errors({}));
        dispatch(Creators.showRegisterForm());
    }
}

const login = (username, password) => {
    return (dispatch) => {
        axios.post('/api/login', { 
            username: username, 
            password: password
        }).then(res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(Creators.hideLoginForm());
            dispatch(Creators.setCurrentUser(decoded, true));
            dispatch(sActions.sAuth(decoded));
        })
        .catch(err => {
            dispatch(Creators.errors(err.response.data));
        });
    }
}

const register = (username, password, confirmPassword) => {
    return (dispatch) => {
        axios.post('/api/register', { 
            username: username, 
            password: password,
            confirmPassword: confirmPassword
        }).then(res => {
            dispatch(Creators.showLoginForm());
        })
        .catch(err => {
            dispatch(Creators.errors(err.response.data));
        });
    }
}

const logout = () => {
    return (dispatch) => {
        localStorage.removeItem("jwtToken");
        setAuthToken(false);
        dispatch(Creators.setCurrentUser({}, false));
        dispatch(sActions.sAuth({}));
    }
}

const joinQueue = (gameType) => {
    return (dispatch, getState) => {
        dispatch(Creators.setQueue(true, gameType));
        dispatch(sActions.sJoinQueue({ gameType: gameType, username: getState().home.auth.user.username }));
        history.push(`/room`);
    }   
}

const setGuestId = (username) => {
    return (dispatch) => {
        dispatch(Creators.setCurrentUser({ username: username }, false));
    }
}

export default {
    showLoginForm,
    showRegisterForm,
    hideLoginForm,
    hideRegisterForm,
    setQueue,
    login,
    register,
    logout,
    joinQueue,
    setConnection,
    updateUsersOnline,
    setGuestId
}