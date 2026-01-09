import { BsArrowRight } from 'react-icons/bs';
import { MdBlock } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';

// ============================================
// VIEW DETAILS BUTTON (Gradient Primary)
// ============================================

export const ViewDetailsButton = ({
  data,
  _id,
  to,
  text = 'View Details',
  icon: Icon = BsArrowRight,
  size = 20,
  showIcon = true,
  onClick,
  width = true,
  className = '',
  notifiedCourses,
  loading = false,
  disabled = false,
  state,
  showBlockIconOnHover = true,
  blockIcon: BlockIcon = MdBlock,
  content = '',
  ...rest
}) => {
  const isNotified = notifiedCourses && data && notifiedCourses.has(data.id);
  const isDisabled = disabled || loading || isNotified;

  const getButtonStyles = () => {
    if (isNotified) {
      return 'bg-green-100 text-green-600 border-2 border-green-600 cursor-not-allowed group';
    }
    if (loading) {
      return 'bg-gray-400 text-white cursor-not-allowed';
    }
    return 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/50 hover:scale-[1.02] group/btn transition-transform';
  };

  const ButtonComponent = (
    <button
      type="button"
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      className={`  ${
        content == 'coming-soon-course-notify-button' ? '' : 'flex-row-reverse'
      } 
        flex items-center justify-center gap-2
        p-2 font-bold rounded-xl
        transition-all duration-300 relative overflow-hidden
        ${width ? 'w-full' : 'flex-1'}
        ${getButtonStyles()}
        ${isDisabled ? 'pointer-events-none' : ''}
        ${className}
      `}
      {...rest}>
      {/* Icon Container with Swap Effect */}
      <div className="relative flex items-center justify-center">
        {showIcon &&
          Icon &&
          (typeof Icon === 'function' ? (
            <Icon
              size={size}
              className={`
              transition-all duration-300
              ${
                isNotified && showBlockIconOnHover
                  ? 'group-hover:scale-0 group-hover:rotate-90'
                  : ''
              }
            `}
            />
          ) : (
            Icon
          ))}

        {/* Block Icon - Shows on Hover */}
        {isNotified && showBlockIconOnHover && BlockIcon && (
          <BlockIcon
            size={size}
            className="
              absolute 
              scale-0 rotate-90
              group-hover:scale-100 group-hover:rotate-0
              transition-all duration-300 
              text-red-600
            "
          />
        )}
      </div>

      <span>{text}</span>
    </button>
  );

  if (isDisabled || (!to && !_id)) {
    return ButtonComponent;
  }

  if (to || _id) {
    return (
      <Link
        to={to || `/class/${_id}`}
        state={state}
        className={width ? 'w-full block' : 'inline-block'}>
        {ButtonComponent}
      </Link>
    );
  }

  return ButtonComponent;
};
// export default ViewDetailsButton;
export const SeeAllButton = ({
  to,
  text = 'See All',
  showIcon = true,
  className = '',
  fullWidth = false,
}) => (
  <Link to={to}>
    <button
      className={`
        group px-8 py-4 
        bg-gradient-to-r from-indigo-600 to-purple-600 
        hover:from-indigo-700 hover:to-purple-700 
        text-white font-bold text-lg rounded-full 
        shadow-xl hover:shadow-2xl 
        transition-all duration-300 hover:scale-105 
        flex items-center gap-3
        ${fullWidth ? 'w-full justify-center' : 'inline-flex'}
        ${className}
      `}>
      <span>{text}</span>
      {showIcon && (
        <BsArrowRight className="text-2xl group-hover:translate-x-2 transition-transform" />
      )}
    </button>
  </Link>
);

// ============================================
// GRADIENT PRIMARY BUTTON (Generic)
// ============================================
export const GradientButton = ({
  children,
  onClick,
  to,
  text,
  className = '',
  fullWidth = false,
  showIcon = true,
  icon,
  disabled = false,
}) => {
  const buttonContent = (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${fullWidth ? 'w-full' : ''} 
        btn-gradient-primary group 
        ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}>
      <span>{children || text}</span>
      {showIcon &&
        (icon || (
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        ))}
    </button>
  );

  return to ? <Link to={to}>{buttonContent}</Link> : buttonContent;
};

// ============================================
// ENROLL NOW BUTTON
// ============================================
export const EnrollButton = ({ _id, className = '', onClick }) => (
  <GradientButton
    to={`/enroll/${_id}`}
    text="Enroll Now"
    fullWidth
    className={className}
    onClick={onClick}
  />
);

