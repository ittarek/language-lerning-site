// Glass Navigation Button Component
export const GlassNavButton = ({ item, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex flex-col items-center gap-1 m-auto md:w-16 md:h-16 p-2 rounded-full
      border-none transition-all duration-300 cursor-pointer
      ${isActive ? 'nav-glass-active' : 'nav-glass-inactive'}
    `}>
    <span>{item.icon}</span>
    <span className={`text-xs ${isActive ? 'font-semibold' : 'font-normal'}`}>
      {item.label}
    </span>
  </button>
);
