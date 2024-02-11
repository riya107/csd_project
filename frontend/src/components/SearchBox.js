import { FormControl} from 'react-bootstrap';
import { searchResultsAPI } from '../api-calls/customer-api-calls';
import { useNavigate } from 'react-router-dom';

const SearchBox = ({searchQuery, setSearchQuery}) => {
    const navigate= useNavigate();
    const handleKeyDown = async (e) => {
        if(e.key === 'Enter'){
            const res = await searchResultsAPI(searchQuery);
            if(!res){
                alert("OOPS! No Result Found");
                return ;
            }
            const searchResults = res.searchResults;
            if(searchResults.length===0){
                alert("OOPS! No Result Found");
            }
            else{
                navigate('/search-results', { state: { searchResults} });
            }
        }
    }
    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return ( 
        <div>
            <FormControl
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
     );
}
 
export default SearchBox;