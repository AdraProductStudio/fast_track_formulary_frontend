"use client";

import LinkComponent from "~/components/Link";

export default function ProfessionalFooter() {
    return (
        <footer className="professional_footer sign_layout_footer mt-5">
            <div className="d-flex flex-wrap text-center ">
                <div className="col-12 col-lg-4 mt-3 mt-lg-0 text-dark">
                    © 2025 2nd Careers. All rights reserved.
                </div>

                <div className="col-12 col-lg-4 mt-3 mt-lg-0">
                    Need help?
                    <LinkComponent href={`mailto:${process.env.NEXT_PUBLIC_URL_COMPANY_MAIL_ID}`} target="_blank" className="mx-1 brand_color"> Contact Support </LinkComponent>
                </div>

                <div className="col-12 col-lg-4 mt-3 mt-lg-0 text-dark hstack justify-content-center">
                    <div>
                        <LinkComponent href={`mailto:${process.env.NEXT_PUBLIC_URL_COMPANY_TERMS_AND_CONDITIONS}`} target="_blank" className="mx-1"> Terms and conditions </LinkComponent>
                    </div>
                    <div className="vr"></div>
                    <div>
                        <LinkComponent href={`mailto:${process.env.NEXT_PUBLIC_URL_COMPANY_PRIVACY_POLICY}`} target="_blank" className="mx-1"> Privacy policy </LinkComponent>
                    </div>
                </div>
            </div>
        </footer>
    )
}