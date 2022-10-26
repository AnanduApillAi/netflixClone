import React from 'react'
import CastCrewCard from '../castcrewCard/CastCrewCard'

function Cast({cast}) {
  return (
    <div>
        <CastCrewCard item={cast}></CastCrewCard>
    </div>
  )
}

export default Cast