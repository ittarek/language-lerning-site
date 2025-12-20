import Container from "../../Components/Container";

const courseData = [
    {
        id: 1,
        name: "Language",
        title: "Principles of Written English, Part 2",
        img: "https://images.unsplash.com/photo-1555431189-0fabf2667795?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        price: 40,
        details:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quisquam!",
    },
    {
        id: 2,
        name: "Computer",
        title: "Introduction to Computer Science",
        img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        price: 100,
        details:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quisquam!",
    },
    {
        id: 3,
        name: "Medicine",
        title: "Introduction to Biomedical Imaging",
        img: "https://images.unsplash.com/photo-1614294168453-84a363686839?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        price: 400,
        details:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quisquam!",
    },
    {
        id: 4,
        name: "Marketing",
        title: "Entrepreneurship 101: Who is your customer?",
        img: "https://plus.unsplash.com/premium_photo-1661414415246-3e502e2fb241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        price: 40,
        details:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quisquam!",
    },
    {
        id: 5,
        name: "Social",
        title: "Principles of Written Social, Part 2",
        img: "https://plus.unsplash.com/premium_photo-1678914045640-55a120a8f849?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        price: "Free",
        details:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quisquam!",
    },
    {
        id: 6,
        name: "Digital Marketing",
        title: "Principles of Digital Marketing, Part 2",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80",
        price: 40,
        details:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quisquam!",
    },
];
const StartingCourse = () => {
    return (
        <Container>
            <div className="my-11 ">
                <h1 className="text-center text-4xl text-bold">Course Starting Soon</h1>
            </div>
            <div className="grid grid-cols-1 gap-[50px] xl:grid-cols-3 mx-11">
                {courseData.map((course, id, index) => (
                    <div key={id} className="card card-compact w-full bg-base-100 shadow-xl hover:-translate-x-5 hover:transform-origin-top transition duration-500 hover:bg-orange-300 ">
                        <figure>
                            <img
                                className="hover:scale-110 transition duration-500 cursor-pointer object-cover"
                                src={course.img}
                                alt="Shoes"
                            />
                        </figure>
                        <div className="  opacity-0 hover:opacity-100 transform-all duration-300  ">
                            <p>{course.details}</p>
                            <button className="btn my-6">Learn More</button>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title">{course.name}</h2>

                            <div className="card-actions justify-end">
                                <p className="">{course.price}$</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default StartingCourse;
