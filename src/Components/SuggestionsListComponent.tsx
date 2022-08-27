// サジェスチョンリスト表示用のコンポーネント
export const SuggestionsListComponent = ({
    onClick,
    filteredSuggestions
}: any) => {
    return filteredSuggestions.length ? (
        <ul className="suggestions">
            {filteredSuggestions.map((suggestion: any, index: any) => {
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