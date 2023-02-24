declare module 'response' {
  import type { LatLng } from 'kakao-maps';

  export type Response<T = Record<string, never>> = {
    success: boolean;
    message?: string;
    data: T;
  };
  export type Room = {
    id: number;
    coords: LatLng;
  };
  export type Facility = {
    id: number;
    longitude: number;
    latitude: number;
    addressName: string;
    categoryGroupName: '편의점' | '마트' | '병원' | '세탁소';
    kakaoId: string;
    phone: string;
    placeName: string;
    placeUrl: string;
    roadAddressName: string;
  };
}
