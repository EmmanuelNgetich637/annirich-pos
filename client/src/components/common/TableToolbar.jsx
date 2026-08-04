import { FiPlus, FiSearch } from "react-icons/fi";

function TableToolbar() {
    return (
        <div className="table-toolbar">

            <div className="search-box">

                <FiSearch />

                <input
                    type="text"
                    placeholder="Search..."
                />

            </div>

            <button className="primary-btn">

                <FiPlus />

                Add New

            </button>

        </div>
    );
}

export default TableToolbar;