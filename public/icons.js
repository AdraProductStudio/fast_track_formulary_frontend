import { IoArrowBack, IoCloseOutline } from "react-icons/io5";
import { TbArrowsDiagonalMinimize2 } from "react-icons/tb";
import { TiStarFullOutline, TiTick } from "react-icons/ti";
import { IoIosInformationCircleOutline, IoMdSearch } from "react-icons/io";
import { CiMail, CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { MdArrowOutward, MdDeleteOutline, MdOutlineContentCopy, MdOutlineDeleteOutline, MdOutlineKeyboardArrowDown, MdOutlineMenuOpen } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoArrowForwardSharp } from "react-icons/io5";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaMapMarkedAlt, FaRegCalendarAlt, FaShoppingBag } from 'react-icons/fa'
import { FaBookmark, FaLocationDot, FaRegBookmark, FaShare } from "react-icons/fa6";
import { MdInfoOutline } from "react-icons/md";
import { LuDollarSign, LuUpload } from "react-icons/lu";
import { FiFilter, FiMinus, FiPlus } from "react-icons/fi";


const close_icon = <IoCloseOutline size={24} />
const close_icon_white = <IoCloseOutline size={24} className="text-light" />
const close_chatbot_icon = <IoCloseOutline size={28} className="text-primary" />
const minimize_icon = <TbArrowsDiagonalMinimize2 className="text-light" size={25} />
const tick_mark = <TiTick size={25} />
const sign_up_warning = <IoIosInformationCircleOutline className="fs-3 brand_color me-2" />
const email_icon = <CiMail size={25} />
const lock_icon = <CiLock size={25} />
const menuIcon = <MdOutlineMenuOpen size={25} />
const notificationIcon = <IoNotificationsOutline size={23} />
const right_arrow_white = <IoArrowForwardSharp size={23} />
const left_arrow_white = <IoArrowBack size={23} />
const down_arrow_icon = <MdOutlineKeyboardArrowDown size={25} />
const search_icon_gray = <IoMdSearch size={26} className="text-secondary" />
const search_icon = <IoMdSearch size={26} className="brand_color" />
const search_cancel_icon = <IoCloseOutline size={26} />
const sponsored_job_star = <TiStarFullOutline size={17} />
const building_icon = <HiOutlineBuildingOffice2 size={20} />
const job_location_icon = <FaLocationDot className="me-2 text-success" />
const time_icon = <FaShoppingBag className="me-2 text-warning" />
const job_duration = <FaRegCalendarAlt className="me-2 text-warning" />
const job_location_non_sponsored = <FaMapMarkedAlt className="me-2 text-warning" />
const save_icon = <FaRegBookmark />
const saved_icon = <FaBookmark />
const share_icon = <FaShare />
const copy_icon = <MdOutlineContentCopy />
const job_apply_info = <MdInfoOutline className="text-warning" size={45} />
const delete_icon = <MdDeleteOutline size={22} />
const upload_icon = <LuUpload className="brand_color" size={45} />
const filter_icon = <FiFilter className="fs-5" />
const remove_icon = <MdOutlineDeleteOutline size={23} />
const suggestion_arrow = <MdArrowOutward className="text-primary" size={25} />
const dollars_icon = <LuDollarSign size={26} />
const plus_icon = <FiPlus size={22} />
const minus_icon = <FiMinus size={22} />
const login_user_icon = <CiUser className="text-primary" size={25} />

const suggestion_left_side_icon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <g clipPath="url(#clip0_918_11921)">
        <path d="M6.99968 13.6615L13.6663 6.99479C13.9779 6.68951 14.2258 6.3255 14.3957 5.92381C14.5657 5.52212 14.6543 5.09072 14.6565 4.65456C14.6587 4.2184 14.5745 3.78612 14.4086 3.38274C14.2427 2.97935 13.9985 2.61286 13.69 2.30444C13.3816 1.99602 13.0151 1.7518 12.6117 1.58591C12.2083 1.42001 11.7761 1.33573 11.3399 1.33793C10.9038 1.34014 10.4724 1.42878 10.0707 1.59874C9.66898 1.7687 9.30496 2.01661 8.99968 2.32813L2.33301 8.9948C2.02149 9.30008 1.77359 9.66409 1.60363 10.0658C1.43366 10.4675 1.34502 10.8989 1.34282 11.335C1.34061 11.7712 1.4249 12.2035 1.59079 12.6069C1.75669 13.0102 2.0009 13.3767 2.30932 13.6852C2.61774 13.9936 2.98424 14.2378 3.38762 14.4037C3.79101 14.5696 4.22328 14.6539 4.65944 14.6517C5.0956 14.6495 5.527 14.5608 5.92869 14.3908C6.33038 14.2209 6.69439 13.973 6.99968 13.6615Z" stroke="#99A1AF" strokeWidth="0.798216" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.66797 5.66992L10.3346 10.3366" stroke="#99A1AF" strokeWidth="0.798216" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
        <clipPath id="clip0_918_11921">
            <rect width="16" height="16" fill="white" />
        </clipPath>
    </defs>
</svg>


const Icons = {
    notificationIcon, close_icon, minimize_icon, tick_mark, job_duration,
    sign_up_warning, email_icon, lock_icon, menuIcon, right_arrow_white,
    down_arrow_icon, close_chatbot_icon, search_icon_gray, search_icon, search_cancel_icon,
    sponsored_job_star, building_icon, job_location_icon, time_icon,
    job_location_non_sponsored, save_icon, saved_icon, share_icon,
    copy_icon, job_apply_info, delete_icon, upload_icon, close_icon_white,
    filter_icon, remove_icon, suggestion_arrow, left_arrow_white, dollars_icon,
    plus_icon, minus_icon, login_user_icon, suggestion_left_side_icon
}
export default Icons