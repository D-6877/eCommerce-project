import { useState, useContext, createContext } from "react";

const SearchContext = createContext(); // Capitalize context name for clarity

const SearchProvider = ({ children }) => { // Capitalize provider name
    const [auth, setAuth] = useState({
        keyword: '',
        results: [],
    });

    return (
        <SearchContext.Provider value={[auth, setAuth]}>
            {children} {/* Render children correctly */}
        </SearchContext.Provider>
    );
};

// Custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
