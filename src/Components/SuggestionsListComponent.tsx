interface SUGGESTION_LIST_PROPS {
    onClick: (e: any) => void;
    filteredSuggestions: string[];
}

// サジェスチョンリスト表示用のコンポーネント
export const SuggestionsListComponent = ({
    onClick,
    filteredSuggestions
}: SUGGESTION_LIST_PROPS) => {
    return filteredSuggestions.length ? (
        <ul className="suggestions">
            {filteredSuggestions.map((suggestion: string) => {
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