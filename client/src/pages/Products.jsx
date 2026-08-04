import PageHeader from "../components/common/PageHeader";
import TableToolbar from "../components/common/TableToolbar";
import DataTable from "../components/common/DataTable";
import ProductRow from "../components/products/ProductRow";
import ProductStats from "../components/products/ProductStats";

import products from "../data/products";

function Products() {

    const columns = [
        "Barcode",
        "Product",
        "Category",
        "Buying",
        "Selling",
        "Stock",
        "Status",
        "Actions"
    ];

    return (
        <>

            <PageHeader
                title="Products"
                subtitle="Manage your inventory products."
                action={
                    <button className="primary-btn">
                        Add Product
                    </button>
                }
            />

            <ProductStats />

            <TableToolbar />

            <DataTable columns={columns}>

                {

                    products.map((product) => (

                        <ProductRow
                            key={product.id}
                            product={product}
                        />

                    ))

                }

            </DataTable>

        </>
    );

}

export default Products;