"use client";
// ~/store/ModalStore.js
import { create } from "zustand";

export const defaultModalState = {
    show: false,
    modal_name: null,
    centered: false,
    size: "md",
    data: {},
    function: null,
    close_button: true,
};

export const useModalStore = create((set) => ({
    modal: { ...defaultModalState },

    openModal: (modal_props) => {
        set({
            modal: {
                show: true,
                modal_name: modal_props.modal_name || null,
                size: modal_props.size || "md",
                centered: modal_props.centered || true,
                close_button: modal_props.close_button || true,
                data: modal_props.data || {},
                modal_function: modal_props.modal_function || null,
            }
        })
    },

    update_modal_data: (new_data) => {
        set((state) => ({
            modal: {
                ...state.modal,
                data: {
                    ...state.modal.data,
                    ...new_data
                }
            }
        }))
    },

    closeModal: () =>
        set(() => ({
            modal: { ...defaultModalState }
        })),
}));
