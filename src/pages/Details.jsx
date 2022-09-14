import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { TransferFund } from '../components/TransferFund'
import { MovesList } from '../components/MovesList'
import { contactService } from '../services/contactService'
import { connect } from 'react-redux'
import { loadUser, addMove, spendBalance } from '../store/actions/userActions'


class _ContactDetailsPage extends Component {

    state = {
        contact: null,
        fundsToTransfer: ''
    }

    async componentDidMount() {
        this.loadContact()
        // const contactId = this.props.match.params.id
        // const contact = await contactService.getContactById(contactId)
        // this.setState({ contact })
        await this.loadUser()
    }

    async loadUser() {
        await this.props.loadUser()
    }

    async loadContact() {
        const contactId = this.props.match.params.id
        const contact = await contactService.getContactById(contactId)
        this.setState({ contact })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadContact()
        }
    }

    onBack = () => {
        this.props.history.push('/contact')
    }

    onTransferFund = async (ev) => {
        ev.preventDefault()
        const { loggedInUser } = this.props
        const { contact, fundsToTransfer } = this.state
        if (fundsToTransfer > loggedInUser.coins) {
            alert('You only have ' + loggedInUser.coins)
            this.setState({fundsToTransfer: ''})
            return
        }
        if (fundsToTransfer < 0) {
            alert('You cant transfer negative')
            this.setState({fundsToTransfer: ''})
            return
        }
        if (!fundsToTransfer) return;
        this.props.spendBalance(contact, fundsToTransfer)
        this.setState({fundsToTransfer: ''})
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        this.setState({ [field]: value })
    }

    render() {
        const { contact, fundsToTransfer } = this.state
        const { loggedInUser } = this.props
        if (!contact || !loggedInUser) return <div>Loading...</div>
        return (
            <div className='contact-details'>
                <div className="flex space-between">
                    <button onClick={this.onBack}>⏪</button>
                    <Link to={`/contact/edit/${contact._id}`}>✍️</Link>
                </div>
                <img src={`https://robohash.org/${contact._id}`} alt="" />
                <section>
                    <h3>Name: {contact.name}</h3>
                </section>
                <section>
                    <h3>Phone: {contact.phone}</h3>
                </section>
                <section>
                    <h3>Email: {contact.email}</h3>
                </section>
                <TransferFund onTransferFund={this.onTransferFund} fundsToTransfer={fundsToTransfer} handleChange={this.handleChange} contact={contact} />
                <MovesList loggedInUser={loggedInUser} contact={contact} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    loadUser,
    addMove,
    spendBalance
}

export const ContactDetailsPage = connect(mapStateToProps, mapDispatchToProps)(_ContactDetailsPage)