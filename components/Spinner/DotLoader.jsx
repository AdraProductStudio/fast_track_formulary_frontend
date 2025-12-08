"use client";

export default function DotLoader() {

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="dots-loader">
                <div></div><div></div><div></div><div></div>
            </div>

            <style jsx>{`
    .dots-loader {
      display: flex;
      gap: 6px;
    }
    .dots-loader div {
      width: 10px;
      height: 10px;
      background-color: orange;
      border-radius: 50%;
      animation: bounce 0.6s infinite alternate;
    }
    .dots-loader div:nth-child(2) {
      animation-delay: 0.15s;
    }
    .dots-loader div:nth-child(3) {
      animation-delay: 0.3s;
    }
    .dots-loader div:nth-child(4) {
      animation-delay: 0.45s;
    }
    @keyframes bounce {
      to {
        opacity: 0.3;
        transform: translateY(-6px);
      }
    }
  `}</style>
        </div>

    )
}