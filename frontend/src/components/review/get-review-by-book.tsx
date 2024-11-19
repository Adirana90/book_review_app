// src/components/GetReviews.tsx
import { UpdateReview } from "./update-review";
import { useGetReviewByIdQuery } from "../../api/review/query";
import { DeleteReview } from "./delete-review";

export const GetReviews = ({
  bookId,
}: {
  bookId: string;
  refetch: () => void;
}) => {
  const { data: reviewsData, isLoading } = useGetReviewByIdQuery(bookId);

  return (
    <div className="flex-1 overflow-y-auto mb-2">
      {isLoading ? (
        <p className="text-gray-500">Loading reviews...</p>
      ) : reviewsData?.data && reviewsData.data.length > 0 ? (
        reviewsData.data.map((review) => (
          <div
            key={review._id}
            className="mb-3 bg-gray-50 p-3 rounded-lg hover:shadow-md"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-semibold">
                  {review.username || "Anonymous"}
                </p>
                <p className="text-sm text-yellow-500">
                  {"★".repeat(review.rating)} {"☆".repeat(5 - review.rating)}
                </p>
              </div>
              <span className="flex gap-2">
                <UpdateReview review={review} />
                <button>
                  <DeleteReview reviewId={review._id} />
                </button>
              </span>
            </div>
            <div className="mt-1">
              <p className="text-sm">{review.reviewText}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
};
