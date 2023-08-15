import React from 'react'

//pokemon is a prop
export default function PokemonList({ pokemon }) {
    //need key any time you loop in react code
  return (
    <div>
        {pokemon.map(p => (
            <div key={p}>{p}</div>
        ))}
    </div>
  )
}
