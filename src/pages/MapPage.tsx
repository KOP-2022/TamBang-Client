import Map from '../components/Map';
import SearchBar from '../components/SearchBar';

const MapPage = () => {
  return (
    <div className="mx-auto max-w-lg shadow-lg relative">
      <div className="absolute z-10 w-full bg-white p-8">
        <SearchBar />
      </div>
      <Map />
    </div>
  );
};

export default MapPage;
