import { toast } from 'react-toastify';

// handle bookmark for wishlist
export const handleWishlist = (id, type, setIsBookmarked) => {
  const wishlist = JSON.parse(localStorage.getItem('classData')) || {};
  // create array if no id
  const currentWishlist = wishlist[type] || [];
  let updatedWishlist;

  if (currentWishlist.includes(id)) {
    // remove
    updatedWishlist = currentWishlist.filter(item => item !== id);
    setIsBookmarked(false);
    toast.info('Removed from wishlist', {
      position: 'top-right',
      autoClose: 2000,
    });
  } else {
    // add
    updatedWishlist = [...currentWishlist, id];
    setIsBookmarked(true);
    toast.success('Added to wishlist! ❤️', {
      position: 'top-right',
      autoClose: 2000,
    });
  }

  localStorage.setItem(
    'classData',
    JSON.stringify({ ...wishlist, [type]: updatedWishlist })
  );
};
