import React, { Component } from 'react'
// import { contactService } from '../services/contactService'
import { ContactFilter } from '../components/ContactFilter'
import { ContactList } from '../components/ContactList'
// connect is a function that returns a high order component, coming from react-redux
import { connect } from 'react-redux'
import { loadContacts, removeContact, setFilterBy } from '../store/actions/contactActions'
import { loadUser } from '../store/actions/userActions'


class _ContactPage extends Component {

    async componentDidMount() {
        this.props.loadContacts()
        await this.loadUser()
    }

    async loadUser() {
        await this.props.loadUser()
    }

    onSelectContactId = (contactId) => {
        this.setState({ selectedContactId: contactId })
    }

    onRemoveContact = async (contactId) => {
        this.props.removeContact(contactId)
    }

    onChangeFilter = (filterBy) => {
        this.props.setFilterBy(filterBy)
        this.props.loadContacts()
    }

    render() {
        const { contacts } = this.props
        if (!contacts) return <div>Loading...</div>
        return (
            <section className="Contact-page">
                <ContactFilter onChangeFilter={this.onChangeFilter} />
                <ContactList onRemoveContact={this.onRemoveContact} contacts={contacts} />
            </section>
        )
    }
}

//  יש כאן הרבה שליטה. נבקש איזה מידע אנחנו רוצים מהסטור, למפות את המידע מהסטייט הגלובלי לפרופס של הקומפוננטה הזו.
const mapStateToProps = state => {
    return {
        contacts: state.contactModule.contacts
    }
}

const mapDispatchToProps = {
    loadContacts,
    removeContact,
    setFilterBy,
    loadUser
}

// let's connect to the store:
export const ContactPage = connect(mapStateToProps, mapDispatchToProps)(_ContactPage)
