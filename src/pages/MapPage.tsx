import { SubmitHandler, useForm } from 'react-hook-form';

import type { LatLng } from 'kakao-maps';

import CheckBox from '@/components/CheckBox';
import Layout from '@/components/Layout';
import Map from '@/components/Map';
import SearchBar from '@/components/SearchBar';

const FILTERS = ['편의점', '세탁소', '병원', '마트'] as const;

interface SearchForm {
  address: string;
}

interface FilterForm {
  filters: string[];
}

const MOCK_DATA: LatLng[] = [
  { lat: 33.450701, lng: 126.570667 },
  { lat: 33.451001, lng: 126.570967 },
  { lat: 33.451301, lng: 126.571267 },
  { lat: 33.451601, lng: 126.571567 },
  { lat: 33.451901, lng: 126.571867 },
];

const MapPage = () => {
  const { register, handleSubmit } = useForm<SearchForm>();
  const { register: filterRegister, watch } = useForm<FilterForm>();

  const onSubmit: SubmitHandler<SearchForm> = (data) => {
    console.log('submit:', data);
  };

  return (
    <Layout title="지도">
      <div className="absolute z-10 w-full bg-white p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SearchBar register={register('address', { required: true })} />
        </form>
        <div className="flex w-full justify-around mt-8">
          {FILTERS.map((filter, index) => (
            <CheckBox key={index} register={filterRegister('filters')}>
              {filter}
            </CheckBox>
          ))}
        </div>
      </div>
      <Map rooms={MOCK_DATA} filters={watch('filters') ?? []} />
    </Layout>
  );
};

export default MapPage;
