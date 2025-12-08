import { useState } from "react"
import { FiInfo } from "react-icons/fi"

export const Tooltip = ({ content }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="info-icon ps-2 w-5">
            <span
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="text-secondary"
            >
                <FiInfo size={17} />
            </span>
            {isHovered && (
                <div className="info-hover-text bg-secondary-subtle p-1 mt-3 px-2">
                    {content}
                </div>
            )}
        </div>
    )
}