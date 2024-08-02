import { useState, useEffect } from 'react'

const useGeoLocation = (options = {}) => {
  const [location, setLocation] = useState(null)
  const [address, setAddress] = useState(null)
  const [error, setError] = useState('')

  const handleSuccess = async (pos) => {
    const { latitude, longitude } = pos.coords
    setLocation({ latitude, longitude })

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`)
      const data = await response.json()
      setAddress(data.address)
    } catch (err) {
      setError('Failed to get address')
    }
  }

  const handleError = (err) => {
    setError(err.message)
  }

  useEffect(() => {
    const { geolocation } = navigator

    if (!geolocation) {
      setError('Geolocation is not supported.')
      return
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, options)
  }, [options])

  return { location, address, error }
}

export default useGeoLocation