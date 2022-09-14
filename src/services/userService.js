import { storageService } from "./storageService"

export const userService = {
    getLoggedInUser,
    signup,
    addMove
}

const STORAGE_KEY = 'loggedInUser'

function getLoggedInUser() {
    const user = storageService.load(STORAGE_KEY)
    return user
}

function signup(name) {
    const user = {
        name,
        coins: 100,
        moves: []
    }
    storageService.store(STORAGE_KEY, user)
}

function addMove(contact, amount) {
    return new Promise((resolve, reject) => {
        const move = {
            toId: contact._id,
            to: contact.name,
            at: Date.now(),
            amount,
            moveId: _makeId()
        }
        const user = getLoggedInUser()
        user.moves.push(move)
        user.coins -= amount
        storageService.store(STORAGE_KEY, user)
        const moves = user.moves
        resolve(moves)
    })
}

function _makeId(length = 10) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}