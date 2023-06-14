import React from "react";
import useClass from "../../Hooks/useClass";
import Container from "../../Componets/Container";

const InsTructionFeedBack = () => {
  const [classes] = useClass();

  return (
    <div className="w-full ">
      <Container>
        <div>
          Feedback :{" "}
          {classes.map((feedback) => (
            <div> {feedback.feedback && <p>{feedback.feedback}</p>}</div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default InsTructionFeedBack;
