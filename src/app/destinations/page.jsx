import React from 'react'
import DestinationCard from '@/components/ui/DestinationCard'

const DestinationPage = async() => {
  const res = await fetch('http://localhost:5000/destination')
  const destinations = await res.json()
  
  return (
    <div>
      <h1 className="text-2xl font-bold my-6">All Destinations</h1>
      
      <div>
        {destinations.map((destination) => <DestinationCard key={destination._id} destination={destination}/>)}
      </div>
    </div>
  )
}

export default DestinationPage