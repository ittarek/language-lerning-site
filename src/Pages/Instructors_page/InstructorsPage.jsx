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
  // ✅ Get loading, refetch, and error states
  const [classes, loading, refetch, error] = useClass();

  // ✅ FIXED: Filter unique instructors and memoize
  const uniqueInstructors = useMemo(() => {
    if (!classes || !Array.isArray(classes)) return [];

    const instructorMap = new Map();

    classes.forEach(classItem => {
      // Use instructor_email as unique identifier
      if (classItem.instructor_email && !instructorMap.has(classItem.instructor_email)) {
        instructorMap.set(classItem.instructor_email, classItem);
      }
    });

    return Array.from(instructorMap.values());
  }, [classes]);
  const sortedInstructors = [...classes].sort((a, b) => {
    return new Date(b.updated_at) - new Date(a.updated_at);
  });
  return (
    <>
      <Helmet>
        <title>Language Learner | Instructors</title>
      </Helmet>

      <Container>
        <div className="relative">
          {/* Cover Section */}
          {/* <Cover image={Feature4BgImg} title="Meet Our Expert Instructors" /> */}
          <Cover
            image={Feature4BgImg}
            title="Meet Our Expert Instructors"
            subtitle="Professional • Reliable • Innovative"
            overlayOpacity={58}
            height="50vh"
            strength={-240}>
            {/* <button className="btn btn-primary btn-lg">Get Started</button>
            <button className="btn btn-outline btn-lg">Contact Us</button> */}
          </Cover>
          {/* Instructors Grid */}
          <div className="py-16">
            {/* ✅ Loading State */}
            {loading ? (
              <LoadingState message="  Loading instructors..." />
            ) : error ? (
              /* ✅ Error State */
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
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 "
                  />
                </div>
              </div>
            ) : sortedInstructors.length > 0 ? (
              /* ✅ Success State - Instructors Found */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {sortedInstructors.map((instructor, index) => (
                  <InstructorCard
                    key={instructor.instructor_email || instructor._id}
                    instructor={instructor}
                  />
                ))}
              </div>
            ) : (
              /* ✅ Empty State - No Instructors */
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
