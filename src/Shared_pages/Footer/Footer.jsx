import NewsLettar from "./NewsLatter/NewsLettar";

const Footer = () => {
  return (
    <div className="relative">
       <div className="">
        <NewsLettar></NewsLettar>
       </div>
      <footer className="footer p-10 bg-base-200 text-base-content  ">
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
      <footer className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
        <div className="mx-auto">
          <p>CopyWrite Providing reliable 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
