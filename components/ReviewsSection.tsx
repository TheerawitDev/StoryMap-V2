
"use client";

import { useState } from "react";
import { StarRating } from "./StarRating"; // Ensure this matches the file I created
import { useRouter } from "next/navigation";

// Define Review type matching the API response structure roughly
type Review = {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: string | Date;
    user: {
        name: string | null;
        image: string | null;
    };
};

interface ReviewsSectionProps {
    locationId: number;
    initialReviews: Review[];
    isLoggedIn: boolean;
}

export default function ReviewsSection({ locationId, initialReviews, isLoggedIn }: ReviewsSectionProps) {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) return;

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ locationId, rating, comment }),
            });

            if (!res.ok) throw new Error("Failed to submit review");

            // Reload to get fresh data including user info populated by server
            router.refresh();
            window.location.reload();

            // Reset form (though reload will likely clear this anyway unless persisted)
            setComment("");
            setRating(0);
        } catch (error) {
            console.error(error);
            alert("Failed to submit review");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-8 pt-8 border-t border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-white">Reviews & Ratings</h2>

            <div className="space-y-4 mb-8">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="border border-white/10 p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden flex items-center justify-center text-white font-bold">
                                    {review.user.image ? (
                                        <img src={review.user.image} alt={review.user.name || "User"} className="w-full h-full object-cover" />
                                    ) : (
                                        (review.user.name?.[0] || "A").toUpperCase()
                                    )}
                                </div>
                                <div>
                                    <div className="font-semibold text-white">{review.user.name || "Anonymous User"}</div>
                                    <div className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</div>
                                </div>
                            </div>
                            <StarRating rating={review.rating} size={16} />
                            {review.comment && <p className="mt-3 text-gray-300 leading-relaxed">{review.comment}</p>}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-400 bg-white/5 rounded-lg border border-white/5 border-dashed">
                        No reviews yet. Be the first to share your experience!
                    </div>
                )}
            </div>

            {isLoggedIn ? (
                <form onSubmit={handleSubmit} className="border border-white/10 p-6 rounded-xl bg-white/5 mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-white">Write a Review</h3>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-300">Rating</label>
                        <div className="flex items-center gap-4">
                            <StarRating rating={rating} editable onRatingChange={setRating} size={32} />
                            <span className="text-sm text-gray-400">{rating > 0 ? `${rating} stars` : "Select a rating"}</span>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-300">Comment (Optional)</label>
                        <textarea
                            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-600"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your thoughts about this place..."
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting || rating === 0}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting ? "Submitting..." : "Post Review"}
                    </button>
                </form>
            ) : (
                <div className="p-6 bg-blue-900/20 border border-blue-500/20 rounded-lg text-center mt-8">
                    <p className="text-blue-100">
                        Please <a href="/login" className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4">log in</a> to leave a review.
                    </p>
                </div>
            )}
        </div>
    );
}
