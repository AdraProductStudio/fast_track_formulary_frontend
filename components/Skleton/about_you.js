export default function AboutYouSkeleton() {
    return (
        <div className='mt-4'>
            {Array.from({ length: 4 }).map((_, i) => (
                <div className="mb-3" key={i}>
                    <div className="placeholder w-25 rounded-3 py-3 mb-2"></div>
                    <div className="placeholder w-100 rounded-3 py-4"></div>
                </div>
            ))}

            <div className="my-4">
                <div className="placeholder w-100 rounded-3 py-4"></div>
            </div>
        </div>
    );
}
