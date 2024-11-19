import { Fragment, useState } from "react";
import { useGetBookByIdQuery } from "../../api/book/query";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { ReviewSubmit } from "../review/submit-review";

export const ListDetailBook = ({ bookId }: { bookId: string }) => {
  const { data, error, isLoading, isError } = useGetBookByIdQuery(bookId);
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error?.message || "An error occurred."}</div>;
  }

  // Ensure data exists
  if (!data?.data) {
    return <div>No book data available.</div>;
  }

  const book = data?.data || []; // Access the book directly here

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
      >
        <BookOpenIcon className="h-6 w-6" aria-hidden="true" />
        <span className="sr-only">View book details</span>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="border-2 border-black hover:shadow-lg hover:shadow-slate-600 transition ease-out duration-300 rounded-2xl cursor-pointer bg-gray-50 p-5">
                    <Link to={`/books/${book._id}`}>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {book.title}
                      </h2>
                      <p className="text-lg text-gray-600 mb-4">
                        {book.author}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {book.genres}
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Published on: {book.published_at}
                      </p>
                      <p className="text-base text-gray-700 mb-4 line-clamp-3">
                        {book.description}
                      </p>
                    </Link>
                    <div className="flex justify-between">
                      <div>
                        <ReviewSubmit book={book} />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
