import { BsArrowRight } from "react-icons/bs";

import Feature1Img from "../../../assets/features/feature1.png";
import Feature2Img from "../../../assets/features/feature2.png";
import Feature3Img from "../../../assets/features/feature3.png";
import Feature4Img from "../../../assets/features/feature4.png";
import Feature1BgImg from "../../../assets/features/feature1_bg.png";
import Feature2BgImg from "../../../assets/features/feature2_bg.png";
import Feature3BgImg from "../../../assets/features/feature3_bg.png";
import Feature4BgImg from "../../../assets/features/feature4_bg.png";

const Teachers = () => {
  const featuresData = {
    title: "Popular Instructors",
    subtitle:
      "With our app you can view the route of your order, from our local headquarters to the place where you are. Look for the app now!",
  };
  const list = [
    {
      image: Feature1Img,
      bgImage: Feature1BgImg,
      title: "Payment Done",
      description: "Pay with a Visa or PayPal card and without much ado",
      linkText: "Learn more",
      delay: "400",
    },
    {
      image: Feature2Img,
      bgImage: Feature2BgImg,
      title: "Find Your Product",
      description: "We offer sale of products through the Internet..",
      linkText: "Learn more",
      delay: "700",
    },
    {
      image: Feature3Img,
      bgImage: Feature3BgImg,
      title: "Print Out",
      description:
        "Print out service gives you convenience if someday you need print data, just edit it all and just print it.",
      linkText: "Learn more",
      delay: "1000",
    },
    {
      image: Feature4Img,
      bgImage: Feature4BgImg,
      title: "Product Received",
      description: "In our app you can see the delay time of your order...",
      linkText: "Learn more",
      delay: "1300",
    },
  ];

  const { title, subtitle } = featuresData;
  return (
    <section className="my-[70px] xl:my-[150px]">
      <div className="container mx-auto">
        {/* text */}
        <div className="text-center">
          <h2
            className="h2 mb-6 xl:mb-12"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            {title}
          </h2>
          <p
            className="lead max-w-[584px] mx-auto mb-16 xl:mb-24"
            data-aos="fade-down"
            data-aos-delay="200"
          >
            {subtitle}
          </p>
        </div>
        {/* feature list */}
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
    </section>
  );
};

export default Teachers;
