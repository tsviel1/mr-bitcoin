import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class ContactFilter extends Component {
    state = {
        term: ''
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState({ [field]: value }, () => {
            this.props.onChangeFilter({ ...this.state })
        })
    }
    render() {
        const { term } = this.state

        return (
            <section className="contact-filter">
                <form>
                    <section>
                        <input value={term} onChange={this.handleChange} type="text" name='term' />
                    </section>
                </form>
                <div className='round-btn'><Link to="/contact/edit">Add contact</Link></div>
                
            </section>

        )
    }
}
