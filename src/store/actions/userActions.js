import { userService } from "../../services/userService"

export function spendBalance(contact, amount) {
    return async (dispatch) => {
        try {
            const moves = await userService.addMove(contact, amount)
            dispatch({type: 'SPEND_BALANCE', amount, moves})
        } catch (error) {
            console.log('error:', error);
        }
    }
}

export function loadUser() {
    return async (dispatch) => {
        try {
            const user = await userService.getLoggedInUser()
            dispatch({type: 'LOAD_USER', user})
        } catch (error) {
            console.log('error:', error);
        }
    }
}

export function addMove(move) {
    return async (dispatch) => {
        try {
            dispatch({type: 'ADD_MOVE', move})
        } catch (error) {
            console.log('error:', error);
        }
    }
}
