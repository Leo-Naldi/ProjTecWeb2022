export function accountReducer(state, action) {

    switch (action.type) {
        case ('USER_CHANGED'): {
            return {
                username: action.username,
                email: action.email,
                pets: [...action.pets],
            };
        }
        case ('ADD_PET'): {
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

export default accountReducer;