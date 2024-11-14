import { useGetAllBookQuery } from "../../api/book/query";
import { UpdateBook } from "./update-book";

export const ListBook = () => {
  const { isLoading, data, isError, error } = useGetAllBookQuery();

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* <div className="bg-gray-300 w-full h-64 mb-4 rounded-lg"></div> */}

        {data?.data.map((book) => (
          <div
            className="border-2 border-black hover:shadow-lg hover:shadow-slate-600 transition ease-out duration-300 rounded-2xl cursor-pointer bg-white p-5"
            key={book._id}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {book.title}
            </h2>
            <p className="text-lg text-gray-600 mb-4">{book.author}</p>
            <div className="flex flex-wrap gap-2 mb-4">{book.genres}</div>
            <p className="text-sm text-gray-500 mb-4">
              Published on: {book.published_at}
            </p>
            <p className="text-base text-gray-700 mb-4 line-clamp-3">
              {book.description}
            </p>
            <div>
              <UpdateBook bookId={book._id} />
            </div>
          </div>
        ))}
        {/* <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
        Read more
        </a> */}
      </div>
    </div>
  );
};
