import CheckBox from '../components/CheckBox';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';

const FILTERS = ['편의점', '세탁소', '병원', '마트'] as const;

const MapPage = () => {
  return (
    <div className="mx-auto max-w-lg shadow-lg relative">
      <div className="absolute z-10 w-full bg-white p-8">
        <SearchBar />
        <div className="flex w-full justify-around mt-8">
          {FILTERS.map((filter, index) => (
            <CheckBox key={index}>{filter}</CheckBox>
          ))}
        </div>
      </div>
      <Map />
    </div>
  );
};

export default MapPage;
