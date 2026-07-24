import { Search } from "react-feather";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="flex items-center bg-white shadow-md rounded-full px-4 py-2 w-full md:w-2/3">
        <Search className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Rechercher un produit, une marque..."
          className="w-full outline-none text-gray-700"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
