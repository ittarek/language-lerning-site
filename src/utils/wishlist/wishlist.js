import { toast } from 'react-toastify';

// handle bookmark for wishlist
export const handleWishlist = (
  id,
  type,
  setIsBookmarked,
  user,
  // optional - শুধু WishlistSystem page এ দরকার
  setWishlistIds = null,
  setTabs = null
) => {
  try {
    if (!user) {
      toast.warn('Please login first! 🔒', { autoClose: 2000 });
      return;
    }

    const wishlist = JSON.parse(localStorage.getItem('classData')) || {};
    const currentWishlist = Array.isArray(wishlist[type]) ? wishlist[type] : [];
    let updatedWishlist;

    if (currentWishlist.includes(id)) {
      // Remove
      updatedWishlist = currentWishlist.filter(item => item !== id);
      setIsBookmarked(false);
      toast.info('Removed from wishlist', { autoClose: 2000 });
    } else {
      // Add
      updatedWishlist = [...currentWishlist, id];
      setIsBookmarked(true);
      toast.success('Added to wishlist! ❤️', { autoClose: 2000 });
    }

    const newWishlist = { ...wishlist, [type]: updatedWishlist };
    localStorage.setItem('classData', JSON.stringify(newWishlist));

    // WishlistSystem page এর state update (optional)
    if (setWishlistIds) {
      setWishlistIds(newWishlist);
    }
    if (setTabs) {
      const existingTabs = Object.keys(newWishlist).filter(
        key => newWishlist[key]?.length > 0
      );
      setTabs(existingTabs);
    }
  } catch (err) {
    console.error(err);
    toast.error('Something went wrong!');
  }
};
