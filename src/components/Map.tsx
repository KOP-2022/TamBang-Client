import { Fragment, useEffect, useState } from 'react';
import {
  useInjectKakaoMapApi,
  Map as KakaoMap,
  MapMarker,
  CustomOverlayMap,
} from 'react-kakao-maps-sdk';

import { LatLng } from 'kakao-maps';
import { Facility, Response, Room, RoomDetail } from 'response';

import { faBuilding } from '@fortawesome/free-solid-svg-icons/faBuilding';
import { faSquare } from '@fortawesome/free-solid-svg-icons/faSquare';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';

import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import BottomSheet from './BottomSheet';

import { api } from '@/libs/api';

interface MapProps {
  filters: string[];
}

const RADIUS = [0, 100, 300, 500, 700, 900, 1200] as const;

const Map = ({ filters }: MapProps) => {
  const { loading } = useInjectKakaoMapApi({
    appkey: import.meta.env.VITE_KAKAO_MAP_KEY,
    libraries: ['services'],
  });
  const [{ lat, lng }, setLatLng] = useState<LatLng>({ lat: 0, lng: 0 });
  const [mapLevel, setMapLevel] = useState(3);
  const { data } = useQuery<Response<Room[]>>({
    queryKey: ['real-estates', lat, lng, RADIUS[mapLevel]],
    queryFn: () =>
      api
        .get(`map?latitude=${lat}&longitude=${lng}&radius=${RADIUS[mapLevel]}`)
        .json(),
  });
  const [id, setId] = useState<number>();
  const { data: facilityData, refetch } = useQuery<Response<Facility[]>>({
    queryKey: ['facilities', id],
    queryFn: () => api.get(`real-estates/${id}/facilities`).json(),
    enabled: false,
  });
  const { data: roomDetail, refetch: roomDetailRefetch } = useQuery<RoomDetail>(
    {
      queryKey: ['real-estates', id],
      queryFn: () => api.get(`real-estates/${id}`).json(),
      enabled: false,
    }
  );
  const [infoOpen, setInfoOpen] = useState<{ [key: number]: boolean }>({});

  const onMarketClick =
    ({ id, latitude, longitude }: Room) =>
    async () => {
      console.log('room id:', id);
      console.log('search position:', latitude, longitude);
      console.log('with filters:', filters);
      setId(id);
    };
  const onMapDragEnd = (map: kakao.maps.Map) => {
    const center = map.getCenter();
    setLatLng({ lat: center.getLat(), lng: center.getLng() });
  };
  const onZoomChange = (map: kakao.maps.Map) => {
    const level = map.getLevel();

    if (level <= RADIUS.length - 1) {
      setMapLevel(level);
    }
  };

  useEffect(() => {
    if (loading) return;
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch('서울특별시 노원구 광운로 20', (result, status) => {
      if (status !== kakao.maps.services.Status.OK) return;
      setLatLng({ lat: +result[0].y, lng: +result[0].x });
    });
  }, [loading]);
  useEffect(() => {
    if (id) {
      refetch();
      roomDetailRefetch();
    }
  }, [id, refetch, roomDetailRefetch]);

  return !loading ? (
    <>
      <KakaoMap
        center={{ lat, lng }}
        level={3}
        className="h-full"
        onDragEnd={onMapDragEnd}
        onZoomChanged={onZoomChange}
      >
        {data?.data.map((room, index) => (
          <MapMarker
            position={{ lat: room.latitude, lng: room.longitude }}
            key={index}
            onClick={onMarketClick(room)}
          ></MapMarker>
        ))}
        {facilityData?.data.map((facility, index) => (
          <Fragment key={index}>
            <MapMarker
              position={{ lat: facility.latitude, lng: facility.longitude }}
              image={{
                src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png',
                size: { width: 22, height: 26 },
                options: {
                  spriteOrigin: { x: 10, y: 36 },
                  spriteSize: { width: 36, height: 98 },
                },
              }}
              onClick={() =>
                setInfoOpen((prev) => ({ ...prev, [index]: true }))
              }
            ></MapMarker>
            {infoOpen[index] && (
              <CustomOverlayMap
                position={{ lat: facility.latitude, lng: facility.longitude }}
                yAnchor={1.4}
              >
                <div className="relative flex flex-col rounded bg-white p-4 border text-sm">
                  <a
                    href={facility.placeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline font-bold text-lg underline-offset-2"
                  >
                    {facility.placeName}
                  </a>
                  <span>{facility.roadAddressName}</span>
                  <button
                    className="absolute right-2 top-1"
                    onClick={() =>
                      setInfoOpen((prev) => ({ ...prev, [index]: false }))
                    }
                  >
                    <FontAwesomeIcon icon={faXmark} size="xl" />
                  </button>
                </div>
              </CustomOverlayMap>
            )}
          </Fragment>
        ))}
      </KakaoMap>
      {roomDetail && (
        <BottomSheet>
          <Swiper
            modules={[Virtual]}
            slidesPerView={1}
            virtual
            className="w-full"
          >
            <SwiperSlide virtualIndex={1}>
              <img src="/home-banner.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide virtualIndex={2}>
              <img src="/home-banner.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide virtualIndex={3}>
              <img src="/home-banner.jpg" alt="image" />
            </SwiperSlide>
          </Swiper>
          <div className="flex flex-col p-4 gap-6">
            <div className="flex flex-col">
              <span className="text-sm text-grey">
                {roomDetail.address.sigungu} {roomDetail.address.roadName}
              </span>
              <span className="text-xl font-bold">
                {roomDetail.buildInfo.monthlyPay !== null &&
                  `월세 ${roomDetail.buildInfo.deposit.toLocaleString()}/
                  ${roomDetail.buildInfo.monthlyPay.toLocaleString()}`}
                {roomDetail.buildInfo.price !== null &&
                  `${
                    roomDetail.buildInfo.dealType
                  } ${roomDetail.buildInfo.deposit.toLocaleString()}/${roomDetail.buildInfo.price.toLocaleString()}`}
              </span>
              <span className="text-sm text-grey">
                {roomDetail.buildInfo.buildType}
              </span>
            </div>
            <hr className="border-grey2" />
            <span className="font-bold text-sm space-x-1">
              <FontAwesomeIcon
                icon={faSquare}
                size="lg"
                className="text-currentColor w-6"
              />
              <span>
                면적 {roomDetail.buildInfo.area}m<sup>2</sup>
              </span>
            </span>
            <div className="text-sm space-x-1">
              <FontAwesomeIcon
                icon={faBuilding}
                size="lg"
                className="text-currentColor w-6"
              />
              <span>{roomDetail.buildInfo.floor}층</span>
            </div>
            <hr className="border-grey2" />
            <span className="font-bold text-lg">상세 설명</span>
            <span>{roomDetail.description}</span>
          </div>
        </BottomSheet>
      )}
    </>
  ) : null;
};

export default Map;
