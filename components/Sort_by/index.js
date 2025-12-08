"use client";

export default function SortBy({
    options = [], value = "",
    change = () => { },
    className = "", default_option = ""
}) {

    const uniqueKey = Math.random().toString(36).substring(2, 15);

    return (
        <div className={`btn-group ${className} custom_dropdown`}>
            <button className="btn border bg-white dropdown-toggle px-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {default_option || (options.find(opt => opt.value === value)?.label) || "Sort By"}
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
                {options?.map((item, ind) => {
                    return <li key={uniqueKey + ind}><a className="dropdown-item" onClick={() => change(item.value)}>{item.label}</a></li>
                })}
            </ul>
        </div>
    )
}