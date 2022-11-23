import SearchIcon from "@material-ui/icons/Search";

interface SEARCH_PROPS {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputText: string;
    searchByEnter: () => void;
}

export const Search = ({
    onChange,
    inputText,
    searchByEnter,
}: SEARCH_PROPS) => {
    return (
        <div className="search">
            <div className="search__bar">
                <SearchIcon />
                <input
                    type="text"
                    className="search__bar__input"
                    placeholder="検索"
                    autoComplete="off"
                    name="search"
                    value={inputText}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            searchByEnter();
                        }
                    }}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};
