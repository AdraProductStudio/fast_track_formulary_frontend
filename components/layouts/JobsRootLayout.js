"use client";

import { professional_json } from "~/json/json_data/professional";
import LinkComponent from "~/components/Link";
import { SearchComponent } from "~/components/Search";

export default function ProfessionalJobsLayout({ show_detailed_job_only_for_small_devices, children, setStateFun, state, search_function, clear_search_function }) {

    return (
        <>
            <header className={show_detailed_job_only_for_small_devices ? 'd-none' : "professional_jobs_header"}>
                <div className="d-flex flex-wrap align-items-center">
                    <div className="col-12 col-xl p-3 bg-white rounded-3 m-1">
                        <div className="w-100 d-flex flex-wrap">
                            {professional_json.professional_jobs_nav_paths.map((nav_item, index) => (
                                <div className="col-3 text-center" key={index}>
                                    <LinkComponent href={nav_item.nav_link_path}>{nav_item.nav_link}</LinkComponent>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-12 col-xl m-1">
                        {state?.loading ?
                            <div className="w-100 placeholder-glow">
                                <div className="col-12 placeholder rounded-2" style={{ height: "40px" }}></div>
                            </div>
                            :
                            <SearchComponent className="search_component" setState={setStateFun} value={state.search_text} onClick={search_function} clear_search={clear_search_function} placeholder="Search by job title, description, company name" />
                        }
                    </div>
                </div>
            </header>

            <main className={show_detailed_job_only_for_small_devices ? "pt-3 professional_jobs_body_small_device" : "professional_jobs_body"}>
                {children}
            </main>
        </>
    )
}