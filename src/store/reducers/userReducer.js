const INITIAL_STATE = {
    loggedInUser: null
}

export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SPEND_BALANCE':
            const { loggedInUser } = state
            return {
                ...state,
                loggedInUser: {...loggedInUser, coins: loggedInUser.coins - action.amount, moves: action.moves}
            }
        case 'LOAD_USER':
            return {
                ...state,
                loggedInUser: {...action.user}
            }
        case 'ADD_MOVE':
            return {
                ...state,
                loggedInUser: {...loggedInUser, moves: action.move}
            }
        default:
            return state;
    }
}