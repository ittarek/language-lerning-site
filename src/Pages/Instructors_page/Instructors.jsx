import Container from "../../Componets/Container";
import Feature1Img from "../../assets/features/feature1.png";
import Feature2Img from "../../assets/features/feature2.png";
import Feature3Img from "../../assets/features/feature3.png";
import Feature4Img from "../../assets/features/feature4.png";
import Feature1BgImg from "../../assets/features/feature1_bg.png";
import Feature2BgImg from "../../assets/features/feature2_bg.png";
import Feature3BgImg from "../../assets/features/feature3_bg.png";
import Feature4BgImg from "../../assets/features/feature4_bg.png";
import { BsArrowRight } from "react-icons/bs";
import Cover from "../../Componets/Cover";
import { Helmet } from "react-helmet-async";

const Instructors = () => {
  const list = [
    {
      image: Feature1Img,
      bgImage: Feature1BgImg,
      title: "Md Tarek",
      description: "Pay with a Visa or PayPal card and without much ado",
      email: "Ittearek511@gmail.com",
      linkText: "See Classes",

      delay: "400",
    },
    {
      image: Feature2Img,
      bgImage: Feature2BgImg,
      title: "Md Tarek",
      description: "Pay with a Visa or PayPal card and without much ado",
      email: "Ittearek511@gmail.com",
      linkText: "See Classes",
      delay: "700",
    },
    {
      image: Feature3Img,
      bgImage: Feature3BgImg,
      title: "Md Tarek",
      description: "Pay with a Visa or PayPal card and without much ado",
      email: "Ittearek511@gmail.com",
      linkText: "See Classes",
      delay: "1000",
    },
    {
      image: Feature4Img,
      bgImage: Feature4BgImg,
      title: "Md Tarek",
      description: "Pay with a Visa or PayPal card and without much ado",
      email: "Ittearek511@gmail.com",
      linkText: "See Classes",
      delay: "1300",
    },
  ];
  return (
    <Container>
          {/* TOdo */} <Helmet>
        <title>Summer | Instructors</title>
      </Helmet>
      <div className="relative"> <Cover image={Feature4BgImg} title="Our Instructors"></Cover>
        <div className="">
          <h1 className="text-4xl text-purple-700">Out Popular Instructors</h1>
        </div>

        <div className="grid grid-cols-1 gap-[50px] xl:grid-cols-2">
          {list.map((item) => (
            <div>
              <div
                className="w-full max-w-[530px] h-[358px] relative flex flex-col items-center justify-center xl:flex-row xl:justify-start mx-auto"
                data-aos="zoom-in"
                data-aos-offset="100"
                data-aos-delay="400"
              >
                {/* bg image */}
                <div className=" xl:flex absolute top-0 right-0 -z-10">
                  <img src={item.bgImage} />
                </div>

                {/* icon image */}
                <div
                  className="max-w-[120px] xl:mr-7 xl:max-w-[232px]"
                  data-aos="zoom-in-right"
                  data-aos-delay="400"
                >
                  <img src={item.image} />
                </div>
                {/* text */}
                <div className="max-w-[220px]">
                  <h3 className="h3 mb-4">{item.title}</h3>
                  <p className=" mb-4">{item.email}</p>
                  <p className="font-light italic mb-4">{item.description}</p>
                  {/* link & arrow */}
                  <div className="flex items-center gap-x-2 group">
                    <a className="text-primary font-bold" href="#">
                      {item.linkText}
                    </a>
                    <BsArrowRight className="text-xl text-accent-primary group-hover:ml-[5px] transition-all" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Instructors;
