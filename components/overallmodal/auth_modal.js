"use client"
import { Modal } from "react-bootstrap";
import Icons from "~/public/icons";
import { useModalStore } from "~/store/ModalStore";
import ButtonComponent from "~/components/Button/Button";
import LinkComponent from "~/components/Link";

export default function AuthModal() {
    const { modal, closeModal } = useModalStore();

    function modalHeaderFun() {
        switch (modal?.modal_name) {
            case "professional_sign_up_location_confirm":
                return (
                    <h1 className="modal-title fs-5" id="coutryLocationMatchModal">
                        {Icons.sign_up_warning}
                        Location Confirmation
                    </h1>
                )

            default:
                break;
        }
    }

    function modalBodyFun() {
        switch (modal?.modal_name) {
            case "signin_apple_warning":
            case "signup_apple_warning":
                return (
                    <div className="py-4 px-2 col-12">
                        <div className="row justify-content-center col-12 text-center">
                            <div className="col-12">
                                <div className="py-2">
                                    <div className="d-flex align-items-center justify-content-center mb-3">
                                        <p className="mb-0">{Icons.sign_up_warning}</p>
                                        <h5 className="mb-0"> Please Don’t Hide Your Email</h5>
                                    </div>
                                </div>

                                <p className="text-mute mb-0">To ensure you receive important communications and updates, please do not hide your email when signing up through Apple.</p>
                            </div>
                        </div>
                    </div>
                )

            case "professional_sign_up_location_confirm":
                return (
                    <div>
                        There seems to be a mismatch between your location and phone country code. Do you wish to continue?
                    </div>
                )

            default:
                break;
        }
    }

    function modalFooterFun() {
        switch (modal?.modal_name) {
            case "signin_apple_warning":
            case "signup_apple_warning":
                return (
                    <div className="col-lg-12 d-flex justify-content-between gap-2 mx-auto w-100">
                        <ButtonComponent className="btn w-100 btn-outline-secondary my-2" onClick={closeModal}>
                            Cancel
                        </ButtonComponent>

                        <LinkComponent href={modal?.data?.href} className="btn btn_brand_color my-2 w-100">
                            Proceed
                        </LinkComponent>
                    </div>
                )

            case "professional_sign_up_location_confirm":
                return (
                    <div className="col-lg-12 d-flex justify-content-between gap-2 mx-auto w-100">
                        <ButtonComponent className="btn w-100 btn-outline-secondary my-2" onClick={closeModal}>
                            No
                        </ButtonComponent>

                        <ButtonComponent className="btn w-100 btn btn_brand_color my-2"
                            onClick={modal.modal_function?.submitAboutYouAnyway}>
                            Yes
                        </ButtonComponent>
                    </div>
                )

            default:
                break;
        }
    }

    return (
        <Modal show={modal?.show} backdrop="static" keyboard={false} size={modal?.size || "md"} centered={modal?.centered} onHide={closeModal}>
            {modalHeaderFun() && <Modal.Header closeButton={modal?.close_button}>{modalHeaderFun()}</Modal.Header>}
            {modalBodyFun() && <Modal.Body>{modalBodyFun()}</Modal.Body>}
            {modalFooterFun() && <Modal.Footer>{modalFooterFun()}</Modal.Footer>}
        </Modal>
    )
}
