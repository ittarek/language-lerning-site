// Glass Navigation Button Component
export const GlassNavButton = ({ item, isActive, onClick, bgColor }) => (
  <button
    onClick={onClick}
    className={`
      flex flex-col items-center gap-1 m-auto md:w-16 md:h-16 p-2 rounded-full
      border-none transition-all duration-300 cursor-pointer
      ${isActive ? 'nav-glass-active' : 'nav-glass-inactive'}   ${
      isActive || bgColor === 'black'
        ? 'bg-white/20 text-black  shadow-lg'
        : 'bg-transparent text-white hover:bg-white/10 hover:text-white'
    }
    `}>
    <span>{item.icon}</span>
    <span className={`text-xs ${isActive ? 'font-semibold' : 'font-normal'}`}>
      {item.label}
    </span>
  </button>
);
