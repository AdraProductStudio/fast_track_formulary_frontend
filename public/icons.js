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
const login_user_icon = <CiUser className="text-white" size={30} />


const Icons = {
    notificationIcon, close_icon, minimize_icon, tick_mark, job_duration,
    sign_up_warning, email_icon, lock_icon, menuIcon, right_arrow_white,
    down_arrow_icon, close_chatbot_icon, search_icon_gray, search_icon, search_cancel_icon,
    sponsored_job_star, building_icon, job_location_icon, time_icon,
    job_location_non_sponsored, save_icon, saved_icon, share_icon,
    copy_icon, job_apply_info, delete_icon, upload_icon, close_icon_white,
    filter_icon, remove_icon, suggestion_arrow, left_arrow_white, dollars_icon,
    plus_icon, minus_icon, login_user_icon
}
export default Icons