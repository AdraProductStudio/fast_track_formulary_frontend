"use client";

import Image from "~/components/Image";
import { Images } from "~/public/image";

export default function mainLayout({ children }) {

    return (
        <main className="main_layout_resolution">
            <header className="main_layout_header_resolution">
                <div className="col">
                    <Image src={Images.logo_image} width={130} height={95} alt="logo" />
                </div>
            </header>

            <div className="main_layout_body_resolution">
                {children}
            </div>
        </main>
    )
}