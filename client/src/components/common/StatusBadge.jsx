import clsx from "clsx";

function StatusBadge({ status }) {
    return (
        <span
            className={clsx(
                "status-badge",
                status?.toLowerCase()
            )}
        >
            {status}
        </span>
    );
}

export default StatusBadge;