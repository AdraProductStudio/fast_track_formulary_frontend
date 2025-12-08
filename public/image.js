const logo_image = require('./image/logo.png');
const med_search_layout_bg = require('./image/med_search_layout_bg.png');
const med_search_side_img = require('./image/med_search_side_img.png');

const infinite_logo = `${process.env.NEXT_PUBLIC_URL_SECOND_CAREERS_CDN}2nd_careers_infinite_logo.png`;
const reset_password_side_image = `${process.env.NEXT_PUBLIC_URL_SECOND_CAREERS_CDN}resetPasswordSideImage.png`;
const notification_logo_icon = `${process.env.NEXT_PUBLIC_URL_SECOND_CAREERS_CDN}logo2nd.png`;
const empty_notification = `${process.env.NEXT_PUBLIC_URL_SECOND_CAREERS_CDN}emptyNotification.png`;
const employer_default_job = `${process.env.NEXT_PUBLIC_URL_SECOND_CAREERS_CDN}employer/logo/default_profile_picture_employer.png`;
const page_not_found = `${process.env.NEXT_PUBLIC_URL_SECOND_CAREERS_CDN}not found.png`;
const no_data_image = `https://devcdn.2ndcareers.com/No_data.png`;

const gmail_image = require('./image/gmail_image.png');
const resource_pdf = require('./image/resource_pdf.png');

export const Images = {
    logo_image, infinite_logo, notification_logo_icon, gmail_image,
    reset_password_side_image, employer_default_job, empty_notification, resource_pdf,
    page_not_found, no_data_image, med_search_layout_bg, med_search_side_img
}