import { getBottomNavigationUtilityClass } from '@mui/material';
import { React, createContext, useReducer, useContext } from 'react';

function userReducer(state, action){
    switch (action.type) {
        case ('USER_CHANGED') : {
            return {
                username: action.username,
                email: action.email,
            };
        }
        default: {
            throw Error('User Reducer: Unknown action type ' + action.type);
        }
    }
}

const UserContext = createContext(null);
const UserDispatchContext = createContext(null);


export function UserContextProvider({ children }){

    const [user, userDispatch] = useReducer(userReducer, {
        username: 'default',
        email: 'default',
    });

    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={userDispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    );

}

export function useUser(){
    return useContext(UserContext);
}

export function useDispatchUser(){
    return useContext(UserDispatchContext);
}

export default UserContextProvider;