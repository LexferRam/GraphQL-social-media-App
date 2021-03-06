import { createContext, useContext, useReducer } from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
    user:null
}

if(sessionStorage.getItem('jwtToken')){
    const decodedToken = jwtDecode(sessionStorage.getItem('jwtToken'))

    if(decodedToken.exp * 1000 < Date.now()){
        sessionStorage.removeItem('jwtToken')
    }else{
        initialState.user = decodedToken;
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => { },
    logout: () => { }
})

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}

function AuthProvider(props) {

    const [state, dispatch] = useReducer(authReducer, initialState)

    function login(userData){
        sessionStorage.setItem("jwtToken", userData.token)
        dispatch({
            type:'LOGIN',
            payload: userData
        })
    }

    function logout(){
        sessionStorage.removeItem("jwtToken")
        dispatch({
            type:'LOGOUT'
        })
    }

    return <AuthContext.Provider value={{user: state.user, login, logout}} {...props} />
}

const useAuthContext = () => useContext(AuthContext)

export {useAuthContext, AuthProvider}