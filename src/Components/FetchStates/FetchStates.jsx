import Container from "../Container";

export const LoadingState = ({ message = "Loading..." }) => {
    return (
        <Container>
            <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"
                            style={{ animationDirection: 'reverse' }}></div>
                    </div>
                </div>
                <p className="text-gray-600 font-medium animate-pulse">
                    {message}
                </p>
            </div>
        </Container>
    );
};