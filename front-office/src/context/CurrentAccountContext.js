import { React, createContext, useReducer, useContext, useEffect, useState } from 'react';

function accountReducer(state, action){

    switch (action.type) {
        case ('USER_CHANGED') : {
            return {
                username: action.username,
                email: action.email,
                pets: [...action.pets],
            };
        }
        case ('ADD_PET') : {
            return {
                ...state,
                pets: [action.pet, ...state.pets],
            };
        }
        default: {
            throw Error('User Reducer: Unknown action type "' + action.type + '"');
        }
    }
}

const AccountContext = createContext(null);
const AccountDispatchContext = createContext(null);
const TokenContext = createContext(null);
const SetTokenContext = createContext(null);


export function AccountContextProvider({ children }){

    //const [user, accountDispatch] = useReducer(accountReducer, default_user);
    //const credentials = useCredentials();
    
    const default_user = {
        username: 'default',
        email: 'default',
        pets: [],
    };

    const getInitialUser = () => {
        const userStorage = sessionStorage.getItem('user');
        const userNew = JSON.parse(userStorage);

        console.log(userNew)

        return userNew?.user;
    };

    const getInitialToken = () => {
        const storageToken = sessionStorage.getItem('token');

        console.log(storageToken);

        const tokenNew = JSON.parse(storageToken);

        console.log(tokenNew)

        return tokenNew?.token;
    };

    const [user, accountDispatch] = useReducer(accountReducer, 
        getInitialUser() || null);
    
    const [token, setToken] = useState(getInitialToken || null); // cos undefined is for plebs

    // When user/token are changed the new values are saved into memory,
    // Yes this runs at render no its not needed no i dont care
    useEffect(() => {
        token && sessionStorage.setItem('token', JSON.stringify({ 'token': token }));
        user && sessionStorage.setItem('user', JSON.stringify({ 'user': user }));
    }, [user, token]);


    return (
        <AccountContext.Provider value={user}>
            <AccountDispatchContext.Provider value={accountDispatch}>
                <TokenContext.Provider value={token}>
                    <SetTokenContext.Provider value={setToken}>
                        {children}
                    </SetTokenContext.Provider>
                </TokenContext.Provider>
            </AccountDispatchContext.Provider>
        </AccountContext.Provider>
    );

}

export function useAccount(){
    return useContext(AccountContext);
}

export function useDispatchAccount(){
    return useContext(AccountDispatchContext);
}

export function useToken() {
    return useContext(TokenContext);
}

export function useSetToken() {
    return useContext(SetTokenContext);
}

export default AccountContextProvider;