"use client";

import { useEffect, useState } from "react";
import Icons from "~/public/icons";
import { Images } from "~/public/image";
import { vector_icons } from "~/public/svg";
import Image from "~/components/Image";
import LinkComponent from "~/components/Link";
import Notification from "~/components/Notification";
import { professional_json } from "~/json/json_data/professional";
import { useProjectLogStore } from "~/store/project_log_store";
import HeaderSkeleton from "~/components/Skleton/header";
import { handle_get_user_details } from "~/services/auth";
import { useDeviceResizeListener } from "~/utils/functions/useViewportScale";

export default function ProfessionalHeader() {
    const [user_data_glow, set_user_data_glow] = useState(true);
    const { width } = useDeviceResizeListener();
    const { get_project_log_cookie, set_project_log_cookie } = useProjectLogStore();

    useEffect(() => {
        handle_get_user_details({ set_user_data_glow, get_project_log_cookie, set_project_log_cookie })
    }, [])

    return (
        <header className="professional_header">
            <div className="h-100 w-100 d-flex flex-wrap align-items-center">
                <div className="professional_nav_image">
                    {width <= 768 ?
                        <Image src={Images.infinite_logo} alt="2nd_logo" width={90} height={50} />
                        :
                        <Image src={Images.logo_image} alt="2nd_logo" width={250} height={44} />
                    }
                </div>

                {/* NAV LINKS */}
                {user_data_glow ?
                    <HeaderSkeleton />
                    :
                    <>
                        <nav className="professional_nav_links ms-auto">
                            {professional_json.header.map((item, index) => (
                                <LinkComponent key={index} href={item.nav_link_path} external_path={item.external_path} target={item?.target || ""}>{item.nav_link}</LinkComponent>
                            ))}
                        </nav>

                        {/* NOTIFICATION AND, PROFILE DROPDOWN AND, MOBILE MENU BUTTON */}
                        <div className="ms-auto m-lg-0 d-flex">
                            <div className="ms-3">
                                <Notification />
                            </div>

                            <div className="dropdown ms-1">
                                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <Image src={vector_icons.default_profile} alt="default_profile" width={28} height={28} />
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end custom_card_shadow">
                                    {professional_json.header_profile_options.map((item, index) => (
                                        <li key={index}>
                                            <LinkComponent href={item.option_path} external_path={item.external_path} target={item?.target || ""} className="dropdown-item">{item.option_name}</LinkComponent>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="d-lg-none ms-3">
                                <button className="btn ps-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">{Icons.menuIcon}</button>
                            </div>
                        </div>
                    </>
                }
            </div>

            {/* OFFCANVAS */}
            <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div className="offcanvas-header">
                    <Image src={Images.logo_image} alt="2nd_logo" width={250} height={40} />
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <nav className="professional_nav_links d-grid justify-content-center">
                        {professional_json.header.map((item, index) => (
                            <LinkComponent data_bs_dismiss="offcanvas" key={index} href={item.nav_link_path} external_path={item.external_path} target={item?.target || ""}>{item.nav_link}</LinkComponent>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    )
}