import { ViewDetailsButton } from '../../../Components/ui/Button';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

export const TradingArticleHeader = ({ showAll, setShowAll }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clipRule="evenodd"
              />
            </svg>
            Hot Topics
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Trending{' '}
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Articles
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            Stay updated with the latest insights and stories
          </p>
        </div>
        <div className="">
          <ViewDetailsButton
            onClick={() => setShowAll(!showAll)}
            text={showAll ? 'Show Less' : 'View All Articles'}
            width={false}
            icon={showAll ? <BsArrowUp /> : <BsArrowDown />}
            className={`px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 `}
          />
        </div>

      </div>
    </div>
  );
};
