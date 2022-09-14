import { Component } from 'react'
import { contactService } from '../services/contactService'

export class ContactEdit extends Component {
    state = {
        contact: null
    }

    async componentDidMount() {
        const contactId = this.props.match.params.id
        const contact = contactId ? await contactService.getContactById(contactId) : contactService.getEmptyContact()
        this.setState({ contact })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        this.setState(prevState => ({ contact: { ...prevState.contact, [field]: value } }))
    }

    onSaveContact = async (ev) => {
        ev.preventDefault()
        await contactService.saveContact({ ...this.state.contact })
        this.props.history.push('/contact')
    }

    inputRefFunc = (elInput) => {
        elInput && elInput.focus()
    }

    onBack = () => {
        const id = this.state.contact._id
        id ? this.props.history.push(`/contact/${id}`) : this.props.history.push('/contact')
    }

    onRemoveContact = async () => {
        await contactService.deleteContact(this.state.contact._id)
        this.props.history.push('/contact/')
    }

    render() {
        const { contact } = this.state
        if (!contact) return <div>Loading...</div>

        return (
            <section className="contact-edit">
                {/* <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1> */}
                <div className="navigation flex space-between">
                    <button onClick={this.onBack} className="simple-button">⏪</button>
                    {contact._id && <button onClick={this.onRemoveContact} className="simple-button">🗑</button>}
                </div>
                <img src={`https://robohash.org/${contact._id}`} alt="" />
                <form onSubmit={this.onSaveContact}>
                    <label htmlFor="name">Name</label>
                    <input ref={this.inputRefFunc} value={contact.name} onChange={this.handleChange} type="text" name="name" id="name" />
                    <label htmlFor="email">Email</label>
                    <input value={contact.email} onChange={this.handleChange} type="text" name="email" id="email" />
                    <label htmlFor="phone">Phone</label>
                    <input value={contact.phone} onChange={this.handleChange} type="text" name="phone" id="phone" />
                    <button>Save</button>

                </form>
            </section>

        )
    }
}
