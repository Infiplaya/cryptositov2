const Pagination = ({
  totalCoins,
  coinsPerPage,
  setCurrentPage,
  currentPage,
}: {
  totalCoins: number;
  coinsPerPage: number;
  setCurrentPage: any;
  currentPage: number;
}) => {
  const totalPages = Math.ceil(totalCoins / coinsPerPage);
  
  // Display the current page, one page before, and one page ahead
  const startPage = Math.max(currentPage - 1, 1);
  const endPage = Math.min(currentPage + 1, totalPages);
  const pageNumbers = Array.from(Array(endPage - startPage + 1).keys()).map(
    num => num + startPage
  );


  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirstClick = () => {
    setCurrentPage(1);
  };

  const handleLastClick = () => {
    setCurrentPage(totalPages);
  };

  return (
    <nav>
      <ul className="flex gap-2 mt-5">
        <li>
          <button
            onClick={handleFirstClick}
            className="shadow p-2 rounded-lg dark:bg-gray-700"
            disabled={currentPage === 1}
          >
            {"<<<"}
          </button>
        </li>
        <li>
          <button
            onClick={handlePrevClick}
            className="shadow p-2 rounded-lg dark:bg-gray-700"
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
        </li>
        <li className="p-2 rounded-lg dark:bg-gray-700">
          Page {currentPage} of {totalPages}
        </li>
        <li>
          <button
            onClick={handleNextClick}
            className="shadow p-2 rounded-lg dark:bg-gray-700"
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </li>
        <li>
          <button
            onClick={handleLastClick}
            className="shadow p-2 dark:bg-gray-700 rounded-lg"
            disabled={currentPage === totalPages}
          >
            {">>>"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
