"use client";

import UserAuth from "~/app/(access_auth_verifyer)/UserAuth";
import ButtonComponent from "~/components/Button/Button";
import Image from "~/components/Image";
import Icons from "~/public/icons";
import { Images } from "~/public/image";

export default function mainLayout({ children }) {

    return (
        <UserAuth>
            <main className="main_layout_resolution">
                <header className="main_layout_header_resolution">
                    <div className="col">
                        <Image src={Images.logo_image} width={130} height={85} alt="logo" />
                    </div>
                    <div className="col text-end">
                        <ButtonComponent className="btn-transparent">
                            {Icons.login_user_icon}
                        </ButtonComponent>
                    </div>
                </header>

                <div className="main_layout_body_resolution">
                    {children}
                </div>
            </main>
        </UserAuth>
    )
}