import { FaBook, FaDollarSign, FaUser, FaRegStar } from 'react-icons/fa';
import './classesCard.css';
// Skeleton Loader Component matching ClassCard structure
const ClassCardSkeleton = () => {
    return (
        <div className="single__classes__item  card rounded-2xl bg-base-100 shadow-xl mx-auto gap-5 mb-4">
            {/* Image Skeleton with shimmer animation */}
            <div className="course__img relative overflow-hidden">
                <div className="w-full h-64 rounded-2xl bg-gray-300 animate-pulse relative">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                </div>
            </div>

            <div className="course__details p-4 space-y-4">
                {/* Title Skeleton */}
                <div className="h-6 bg-gray-300 rounded animate-pulse w-3/4 mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                </div>

                {/* Lesson, Students, Price Info Skeleton */}
                <div className="flex justify-between items-center">
                    <div className="lesson flex items-center gap-1">
                        <FaBook className="text-gray-300" />
                        <div className="h-4 bg-gray-300 rounded animate-pulse w-16 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                        </div>
                    </div>
                    <div className="lesson flex items-center gap-1">
                        <FaUser className="text-gray-300" />
                        <div className="h-4 bg-gray-300 rounded animate-pulse w-16 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                        </div>
                    </div>
                    <div className="students flex items-center gap-1">
                        <FaDollarSign className="text-gray-300" />
                        <div className="h-4 bg-gray-300 rounded animate-pulse w-12 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                        </div>
                    </div>
                </div>

                {/* Rating and Enroll Button Skeleton */}
                <div className="flex justify-between items-center">
                    <div className="rating flex items-center gap-1">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <FaRegStar key={i} className="text-gray-300" />
                            ))}
                        </div>
                        <div className="h-4 bg-gray-300 rounded animate-pulse w-10 ml-2 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                        </div>
                    </div>
                    <div className="h-8 bg-gray-300 rounded animate-pulse w-24 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassCardSkeleton;