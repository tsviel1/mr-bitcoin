import { contactService } from "../../services/contactService"


export function loadContacts() {
    // מי שיפעיל זה ריאקט רידקס. היא תשלח את הדיספצ׳.
    return async (dispatch, getState) => {
        try {
            const {filterBy} = getState().contactModule
            const contacts = await contactService.getContacts(filterBy)
            dispatch({type: 'SET_CONTACTS', contacts})
        } catch (err) {
            console.log('err: ', err)
        }
    }
}
export function removeContact(contactId) {
    return async (dispatch) => {
        try {
            await contactService.deleteContact(contactId)
            dispatch({type: 'REMOVE_CONTACT', contactId})
        } catch (err) {
            console.log('err: ', err)
        }
    }
}
export function setFilterBy(filterBy) {
    return (dispatch) => {
            dispatch({type: 'SET_FILTER_BY', filterBy})
    }
}