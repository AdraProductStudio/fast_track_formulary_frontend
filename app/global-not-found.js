"use client"
import "bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap-client";
import "~/stylesheet/css/globals.css";
import "~/stylesheet/css/index.css";
import "~/stylesheet/css/responsive.css";
import Image from "~/components/Image"
import { Images } from "~/public/image"

export const metadata = {
    title: 'Not Found',
    description: 'The page you are looking for does not exist.',
}

export default function GlobalNotFound() {

    return (
        <html lang="en">
            <body className="vh-100">
                <main className="main_layout_resolution">
                    <header className="main_layout_header_resolution">
                        <div className="col">
                            <Image src={Images.logo_image} width={130} height={95} alt="logo" />
                        </div>
                    </header>

                    <div className="main_layout_body_resolution">
                        <div className="h-100 med_search_page">
                            <div className="card rounded-4">
                                <div className="card-body login_form_content text-center">
                                    <div className="col-12 text-center">
                                        <h5 className="mb-4">The page you are looking for does not exist.</h5>
                                        <a href="/" className="text-primary text-decoration-underline">Back to login</a>
                                    </div>
                                </div >
                            </div>
                        </div>
                    </div>
                </main>
            </body>
        </html>
    )
}