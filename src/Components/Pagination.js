import React from 'react';

// ページネーションの表示コンポーネント
export const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    // ページ数
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    // 0または最大値を超過したページにならないよう制御
    const handlePaginate = (number) => {
        if (number <= 0 || number > pageNumbers.length) {
            return
        }
        paginate(number);
    }

    return (
        <nav>
            <ul className="pagination">
                <li onClick={() => handlePaginate(currentPage - 1)} className="pre">前へ</li>
                {pageNumbers.map((number) => (
                    <li onClick={() => paginate(number)} className={currentPage === number ? "currentPage" : ""} key={number}>
                        {number}
                    </li>
                ))}
                <li onClick={() => handlePaginate(currentPage + 1)} className="next">次へ</li>
            </ul>
        </nav>
    )
}
