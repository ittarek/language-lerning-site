import Container from "../../Container";

export const EmptyState = ({
    title = "No Data Found",
    message = "We couldn't find any data at the moment",
    icon = "📭",
    onRefresh
}) => {
    return (
        <Container>
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                    <div className="text-8xl mb-6">{icon}</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                        {message}
                    </p>
                    {onRefresh && (
                        <button
                            onClick={onRefresh}
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
                        >
                            Refresh
                        </button>
                    )}
                </div>
            </div>
        </Container>
    );
};