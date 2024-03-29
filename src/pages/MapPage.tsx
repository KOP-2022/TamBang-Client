import { lazy, Suspense } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import type { FilterForm, SearchForm } from 'form';

import CheckBox from '@/components/CheckBox';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';

const Map = lazy(() => import('@/components/Map'));

const FILTERS = ['편의점', '세탁소', '병원', '마트'] as const;

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
      <Suspense fallback={<div>loading...</div>}>
        <Map filters={watch('filters') ?? []} />
      </Suspense>
    </Layout>
  );
};

export default MapPage;
