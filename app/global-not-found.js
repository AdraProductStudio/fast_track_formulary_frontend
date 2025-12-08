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
                <div className="maintanance_mode_container">
                    <div className="col-12 col-md-6 text-center">
                        <Image src={Images.page_not_found} alt="Maintenance Mode" width={300} height={300} />
                        <h5 className="mb-4">The page you are looking for does not exist.</h5>
                        <a href="/" className="text-primary text-decoration-underline">Back to login</a>
                    </div>
                </div >
            </body>
        </html>
    )
}