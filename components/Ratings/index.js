import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function Rating({ maxStars = 5, onRate = () => { }, rated = 0, className = '' }) {
    const [hovered, setHovered] = useState(0);

    const handleClick = (rating) => {
        if (onRate) onRate(rating);
    };

    return (
        <div className="flex space-x-1">
            {[...Array(maxStars)].map((_, index) => {
                const rating = index + 1;
                const isActive = rating <= (hovered || rated);

                const StarIcon = isActive ? FaStar : FaRegStar;

                return (
                    <StarIcon
                        key={rating}
                        size={25}
                        className={`star ${isActive ? "active" : "inactive"} ${className}`}
                        onMouseEnter={() => setHovered(rating)}
                        onMouseLeave={() => setHovered(0)}
                        onClick={() => handleClick(rating)}
                    />
                );
            })}
        </div>
    );
}
