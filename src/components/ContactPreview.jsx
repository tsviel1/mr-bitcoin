import React from 'react'
import { Link } from 'react-router-dom'

export function ContactPreview({ contact, onRemoveContact }) {
    const contactStyle = { backgroundImage: `url(https://robohash.org/${contact._id})` }
    return (
        <section className='main-preview flex align-center space-between'>
            <Link to={`/contact/${contact._id}`} className="info contact-preview m10" style={contactStyle}>
                <h2>{contact.name}</h2>
            </Link>
            <section className="remove m10" onClick={() => onRemoveContact(contact._id)}>
                X
            </section>
        </section>

    )
}
