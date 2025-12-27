"use client";

import { useRouter } from "next/navigation";
import UserAuth from "~/app/(access_auth_verifyer)/UserAuth";
import ButtonComponent from "~/components/Button/Button";
import Image from "~/components/Image";
import Icons from "~/public/icons";
import { Images } from "~/public/image";

export default function mainLayout({ children }) {
    const router = useRouter();

    return (
        <UserAuth>
            <main className="main_layout_resolution">
                <header className="main_layout_header_resolution px-xl-5">
                    <div className="col d-none d-xl-block">
                        <Image src={Images.logo_image} width={110} height={70} alt="logo" />
                    </div>

                    <div className="col text-end">
                        <ButtonComponent className="profile_button">
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