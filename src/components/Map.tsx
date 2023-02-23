import {
  useInjectKakaoMapApi,
  Map as KakaoMap,
  MapMarker,
} from 'react-kakao-maps-sdk';

import type { LatLng } from 'kakao-maps';

interface MapProps {
  rooms?: LatLng[];
  filters: string[];
}

const Map = ({ rooms, filters }: MapProps) => {
  const { loading } = useInjectKakaoMapApi({
    appkey: import.meta.env.VITE_KAKAO_MAP_KEY,
    libraries: ['services'],
  });

  const onMarketClick = (markerPos: LatLng) => async () => {
    console.log('search position:', markerPos);
    console.log('with filters:', filters);
  };

  return !loading ? (
    <KakaoMap
      center={{ lat: 33.450701, lng: 126.570667 }}
      level={3}
      className="h-full"
    >
      {rooms?.map((position, index) => (
        <MapMarker
          position={position}
          key={index}
          onClick={onMarketClick(position)}
        ></MapMarker>
      ))}
    </KakaoMap>
  ) : null;
};

export default Map;
