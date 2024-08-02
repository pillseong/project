import React, { useState, useEffect } from 'react';
import headersty from './header.module.css';
import useGeoLocation from '../GPS/Gps';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

function Footer() {
  const [address, setAddress] = useState("");
  const { location, address: geoAddress, error } = useGeoLocation(geolocationOptions);

  useEffect(() => {
    if (geoAddress) {
      const locationName = geoAddress.city || geoAddress.town || geoAddress.village || geoAddress.county;
      setAddress(locationName);
    }
  }, [geoAddress]);

  return (
    <div className={headersty.responsive_container}>
      <div className={headersty.header_container}>
        <div className={headersty.healing}>휴식이 필요한 오늘 같은 날</div>
        <div className={headersty.read_container}>
          <div className={headersty.address}>현위치 : {address}</div>
          <div className={headersty.read}>여행 준비 중</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;