import ReactPaginate from "react-paginate";

export default function Pagination({ page_count = 0, current_page = 0, onPageChange = () => { } }) {

    return (
        <div className="w-100 my-3">
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={'...'}
                pageCount={page_count}
                forcePage={current_page}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                onPageChange={onPageChange}
                containerClassName={"pagination col-12 justify-content-center mb-0"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link "}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    )
}