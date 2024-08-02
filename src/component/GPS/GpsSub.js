import useGeoLocation from './Gps'

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
}

const Weather = () => {
  const { location, address, error } = useGeoLocation(geolocationOptions)

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!location) {
    return <div>Loading location...</div>
  }

  return (
    <div>
      <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
      {address && (
        <p>
          Location: {address.city || address.town || address.village || address.county}, 
          {address.state}, {address.country}
        </p>
      )}
    </div>
  )
}

export default Weather