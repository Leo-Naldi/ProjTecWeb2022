import { React, createContext, useReducer, useContext } from 'react';

function accountReducer(state, action){
    switch (action.type) {
        case ('USER_CHANGED') : {
            return {
                username: action.username,
                email: action.email,
            };
        }
        case ('ADD_ANIMAL') : {
            return {
                ...state,
                animals: [action.animal, ...state.animals],
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

    const [user, accountDispatch] = useReducer(accountReducer, {
        username: 'default',
        email: 'default',
        animals: [],
    });

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