"use client"
import { Modal } from "react-bootstrap";
import Icons from "~/public/icons";
import { useModalStore } from "~/store/ModalStore";
export default function AuthModal() {
    const { modal, closeModal } = useModalStore();

    function modalHeaderFun() {
        switch (modal?.modal_name) {
            case "":
                return

            default:
                break;
        }
    }

    function modalBodyFun() {
        switch (modal?.modal_name) {
            case "":
                return

            default:
                break;
        }
    }

    function modalFooterFun() {
        switch (modal?.modal_name) {
            case "":
                return


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
