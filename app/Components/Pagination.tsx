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
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      <h1 className="text-lg font-bold mt-5">Pages</h1>
      <div className="flex flex-wrap gap-3 mt-3">
        {pages.map((page, index) => {
          return (
            <button
              key={index}
              onClick={() => setCurrentPage(page)}
              className={`p-3 w-16 rounded-lg dark:bg-gray-900 shadow-md border-gray-300 border dark:border-none  ${
                page == currentPage ? "font-bold dark:bg-gray-700" : ""
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Pagination;
