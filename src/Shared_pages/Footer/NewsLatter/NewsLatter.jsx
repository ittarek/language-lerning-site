
const NewsLatter = () => {
    return (

        <div className="newsletter bg-[#17bf9e] w-full md:w-[850px]  -mb-8 relative mx-auto md:p-[60px] p-[10px] rounded-[16px]">
            <div className="text-center">
                <h2 className="mb-4">Subscribe Our Newsletter</h2>
                <div className="subscribe md:w-[45%] w-full bg-[#fff] rounded-[50px] mx-auto py-[7px] px-[10px]">
                    <input className='border-0 outline-none ' type="text" placeholder="Email" />
                    <button className="btn">Subscribe</button>
                </div>
            </div>
        </div>

    );
};

export default NewsLatter;