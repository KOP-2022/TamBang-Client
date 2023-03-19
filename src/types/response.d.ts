declare module 'response' {
  export type Response<T = Record<string, never>> = {
    success: boolean;
    message?: string;
    data: T;
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
  export type Room = {
    id: number;
    latitude: number;
    longitude: number;
  };
  export type RoomDetail = {
    address: {
      sigungu: string;
      roadName: string;
    };
    buildInfo: {
      buildType: '빌라' | '아파트' | '오피스텔';
      floor: number;
      area: number;
      dealType: '매매' | '전세' | '월세';
      price: number | null;
      deposit: number;
      monthlyPay: number | null;
    };
    description: string;
    memberEmail: string;
  };
}
