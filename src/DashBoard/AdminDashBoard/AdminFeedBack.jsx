import React from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import useClass from "../../Hooks/useClass";
const AdminFeedBack = () => {

          const [classes] = useClass()
          console.log(classes);
  const notify = () => {
    toast("This Button is Disabled !!!", {
      icon: "👏",
    });
  };
  const handleFeedBack = (e) => {
    e.preventDefault();
    const form = e.target;
    const feedBack = form.feedBack.value;
    console.log("feedback", feedBack);
    fetch(`${import.meta.env.VITE_API_URL}/adminFeedBack`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(feedBack),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      <Helmet>
        <title>Language Learner | Admin FeedBack</title>
      </Helmet>
      <p className="text-green-700 text-2xl mb-4">Write Your FeedBack</p>
      <form onSubmit={handleFeedBack}>
        <textarea
          className="w-full border-4 border-red-950 rounded-lg"
          name="feedBack"
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <input
          className="btn btn-success btn-square w-full hover hover:bg-slate-700 hover:text-white hover:shadow-xlg"
          type="submit"
          value="Send Feedback"
        />
      </form>
    </div>
  );
};

export default AdminFeedBack;
