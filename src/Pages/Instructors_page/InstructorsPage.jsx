import Container from '../../Components/Container';
import Feature4BgImg from '../../assets/features/feature4_bg.png';
import { FaChalkboardTeacher } from 'react-icons/fa';
import Cover from '../../Components/Cover';
import { Helmet } from 'react-helmet-async';
import useClass from '../../Hooks/useClass';
import InstructorCard from './InstructorsPageCard';
import { LoadingState } from '../../Components/Shared/FetchStates/LoadingState';
import { useMemo } from 'react';
import { OutlineButton } from '../../Components/ui/Button';

const Instructors = () => {
  const [classes, loading, refetch, error] = useClass();

  const sortedInstructors = useMemo(() => {
    if (!classes || !Array.isArray(classes)) return [];

    // Step 1: Get unique instructors
    const instructorMap = new Map();

    classes.forEach(classItem => {
      if (classItem.instructor_email && !instructorMap.has(classItem.instructor_email)) {
        instructorMap.set(classItem.instructor_email, classItem);
      }
    });

    const uniqueInstructors = Array.from(instructorMap.values());

    // Step 2: Sort by updated_at (Newest First)
    const sorted = uniqueInstructors.sort((a, b) => {
      const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
      const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0;

      // DESCENDING - Newest first
      return dateB - dateA;
    });

    // Debug: Print sorted order

    return sorted;
  }, [classes]);

  return (
    <>
      <Helmet>
        <title>Language Learner | Instructors</title>
      </Helmet>

      <Container>
        <div className="relative">
          <Cover
            image={Feature4BgImg}
            title="Meet Our Expert Instructors"
            subtitle="Professional • Reliable • Innovative"
            overlayOpacity={58}
            height="50vh"
            strength={-240}
          />

          <div className="py-16">
            {loading ? (
              <LoadingState message="Loading instructors..." />
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md text-center">
                  <FaChalkboardTeacher className="text-6xl text-red-300 mx-auto mb-4" />
                  <p className="text-red-600 font-semibold mb-2">
                    Failed to Load Instructors
                  </p>
                  <p className="text-red-500 text-sm mb-4">
                    {error.message || 'Something went wrong'}
                  </p>
                  <OutlineButton
                    onClick={() => refetch()}
                    text="Try Again"
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  />
                </div>
              </div>
            ) : sortedInstructors.length > 0 ? (
              <>
                {/* Debug Info - Remove in production */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-7xl mx-auto">
                  <p className="text-sm text-blue-800">
                    🔍 <strong>Debug Info:</strong> Showing {sortedInstructors.length}{' '}
                    instructors sorted by updated_at (newest first)
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    First: {sortedInstructors[0]?.instructor_name} (
                    {sortedInstructors[0]?.updated_at || 'No date'})
                  </p>
                  <p className="text-xs text-blue-600">
                    Last:{' '}
                    {sortedInstructors[sortedInstructors.length - 1]?.instructor_name} (
                    {sortedInstructors[sortedInstructors.length - 1]?.updated_at ||
                      'No date'}
                    )
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  {sortedInstructors.map((instructor, index) => (
                    <div key={instructor.instructor_email || instructor._id}>
                      {/* Index badge for debugging */}
                      <div className="text-xs text-gray-500 mb-2">
                        #{index + 1} - Updated: {instructor.updated_at || 'No date'}
                      </div>
                      <InstructorCard instructor={instructor} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <FaChalkboardTeacher className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-600 mb-2">
                  No Instructors Found
                </h3>
                <p className="text-gray-500">
                  Check back soon for our amazing instructors!
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Instructors;
