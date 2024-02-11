import "../css/SearchResults.css";
import { useLocation } from "react-router-dom";
import SearchItemCard from "./SearchItemCard";

const SearchResults = () => {
  const location = useLocation();
  const { searchResults } = location.state;
  return (
    <div className="search-results">
      {searchResults.map((e, i) => {
        return <SearchItemCard key={i} data={e} />;
      })}
    </div>
  );
};

export default SearchResults;
