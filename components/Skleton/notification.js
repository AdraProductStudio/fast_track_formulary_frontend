export default function notificationMessageGlow(index) {
    return (
        <div key={index} className={`notification_item_flow mb-3 d-flex`}>
            <div className="me-3">
                <div className="notify_image_glow placeholder"> </div>
            </div>
            <div className="notification_content_glow w-100">
                <p className="placeholder rounded-3"></p>
                <div className="notification_date_glow ms-auto">
                    <h5 className="w-100 h-100 placeholder rounded-3"></h5>
                </div>
            </div>
        </div>
    )
}