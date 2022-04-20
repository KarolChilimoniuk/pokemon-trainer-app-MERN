const InitialState = {
    hasAccount: false,
    googleAccount: false,
    userId: "",
    userName: "",
    email: "",
    logged: false,
    trainers: [],
    cookie: false,
    error: null,
}

const userReducer = (state = InitialState, action) => {
    switch(action.type) {
        case 'LOGIN_GOOGLE_USER':
            localStorage.setItem('loggedUser', JSON.stringify({...action.payloads}));
            return {
                ...state,
                hasAccount: true,
                googleAccount: true,
                userId: action.payloads.googleId,
                userName: action.payloads.name,
                email: action.payloads.email,
                logged: action.payloads.logged,
            }

        case 'LOGIN_NATIVE_USER_SUCCESS':
            localStorage.setItem('loggedUser', JSON.stringify({...action.payloads}));
            return {
                ...state,
                hasAccount: true,
                userId: action.payloads.userId,
                userName: action.payloads.userName,
                email: action.payloads.email,
                logged: action.payloads.logged,
                trainers: action.payloads.trainers,
            }

        case 'LOGOUT':
            localStorage.clear();
            return {...InitialState};

        case 'HAVING_ACCOUNT_HANDLER':
            return {
                ...state,
                hasAccount: !state.hasAccount
            }

        case 'UPDATE_USER_DATA':
            localStorage.setItem('loggedUser', JSON.stringify({...action.payloads}));
            return {
                ...state,
                trainers: action.payloads.trainers,
            }

        case 'NEW_SESSION':
            return {
                ...state,
                logged: action.payloads.logged,
                cookie: action.payloads.cookieStatus,
            }

        default:
            return {
                ...state
            }
    }
}

export default userReducer;