import { BlogCard } from "./BlogCard";

export const LatestBlog = ({ filteredPosts, categoryIcons }) => {
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div>
      {filteredPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map(post => (
            <BlogCard key={post.id} post={post} categoryIcons={categoryIcons} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Articles Found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};
