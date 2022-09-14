import React from 'react'
import { MovePreview } from './MovePreview'

export function MovesList({ loggedInUser, contact }) {

  const releventMoves = loggedInUser.moves.filter(move => move.toId === contact?._id)
  const lastThreeeMoves = loggedInUser.moves.slice(-3).sort((a,b) => b.at - a.at)
  if (!contact) return (
    <section className='MovesList center'>
      <div className='title'>Your last 3 moves:</div>
      {lastThreeeMoves.length ? lastThreeeMoves.map(move => <MovePreview key={move.moveId} move={move} to={move.to} />) : <div>no moves yet</div>}
    </section>
  )
  return (
    <section className='MovesList'>
      <div className='title'>Your moves:</div>
      {releventMoves.length ? releventMoves.map(move => <MovePreview key={move.moveId} move={move} />) : <div>no moves yet</div>}
    </section>
  )
}
