import React from 'react'

export function TransferFund({ contact, onTransferFund, handleChange, fundsToTransfer }) {
    return (
        <section className='TransferFunds' >
            <div className='title'>Transfer coins to {contact.name}:</div>
            <form onSubmit={onTransferFund}>
                <input type="number" name="fundsToTransfer" onChange={handleChange} value={fundsToTransfer} />
                <button>Transfer</button>
            </form>
        </section>
    )
}
