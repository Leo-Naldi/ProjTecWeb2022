import { React, createContext, useReducer, useContext } from 'react';

import default_user from '../utils/defaultData';

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


export function AccountContextProvider({ children }){

    const [user, accountDispatch] = useReducer(accountReducer, default_user);
    //const [user, accountDispatch] = useReducer(accountReducer, {
    //    username: 'default',
    //    email: 'default',
    //    pets: [],
    //});



    return (
        <AccountContext.Provider value={user}>
            <AccountDispatchContext.Provider value={accountDispatch}>
                {children}
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

export default AccountContextProvider;