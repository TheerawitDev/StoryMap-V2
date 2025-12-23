
"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number; // 0 to 5
    editable?: boolean;
    onRatingChange?: (rating: number) => void;
    size?: number;
}

export function StarRating({
    rating,
    editable = false,
    onRatingChange,
    size = 20,
}: StarRatingProps) {
    const handleClick = (value: number) => {
        if (editable && onRatingChange) {
            onRatingChange(value);
        }
    };

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
                <Star
                    key={value}
                    size={size}
                    className={`cursor-pointer ${value <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        } ${editable ? "hover:scale-110 transition-transform" : ""}`}
                    onClick={() => handleClick(value)}
                />
            ))}
        </div>
    );
}
