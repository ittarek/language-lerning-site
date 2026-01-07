import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BsArrowRight } from 'react-icons/bs';
import ClassCard from './ClassCard';
import Container from '../../../Components/Container';
import SectionTitle from '../../../Components/SectionTitle';
import ClassCardSkeleton from '../../../Components/Skelton/ClassCardSkeleton ';
import { EmptyState } from '../../../Components/Shared/FetchStates/EmptyState';
import { ErrorState } from '../../../Components/Shared/FetchStates/ErrorState';
import { LoadingState } from '../../../Components/Shared/FetchStates/LoadingState';
import useFetchData from '../../../Hooks/useFetchTeacher';

const Popular_classes = () => {
  // TanStack query using for data fetch
  const {
    data: classes = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useFetchData('/classes/top', 'topClasses', {
    staleTime: 3 * 60 * 1000, // Custom stale time: 3 minutes
    refetchOnWindowFocus: true, // Enable refetch on focus
  });

  if (isLoading) {
    return <LoadingState message="Loading popular classes..." />;
  }

  if (isError) {
    return <ErrorState error={error} onRetry={refetch} isRetrying={isFetching} />;
  }

  if (classes.length === 0) {
    return (
      <EmptyState
        title="No Classes Available"
        message="Check back soon for new classes!"
        icon="📚"
        onRefresh={refetch}
      />
    );
  }
  return (
    <Container>
      <div className="py-16">
        {/* Section Header */}
        <div className="mb-12">
          <SectionTitle
            variant="gradient-text"
            title="Top Classes"
            gradientText="Classes"
            summary="Select the plan that best fits your learning goals."
            color="indigo"
          />
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 max-w-7xl mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {isLoading
            ? // Skeleton loaders while loading
              [...Array(8)].map((_, index) => <ClassCardSkeleton key={index} />)
            : // Actual cards when data is loaded
              classes
                .slice(0, 8)
                .map(singleClass => (
                  <ClassCard key={singleClass._id} singleClass={singleClass} />
                ))}
        </div>

        {/* See All Button */}
        <div className="flex justify-center mt-12">
          <Link to="/classes">
            <button className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3">
              <span>See All Classes</span>
              <BsArrowRight className="text-2xl group-hover:translate-x-2 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Popular_classes;
