import { useEffect, useState } from 'react';
import {
  useInjectKakaoMapApi,
  Map as KakaoMap,
  MapMarker,
} from 'react-kakao-maps-sdk';

import { LatLng } from 'kakao-maps';
import { Response } from 'response';

import { useQuery } from '@tanstack/react-query';

import ky from 'ky';

interface MapProps {
  filters: string[];
}

type Room = {
  id: number;
  coords: LatLng;
};

const Map = ({ filters }: MapProps) => {
  const { loading } = useInjectKakaoMapApi({
    appkey: import.meta.env.VITE_KAKAO_MAP_KEY,
    libraries: ['services'],
  });
  const [{ lat, lng }, setLatLng] = useState<LatLng>({ lat: 0, lng: 0 });
  const { data } = useQuery<Response<Room[]>>({
    queryKey: ['real-estates', lat, lng],
    queryFn: () =>
      ky.get(`/api/real-estates?latitude=${lat}&longitude=${lng}`).json(),
  });

  const onMarketClick =
    ({ id, coords }: Room) =>
    async () => {
      console.log('room id:', id);
      console.log('search position:', coords);
      console.log('with filters:', filters);
    };
  const onMapDragEnd = (map: kakao.maps.Map) => {
    const center = map.getCenter();
    setLatLng({ lat: center.getLat(), lng: center.getLng() });
  };

  useEffect(() => {
    if (loading) return;
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch('서울 노원구 노해로 437', (result, status) => {
      if (status !== kakao.maps.services.Status.OK) return;
      console.log(result);
      setLatLng({ lat: +result[0].y, lng: +result[0].x });
    });
  }, [loading]);

  return !loading ? (
    <KakaoMap
      center={{ lat, lng }}
      level={3}
      className="h-full"
      onDragEnd={onMapDragEnd}
    >
      {data?.data.map((room, index) => (
        <MapMarker
          position={room.coords}
          key={index}
          onClick={onMarketClick(room)}
        ></MapMarker>
      ))}
    </KakaoMap>
  ) : null;
};

export default Map;
