"use client";

export default function InfinityLoader() {

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "white" }}>
            <svg
                width="130"
                height="130"
                viewBox="0 0 100 50"
                xmlns="http://www.w3.org/2000/svg"
                className="infinity"
            >
                <path
                    fill="none"
                    stroke="#FFA500"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10,25 C10,5 40,5 50,25 C60,45 90,45 90,25 C90,5 60,5 50,25 C40,45 10,45 10,25 Z"
                >
                    <animate
                        attributeName="stroke-dasharray"
                        from="0,180"
                        to="180,0"
                        dur="1.2s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="-180"
                        dur="1.2s"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>
        </div>
    )
}