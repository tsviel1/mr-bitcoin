import React from 'react'

export function MovePreview({ move, to }) {
  let date = new Date(move.at)
  return (
    <section className='move-preview'>
      {to ? <p className='first'>To: {to}</p> : ''}
      <p>At: {date.toLocaleString('en-GB')}</p>
      <p>Amount: {move.amount}</p>
    </section>
  )
}
