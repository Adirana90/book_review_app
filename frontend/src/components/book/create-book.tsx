import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { errorToast, successToast } from "../toaster";
import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useAddBookMutation } from "../../api/book/query";

const createBookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  genres: z.string().min(1),
  description: z.string(),
  published_at: z.string(),
});

export const CreateBook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const addBookMutation = useAddBookMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      title: "",
      author: "",
      genres: "",
      description: "",
      published_at: "",
    },
    resolver: zodResolver(createBookSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof createBookSchema>> = (data) => {
    try {
      addBookMutation.mutateAsync(
        {
          title: data.title,
          author: data.author,
          genres: data.genres,
          description: data.description,
          published_at: data.published_at,
        },
        {
          onSuccess() {
            successToast("book created successfully");
            reset();
            setIsOpen(false);
          },
          onError(error) {
            console.error("error", error);
            errorToast(error.message);
          },
        }
      );
    } catch (error) {
      console.error("error", error);
      errorToast("something went wrong");
    }
  };
  //   const openModal = () => {
  //     setIsOpen(true);
  //   };
  //   const closeModal = () => {
  //     setIsOpen(false);
  //   };
  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Create Book
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                  >
                    Create New Book
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      {/* <X className="h-6 w-6" aria-hidden="true" /> */}X
                    </button>
                  </DialogTitle>
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          id="title"
                          {...register("title")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {errors.title && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.title.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="author"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Author
                        </label>
                        <input
                          type="text"
                          id="author"
                          {...register("author")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {errors.author && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.author.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="genre"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Genres
                        </label>
                        <input
                          type="text"
                          id="genre"
                          {...register("genres")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {errors.genres && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.genres.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          {...register("description")}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {errors.description && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.description.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="publishedAt"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Published at
                        </label>
                        <input
                          //   type="date"
                          id="publishedAt"
                          {...register("published_at")}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {errors.published_at && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.published_at.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Create Book
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

//   open,
//   closeModal,
// }: {
//   open: boolean;
//   openModal: () => void;
//   closeModal: () => void;
// }) => {

//   return (
//     <>
//       {/* <Dialog
//         open={open}
//         onClose={closeModal}
//         className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
//       >
//         Create Book
//       </Dialog> */}

//       <Transition appear show={open} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <TransitionChild
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </TransitionChild>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <TransitionChild
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <DialogTitle
//                     as="h3"
//                     className="text-lg font-medium leading-6 text-gray-900"
//                   >
//                     Create New Book
//                   </DialogTitle>
//                   <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
//                     <div className="space-y-4">
//                       <div>
//                         <label
//                           htmlFor="title"
//                           className="block text-sm font-medium text-gray-700"
//                         >
//                           Title
//                         </label>
//                         <input
//                           type="text"
//                           id="title"
//                           {...register("title")}
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-8 pl-2"
//                         />
//                         {errors.title && (
//                           <p className="mt-1 text-xs text-red-500">
//                             {errors.title.message}
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="author"
//                           className="block text-sm font-medium text-gray-700"
//                         >
//                           Author
//                         </label>
//                         <input
//                           type="text"
//                           id="author"
//                           {...register("author")}
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-8 pl-2"
//                         />
//                         {errors.author && (
//                           <p className="mt-1 text-xs text-red-500">
//                             {errors.author.message}
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="genres"
//                           className="block text-sm font-medium text-gray-700"
//                         >
//                           Genres
//                         </label>
//                         <input
//                           type="text"
//                           id="genres"
//                           {...register("genres")}
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-8 pl-2"
//                         />
//                         {errors.genres && (
//                           <p className="mt-1 text-xs text-red-500">
//                             {errors.genres.message}
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="description"
//                           className="block text-sm font-medium text-gray-700"
//                         >
//                           Description
//                         </label>
//                         <textarea
//                           id="description"
//                           {...register("description")}
//                           rows={3}
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                         />
//                         {errors.description && (
//                           <p className="mt-1 text-xs text-red-500">
//                             {errors.description.message}
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="published_at"
//                           className="block text-sm font-medium text-gray-700"
//                         >
//                           Published At
//                         </label>
//                         <input
//                           //   type="date"
//                           id="published_at"
//                           {...register("published_at")}
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-8 pl-2"
//                         />
//                         {errors.published_at && (
//                           <p className="mt-1 text-xs text-red-500">
//                             {errors.published_at.message}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                     <div className="mt-6">
//                       <button
//                         type="submit"
//                         className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                       >
//                         Create Book
//                       </button>
//                     </div>
//                   </form>
//                 </DialogPanel>
//               </TransitionChild>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// };