// ============================================
// START LEARNING BUTTON
// ============================================
export const StartLearningButton = ({ to = '/courses', className = '' }) => (
  <GradientButton to={to} text="Start Learning" className={className} />
);
// Desktop Navigation Component
export const DesktopNavigation = ({ navItems }) => (
  <div className="hidden lg:flex items-center space-x-1">
    {navItems.map(item => (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}>
        {item.label}
      </NavLink>
    ))}
  </div>
);
// ============================================
// ============================================
// SUBMIT BUTTON (Fully Flexible & Safe)
// ============================================
export const SubmitButton = ({
  isLoading = false,
  isSubscribed = false,
  text = 'Submit',
  loadingText = 'Submitting...',
  subscribedText = 'Subscribed!',
  onClick,
  type = 'submit',
  variant = 'gradient', // gradient | white | custom
  width = true,
  className = '',
  icon,
  loadingIcon,
  subscribedIcon,
  disabled = false,
}) => {
  const isDisabled = isLoading || isSubscribed || disabled;

  // base style
  const baseStyle = `
    ${width ? 'w-full' : ''}
    px-6 py-3 rounded-full font-bold
    flex items-center justify-center gap-2
    transition-all duration-300
  `;

  // variant style (only when NOT subscribed)
  const variantStyle =
    !isSubscribed &&
    (variant === 'gradient'
      ? 'btn-gradient-primary text-white'
      : variant === 'white'
      ? 'bg-white text-indigo-600 hover:bg-gray-100'
      : '');

  // subscribed style (highest priority)
  const subscribedStyle = isSubscribed
    ? 'bg-green-500 text-white cursor-not-allowed'
    : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${baseStyle}
        ${variantStyle}
        ${subscribedStyle}
        ${!isDisabled ? 'hover:shadow-xl hover:scale-105' : 'opacity-80'}
        ${className}
      `}>
      {/* Loading */}
      {isLoading && (
        <>
          {loadingIcon ?? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          )}
          <span>{loadingText}</span>
        </>
      )}

      {/* Subscribed */}
      {!isLoading && isSubscribed && (
        <>
          {subscribedIcon ?? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
          <span>{subscribedText}</span>
        </>
      )}

      {/* Normal */}
      {!isLoading && !isSubscribed && (
        <>
          <span>{text}</span>
          {icon && <span>{icon}</span>}
        </>
      )}
    </button>
  );
};

// social btn
export const SocialButton = ({
  onClick,
  icon,
  size = 'w-10 h-10',
  bg = 'bg-white/20',
  hoverBg = 'hover:bg-white/30',
  textColor = 'text-white',
  className = '',
  ariaLabel = 'social-button',
}) => {
  return (
    <button
      onClick={onClick}
      className={`${size} ${bg} ${hoverBg} ${textColor} ${className} rounded-full backdrop-blur-sm flex items-center justify-center transition-all`}
      aria-label={ariaLabel}>
      {icon}
    </button>
  );
};
// tab btn

export const TabButton = ({ label, value, activeValue, onClick, className = '' }) => {
  const isActive = activeValue === value;

  return (
    <button
      onClick={() => onClick(value)}
      className={`
        flex-1 select-none text-[13px] border-0 py-[15px] px-1.5 cursor-pointer transition-all duration-300 font-medium outline-none border-b-[3px]
        ${
          isActive
            ? 'text-[#2b2c48] border-b-[#8a84ff] bg-gradient-to-b from-transparent via-[rgba(207,204,255,0.2)] to-[rgba(211,226,255,0.4)]'
            : 'text-[#5c5c6d] border-transparent hover:text-[#2b2c48] hover:border-b-[#8a84ff] hover:bg-gradient-to-b hover:from-transparent hover:via-[rgba(207,204,255,0.2)] hover:to-[rgba(211,226,255,0.4)]'
        }
        ${className}
      `}>
      {label}
    </button>
  );
};

// ============================================
// OUTLINE BUTTON
// ============================================
export const OutlineButton = ({
  children,
  text,
  icon,
  to,
  onClick,
  className = '',
  fullWidth = false,
}) => {
  const buttonInner = (
    <>
      <span>{children || text}</span>
      {icon && <span className="ml-2 flex items-center">{icon}</span>}
    </>
  );

  const button = (
    <button
      onClick={onClick}
      className={`
        ${fullWidth ? 'w-full' : ''}
        btn-outline-primary
        inline-flex items-center justify-center
        ${className}
      `}>
      {buttonInner}
    </button>
  );

  return to ? <Link to={to}>{button}</Link> : button;
};

// mobile nav btn
const MobileNavBtn = ({
  onClick,
  icon,
  activeIcon,
  isActive = false,
  size = 'text-2xl',
  hoverBg = 'hover:bg-gray-100',
  className = '',
  ariaLabel = 'button',
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors md:hidden ${hoverBg} ${className}`}
      aria-label={ariaLabel}>
      {isActive && activeIcon ? (
        <span className={`${size}`}>{activeIcon}</span>
      ) : (
        <span className={`${size}`}>{icon}</span>
      )}
    </button>
  );
};

export default MobileNavBtn;
// ============================================
// CTA BUTTONS (Banner)
// ============================================
export const CTAPrimaryButton = ({ children, text, onClick, to, className = '' }) => {
  const buttonContent = (
    <button onClick={onClick} className={`btn-cta-primary group ${className}`}>
      {children || text}
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </button>
  );

  return to ? <Link to={to}>{buttonContent}</Link> : buttonContent;
};

export const CTASecondaryButton = ({ children, text, to, onClick, className = '' }) => {
  const buttonContent = (
    <button
      onClick={onClick}
      className={`btn-cta-secondary w-full sm:w-auto ${className}`}>
      {children || text}
    </button>
  );

  return to ? <Link to={to}>{buttonContent}</Link> : buttonContent;
};

// ============================================
// ICON BUTTON (Small with icon only)
// ============================================
export const IconButton = ({
  icon,
  onClick,
  className = '',
  variant = 'primary', // primary, secondary, outline
}) => {
  const variants = {
    primary: 'bg-brand-primary hover:bg-brand-primary-dark text-white',
    secondary: 'bg-brand-secondary hover:bg-brand-secondary-dark text-white',
    outline:
      'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white',
  };

  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-lg transition-all duration-300 ${variants[variant]} ${className}`}>
      {icon}
    </button>
  );
};
