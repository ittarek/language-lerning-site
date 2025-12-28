export const FetchingIndicator = ({ isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-slide-up z-50">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium">Updating...</span>
        </div>
    );
};

// src/Components/FetchStates/index.js - Export all
export { LoadingState } from './LoadingState';
export { ErrorState } from './ErrorState';
export { EmptyState } from './EmptyState';
export { FetchingIndicator } from './FetchingIndicator';