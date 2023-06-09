import React from "react";

const Mood = () => {
  return (
    <div>
      <div className="relative ml-4 flex">
        <label
          className="sr-only"
          id="headlessui-listbox-label-:R6l6:"
          data-headlessui-state=""
        >
          Theme
        </label>
        <button
          type="button"
          className="text-black outline-none hover:!text-primary dark:text-white"
          id="headlessui-listbox-button-:Ral6:"
          aria-haspopup="listbox"
          aria-expanded="false"
          data-headlessui-state=""
          aria-labelledby="headlessui-listbox-label-:R6l6: headlessui-listbox-button-:Ral6:"
        >
          <span className="dark:hidden">
            <svg
              fill="currentcolor"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 56 56"
              className="h-6 w-6"
            >
              <path d="M 30.0391 4.6094 C 30.0391 3.5078 29.1016 2.5703 28.0001 2.5703 C 26.8985 2.5703 25.9610 3.5078 25.9610 4.6094 L 25.9610 9.5312 C 25.9610 10.6328 26.8985 11.5703 28.0001 11.5703 C 29.1016 11.5703 30.0391 10.6328 30.0391 9.5312 Z M 39.5782 13.5390 C 38.8047 14.3359 38.8047 15.6484 39.5782 16.4219 C 40.3751 17.2187 41.6642 17.2422 42.4844 16.4219 L 45.9766 12.9297 C 46.7737 12.1328 46.7737 10.8203 45.9766 10.0234 C 45.2032 9.25 43.8907 9.25 43.0938 10.0234 Z M 13.5157 16.4219 C 14.2891 17.2187 15.6016 17.2187 16.3985 16.4219 C 17.1720 15.6719 17.1720 14.3125 16.4220 13.5390 L 12.9298 10.0234 C 12.1798 9.2734 10.8438 9.25 10.0469 10.0234 C 9.2735 10.7968 9.2735 12.1328 10.0235 12.9063 Z M 28.0001 16.0468 C 21.4610 16.0468 16.0469 21.4609 16.0469 28.0000 C 16.0469 34.5390 21.4610 39.9766 28.0001 39.9766 C 34.5157 39.9766 39.9298 34.5390 39.9298 28.0000 C 39.9298 21.4609 34.5157 16.0468 28.0001 16.0468 Z M 51.3203 30.0390 C 52.4219 30.0390 53.3593 29.1016 53.3593 28.0000 C 53.3593 26.8984 52.4219 25.9609 51.3203 25.9609 L 46.4220 25.9609 C 45.3204 25.9609 44.3829 26.8984 44.3829 28.0000 C 44.3829 29.1016 45.3204 30.0390 46.4220 30.0390 Z M 4.6798 25.9609 C 3.5782 25.9609 2.6407 26.8984 2.6407 28.0000 C 2.6407 29.1016 3.5782 30.0390 4.6798 30.0390 L 9.5782 30.0390 C 10.6798 30.0390 11.6173 29.1016 11.6173 28.0000 C 11.6173 26.8984 10.6798 25.9609 9.5782 25.9609 Z M 42.4610 39.6016 C 41.6642 38.8281 40.3751 38.8281 39.5782 39.6016 C 38.8047 40.3750 38.8047 41.6875 39.5782 42.4844 L 43.0938 46.0000 C 43.8907 46.7734 45.2032 46.7500 45.9766 45.9766 C 46.7737 45.2031 46.7737 43.8906 45.9766 43.0937 Z M 10.0235 43.0703 C 9.2266 43.8437 9.2266 45.1797 10.0001 45.9531 C 10.7735 46.7266 12.1094 46.7500 12.9063 45.9766 L 16.3985 42.4844 C 17.1720 41.7109 17.1720 40.3984 16.4220 39.6016 C 15.6485 38.8281 14.3126 38.8281 13.5157 39.6016 Z M 30.0391 46.4687 C 30.0391 45.3672 29.1016 44.4297 28.0001 44.4297 C 26.8985 44.4297 25.9610 45.3672 25.9610 46.4687 L 25.9610 51.3906 C 25.9610 52.4922 26.8985 53.4297 28.0001 53.4297 C 29.1016 53.4297 30.0391 52.4922 30.0391 51.3906 Z"></path>
            </svg>
          </span>
          <span className="hidden dark:inline">
            <svg
              fill="currentcolor"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 56 56"
              className="h-6 w-6"
            >
              <path d="M 31.2110 14.9453 C 31.4922 14.9453 31.6563 14.7578 31.7031 14.5000 C 32.4297 10.6094 32.4063 10.5156 36.4610 9.7187 C 36.7422 9.6719 36.9063 9.5312 36.9063 9.2500 C 36.9063 8.9453 36.7422 8.8047 36.4610 8.7578 C 32.4063 7.9375 32.4297 7.8672 31.7031 3.9765 C 31.6563 3.7187 31.4922 3.5312 31.2110 3.5312 C 30.9297 3.5312 30.7891 3.7187 30.7422 3.9765 C 29.9922 7.8672 30.0391 7.9375 25.9610 8.7578 C 25.7031 8.8047 25.5157 8.9453 25.5157 9.2500 C 25.5157 9.5312 25.7031 9.6719 25.9610 9.7187 C 30.0626 10.5156 29.9922 10.6094 30.7422 14.5000 C 30.7891 14.7578 30.9297 14.9453 31.2110 14.9453 Z M 42.4375 30.7891 C 42.8594 30.7891 43.1641 30.4844 43.2110 30.0391 C 43.9844 23.7578 44.2891 23.5703 50.6406 22.5860 C 51.1561 22.4922 51.4609 22.2578 51.4609 21.7891 C 51.4609 21.3438 51.1561 21.0625 50.7342 20.9922 C 44.3360 19.7734 43.9844 19.8203 43.2110 13.5391 C 43.1641 13.0938 42.8594 12.7891 42.4375 12.7891 C 41.9922 12.7891 41.6875 13.0938 41.6407 13.5156 C 40.8204 19.8672 40.6094 20.0781 34.1172 20.9922 C 33.6953 21.0391 33.3907 21.3438 33.3907 21.7891 C 33.3907 22.2344 33.6953 22.4922 34.1172 22.5860 C 40.6094 23.7812 40.8438 23.8047 41.6407 30.0860 C 41.6875 30.4844 41.9922 30.7891 42.4375 30.7891 Z M 24.7891 52.4688 C 33.2735 52.4688 40.0469 48.1797 43.2813 40.9609 C 43.6797 40.0938 43.6094 39.3438 43.1875 38.9453 C 42.8126 38.5938 42.1563 38.5469 41.4297 38.8047 C 39.5313 39.5547 37.3047 39.9297 34.7500 39.9297 C 24.1094 39.9297 17.3126 33.2734 17.3126 22.8906 C 17.3126 19.9375 17.8750 17.1016 18.6016 15.6485 C 19.0000 14.8281 19.0000 14.1250 18.6485 13.6797 C 18.2266 13.2109 17.4766 13.1406 16.5626 13.4922 C 9.3672 16.3281 4.5391 23.9687 4.5391 32.5469 C 4.5391 43.9609 12.9531 52.4688 24.7891 52.4688 Z"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Mood;