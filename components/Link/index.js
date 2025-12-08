"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useModalStore } from "~/store/ModalStore";

export default function LinkComponent({ data_bs_dismiss = "", href = "", rel = "", className = "", children, target = "_self", external_path = "", activeClass = "active" }) {
    const pathname = usePathname();
    const router = useRouter()
    const { closeModal } = useModalStore();

    return (
        data_bs_dismiss ?
            <div onClick={closeModal} data-bs-dismiss={data_bs_dismiss}>
                <Link href={href} target={target} className={`${className} ${pathname.includes(href) ? activeClass : ''}`} rel={rel}>
                    {children}
                </Link>
            </div>
            :
            <Link href={external_path || href} target={target} className={`${className} ${href ? pathname.includes(href) ? activeClass : '' : ''}`} rel={rel} onClick={external_path ? () => router.push(href) : null}>
                {children}
            </Link>
    );
}
