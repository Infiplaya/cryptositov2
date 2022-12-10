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
      <div className="flex gap-3 mt-3">
        {pages.map((page, index) => {
          return (
            <button
              key={index}
              onClick={() => setCurrentPage(page)}
              className={`p-3 w-16 rounded-lg bg-gray-900 ${page == currentPage ? "font-bold bg-gray-700" : ""}`}
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
