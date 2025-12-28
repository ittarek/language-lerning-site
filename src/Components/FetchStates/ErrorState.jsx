import { FaExclamationTriangle, FaRedo } from "react-icons/fa";
import Container from "../Container";

export const ErrorState = ({ error, onRetry, isRetrying = false }) => {
    return (
        <Container>
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                        <FaExclamationTriangle className="text-3xl text-red-600" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Oops! Something Went Wrong
                    </h3>

                    <p className="text-red-600 mb-6">
                        {error?.message || 'Unable to load data. Please try again.'}
                    </p>

                    <button
                        onClick={onRetry}
                        disabled={isRetrying}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaRedo className={isRetrying ? 'animate-spin' : ''} />
                        {isRetrying ? 'Retrying...' : 'Try Again'}
                    </button>

                    <p className="text-sm text-gray-500 mt-4">
                        If the problem persists, please contact support
                    </p>
                </div>
            </div>
        </Container>
    );
};