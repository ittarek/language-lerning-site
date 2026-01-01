import Container from "../../Components/Container";
import { Helmet } from "react-helmet-async";
import ClassCArd from "./ClassCArd";
import useClass from "../../Hooks/useClass";
import SliderClass from "./SliderClass";



const Classes = () => {
    const [classes, refetch] = useClass();
    const approvedClass = classes.filter(
        (filterClass) => filterClass.status === "approved"
    );


    return (
        <div>
            <Helmet>
                <title>Language Learner | Classes</title>
            </Helmet>
            <Container>
                <section className="relative -top-[69px] ">
                    <div className="">
                        <div className="bg-dark" data-aos="fade-up" data-aos-offset="300">
                            <div className="w-full h- bg-[#c9cbb2] flex items-center justify-center">
                                <SliderClass />
                            </div>{" "}
                    
                            <div className="grid lg:grid-cols-3 mt-11  gap-10">
                                {" "}
                                {approvedClass.map(classes => (
                                    <ClassCArd
                                        key={classes._id}
                                        classes={classes}
                                        refetch={refetch}
                                    ></ClassCArd>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
        </div>
    );
};

export default Classes;
