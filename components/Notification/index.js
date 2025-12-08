"use client";
import { useEffect, useState } from "react";
import Icons from "~/public/icons";
import ButtonComponent from "../Button/Button";
import { handle_delete_notifications, handle_get_notifications } from "~/services/auth";
import Image from "../Image";
import { Images } from "~/public/image";
import notificationMessageGlow from "../Skleton/notification";

export default function Notification() {
    const [show_notification_dropdown, set_show_notification_dropdown] = useState(false);
    const [notification_data, set_notification_data] = useState(null);

    useEffect(() => {
        handle_get_notifications({ set_notification_data })
    }, [])

    return (
        <>
            <button type="button" className="btn position-relative" onClick={() => set_show_notification_dropdown(!show_notification_dropdown)}>
                {Icons.notificationIcon}
                {notification_data?.data?.length > 0 &&
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger notification_badge_count">
                        {notification_data?.data?.length}
                    </span>
                }
            </button>

            <div className={`notification_dropdown_card shadow rounded-4 placeholder-glow ${show_notification_dropdown ? "active" : ""}`}>
                <div className="card h-100 border-0">
                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                        <div className="card-title mb-0">
                            Notifications
                        </div>
                        <div className="close">
                            <ButtonComponent className="btn clear_all_button" onClick={() => set_show_notification_dropdown(false)}>{Icons.close_icon}</ButtonComponent>
                        </div>
                    </div>
                    {notification_data?.data?.length > 0 &&
                        <div className="py-2 ms-auto me-2">
                            <ButtonComponent className="btn-secondary px-4 clear_all_button" onClick={() => handle_delete_notifications({ notification_data, set_notification_data, deletion_id: "All" })}>Clear All</ButtonComponent>
                        </div>
                    }
                    <div className="card-body h-100">
                        {notification_data?.data?.length ? notification_data?.data.map((item, index) => (
                            notification_data?.deletion_id === "All" ?
                                notificationMessageGlow(index)
                                :
                                notification_data?.deletion_id === item.id ?
                                    notificationMessageGlow(index)
                                    :
                                    <div key={index} className={`${notification_data?.data?.length !== index + 1 ? "notification_item mb-3" : ""} d-flex`}>
                                        <div className="me-3">
                                            <Image src={Images.notification_logo_icon} alt="2nd careers" width={40} height={40} />
                                        </div>
                                        <div className="notification_content">
                                            <p>{item.msg}</p>
                                            <p className="text-secondary text-end mb-2" style={{ fontSize: '12px' }}>{item.relative_time}</p>
                                        </div>
                                        <div className="col">
                                            <ButtonComponent className="clear_all_button" onClick={() => handle_delete_notifications({ notification_data, set_notification_data, deletion_id: item.id })}>{Icons.close_icon}</ButtonComponent>
                                        </div>
                                    </div>
                        ))
                            :
                            <div className="d-flex align-items-center justify-content-center" style={{ height: '20rem' }}>
                                <Image src={Images.empty_notification} alt="No notifications" width={180} height={180} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}