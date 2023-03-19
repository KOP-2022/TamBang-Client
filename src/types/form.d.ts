declare module 'form' {
  export type LoginForm = {
    email: string;
    password: string;
  };
  export type SearchForm = {
    address: string;
  };
  export type FilterForm = {
    filters: string[];
  };
  export type RegisterRequest = {
    email: string;
    password: string;
    name: string;
    nickname: string;
    phone: string;
  };
  export type RegisterForm = RegisterRequest & {
    passwordConfirm: string;
  };
  export type RoomUploadForm = {
    sigungu: string;
    roadname: string;
    buildtype: '빌라' | '아파트' | '오피스텔';
    floor: string;
    area: number;
    dealtype: '매매' | '전세' | '월세';
    price: number;
    deposit: number;
    monthlypay: number;
    description: string;
    image: FileList;
    longitude: string;
    latitude: string;
  };
}
