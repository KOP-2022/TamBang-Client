import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.type = 'text/javascript';
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_KEY
    }&autoload=false`;
    document.head.appendChild(mapScript);

    const onLoad = () => {
      window.kakao.maps.load(() => {
        const { LatLng, Map, Marker } = window.kakao.maps;
        const options = {
          center: new LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new Map(mapRef.current, options);
        const markerPosition = new LatLng(33.450701, 126.570667);
        const marker = new Marker({ position: markerPosition });
        marker.setMap(map);
      });
    };
    mapScript.addEventListener('load', onLoad);
    return () => {
      mapScript.removeEventListener('load', onLoad);
      document.head.removeChild(mapScript);
    };
  }, []);
  return <div ref={mapRef} className="h-full"></div>;
};

export default Map;
