import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import {
    FiPlus,
    FiDownload,
    FiShoppingCart
} from "react-icons/fi";

function Dashboard() {
    return (
        <div style={{ padding: "40px" }}>
            <Card
                title="Dashboard"
                subtitle="Annirich Hardware POS"
            >
                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        flexWrap: "wrap"
                    }}
                >
                    <Button
                        icon={<FiPlus />}
                    >
                        Add Product
                    </Button>

                    <Button
                        variant="secondary"
                        icon={<FiDownload />}
                    >
                        Export
                    </Button>

                    <Button
                        variant="success"
                        icon={<FiShoppingCart />}
                    >
                        New Sale
                    </Button>

                    <Button
                        variant="danger"
                    >
                        Delete
                    </Button>

                    <Button
                        variant="outline"
                    >
                        View Reports
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default Dashboard;