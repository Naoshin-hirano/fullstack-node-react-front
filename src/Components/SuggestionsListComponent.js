// サジェスチョンリスト表示用のコンポーネント
export const SuggestionsListComponent = ({
    onClick,
    filteredSuggestions
}) => {
    return filteredSuggestions.length ? (
        <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
                return (
                    <li key={suggestion} onClick={onClick}>
                        {suggestion}
                    </li>
                );
            })}
        </ul>
    ) : (
            <div className="no-suggestions">
                <em>検索結果が見つかりません</em>
            </div>
        );
};