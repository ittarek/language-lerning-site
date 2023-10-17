import React from 'react';
import Container from '../../Componets/Container';

const news = [
  {
    title: "Donec molestie in libero nec lobortis nec",
    date: "24.05.2014",
    details:
      "Sed volutpat purus non odio maximus, eget ultrices mauris rutrum. Phasellus non diam in neque interdum gravida.",
    comments: "2",
    img: "https://plus.unsplash.com/premium_photo-1661255378914-d0934128d91d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    title: "Donec molestie in libero nec lobortis nec",
    date: "24.05.2014",
    details:
      "Sed volutpat purus non odio maximus, eget ultrices mauris rutrum. Phasellus non diam in neque interdum gravida.",
    comments: "2",
    img: "https://images.unsplash.com/photo-1593697821094-53ed19153f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    title: "Donec molestie in libero nec lobortis nec",
    date: "24.05.2014",
    details:
      "Sed volutpat purus non odio maximus, eget ultrices mauris rutrum. Phasellus non diam in neque interdum gravida.",
    comments: "2",
    img: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
  },
  {
    title: "Donec molestie in libero nec lobortis nec",
    date: "24.05.2014",
    details:
      "Sed volutpat purus non odio maximus, eget ultrices mauris rutrum. Phasellus non diam in neque interdum gravida.",
    comments: "2",
    img: "https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1436&q=80",
  },
];
const TrandingArticle = () => {
    return (
      <Container>
        <div className="my-11 mx-11">
          <h1 className="text-start text-4xl mb-11 uppercase">
            Trending ARTICLES{" "}
          </h1>

          <div className="grid grid-cols-1 xl:grid-cols-2  mx-auto">
            {news.map((n, index) => (
              <div key={index} className="w-full">
                <div>
                  <img
                    className="w-[250px] h-[250px] hover:scale-110 transition duration-500 cursor-pointer object-cover"
                    src={n.img}
                    alt=""
                  />
                </div>
                <div className="card p-3  lg:w-[400px] w-72 bg-[#FFFFFF] relative -top-[220px] left-[190px] shadow-xl">
                  <h1>{n.title}</h1>
                  <div className="flex gap-6">
                    <p>{n.date}</p>
                    <p>{n.comments} comments</p>
                  </div>{" "}
                  <hr />
                  <p className="text-italic">{n.details}</p>
                  <button className="btn btn-outline w-24 bg-transparent">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    );
};

export default TrandingArticle;