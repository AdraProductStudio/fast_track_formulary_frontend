// app/layout.js
import "bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap-client";
import "~/stylesheet/css/globals.css";
import "~/stylesheet/css/index.css";
import "~/stylesheet/css/responsive.css";
import "~/stylesheet/css/keyframes.css";
import { Images } from "~/public/image";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ClientRootLayout from "~/components/layouts/ClientRootLayout";
import MaintananceMode from "./main_break_validator";

const poppins = Poppins({
  subsets: [""],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  metadataBase: new URL("https://fasttrackformulary.com"),
  title: "Fast Track Formulary — The Professional Network",
  description: "Fast Track Formulary.",
  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    type: "website",
    siteName: "Fast Track Formulary",
    url: "https://fasttrackformulary.com",
    title: "Fast Track Formulary",
    description: "Fast Track Formulary.",
    images: [
      {
        // url: Images.infinite_logo,
        width: 1200,
        height: 630,
        alt: "Fast Track Formulary Social Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@Fast Track Formulary",
    title: "Fast Track Formulary — The Professional Network",
    description: "Fast Track Formulary.",
    // images: [Images.infinite_logo],
  },

  applicationName: "Fast Track Formulary",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <Toaster />
        <ClientRootLayout>
          <MaintananceMode>
            {children}
          </MaintananceMode>
        </ClientRootLayout>
      </body>
    </html>
  );
}
