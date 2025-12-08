import Icons from "~/public/icons";

export default function HeaderSkeleton() {
    return (
        <div className="ms-auto">
            <div className="d-flex align-items-center placeholder-glow justify-content-end">
                <div className="col d-none d-lg-flex align-items-center">
                    <div className="placeholder me-2" style={{ width: 90, height: 25, borderRadius: '6px' }}></div>
                    <div className="placeholder me-2" style={{ width: 90, height: 25, borderRadius: '6px' }}></div>
                    <div className="placeholder me-2" style={{ width: 90, height: 25, borderRadius: '6px' }}></div>
                    <div className="placeholder me-2" style={{ width: 90, height: 25, borderRadius: '6px' }}></div>
                </div>

                <div className="col">
                    <div className="placeholder rounded-circle" style={{ width: 50, height: 50 }}></div>
                </div>

                <div className="col d-lg-none">
                    <button className="btn ms-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">{Icons.menuIcon}</button>
                </div>
            </div>
        </div>
    )
}