import Card from "../components/ui/Card";

function Dashboard() {
    return (
        <div style={{ padding: "40px" }}>
            <Card
                title="Dashboard"
                subtitle="Welcome to Annirich POS"
            >
                <h2>Dashboard UI is working 🎉</h2>

                <p>
                    This reusable Card component will be used
                    throughout the application.
                </p>
            </Card>
        </div>
    );
}

export default Dashboard;