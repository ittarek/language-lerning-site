import { toast } from 'react-toastify';

// handle bookmark for wishlist
export const handleWishlist = (id, type, setIsBookmarked, user) => {
  try {
    if (!user) {
      toast.warn('Please login first! 🔒', { autoClose: 2000 });
      return;
    }

    const wishlist = JSON.parse(localStorage.getItem('classData')) || {};
    const currentWishlist = Array.isArray(wishlist[type]) ? wishlist[type] : [];
    let updatedWishlist;

    if (currentWishlist.includes(id)) {
      updatedWishlist = currentWishlist.filter(item => item !== id);
      setIsBookmarked(false);
      toast.info('Removed from wishlist', { autoClose: 2000 });
    } else {
      updatedWishlist = [...currentWishlist, id];
      setIsBookmarked(true);
      toast.success('Added to wishlist! ❤️', { autoClose: 2000 });
    }

    localStorage.setItem(
      'classData',
      JSON.stringify({ ...wishlist, [type]: updatedWishlist })
    );
  } catch (err) {
    console.error(err);
    toast.error('Something went wrong!');
  }
};