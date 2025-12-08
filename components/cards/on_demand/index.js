import ButtonComponent from "~/components/Button/Button";
import Image from "~/components/Image";
import Icons from "~/public/icons";
import { useModalStore } from "~/store/ModalStore";

export default function ProfessionalOnDemandCard({ data }) {
    const { openModal } = useModalStore();

    return (
        <div className="col-12 col-lg-12 col-xxl-10 row align-content-center mx-auto p-2">
            <div className="card on_demand_card rounded-4 p-0">
                <div className="card-body p-0 d-flex flex-wrap">
                    <div className="on_demand_content">
                        <h3 className="mb-3">{data?.title || ""}</h3>
                        <p>{data?.short_description || ""}</p>

                        <ButtonComponent className="arrowed_button" onClick={() => openModal({ modal_name: 'on_demand_video', data: data, size: "xl", close_button: true })}>
                            Play Video
                            <span className="ps-2">{Icons.right_arrow_white}</span>
                        </ButtonComponent>
                    </div>
                    <div className="col-12 col-lg on_demand_video_thumbnail_image">
                        <Image src={`${process.env.NEXT_PUBLIC_URL_SECOND_CAREERS_CDN}${data?.image || ""}`} alt="learning on demand" width={1080} height={1080} />
                    </div>
                </div>
            </div>
        </div >
    )
}