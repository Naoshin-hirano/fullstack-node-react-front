export const DeleteModal = ({ deletePost, setDeleteOpenModal }: any) => {
    return (
        <div id="modal" className="modal">
            <div>
                <p>本当にこの投稿を削除しますか？</p>
                <button onClick={deletePost}>はい</button>
                <button onClick={() => setDeleteOpenModal(false)}>
                    いいえ
                </button>
            </div>
        </div>
    );
};
