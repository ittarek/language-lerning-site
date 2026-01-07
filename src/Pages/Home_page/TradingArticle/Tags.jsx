export const Tags = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.includes('Education') && (
        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg">
          Education
        </span>
      )}
      {tags.includes('Technology') && (
        <span className="px-2 py-1 bg-yellow-50 text-yellow-600 text-xs font-medium rounded-lg">
          Technology
        </span>
      )}
      {tags.includes('AI') && (
        <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-lg">
          AI
        </span>
      )}
      {tags.includes('Tips') && (
        <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-lg">
          Tips
        </span>
      )}
      {tags.includes('Guide') && (
        <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-lg">
          Guide
        </span>
      )}
    </div>
  );
};
