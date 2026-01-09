import { BsArrowRight } from 'react-icons/bs';
import { Link, NavLink } from 'react-router-dom';

// ============================================
// VIEW DETAILS BUTTON (Gradient Primary)
// ============================================
export const ViewDetailsButton = ({
  _id,
  to,
  text = 'Button Text',
  className = '',
  showIcon = true,
  fullWidth = true,
  sate,
}) => (
  <Link to={to || `/class/${_id}`} sate={sate}>
    <button
      className={`${fullWidth ? 'w-full' : ''} btn-gradient-primary group ${className}`}>
      <span>{text}</span>
      {showIcon && (
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
      )}
    </button>
  </Link>
);
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
    {navItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) =>
          isActive ? "nav-link-active" : "nav-link"
        }
      >
        {item.label}
      </NavLink>
    ))}
  </div>
);
// ============================================
// SUBMIT BUTTON (with loading state)
// ============================================
export const SubmitButton = ({
  isLoading = false,
  text = 'Submit',
  loadingText = 'Submitting...',
  className = '',
  onClick,
}) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className={`w-full btn-gradient-primary ${className} ${
      isLoading ? 'opacity-70 cursor-not-allowed' : ''
    }`}>
    {isLoading ? (
      <>
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
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span>{loadingText}</span>
      </>
    ) : (
      <span>{text}</span>
    )}
  </button>
);

// ============================================
// OUTLINE BUTTON
// ============================================
export const OutlineButton = ({
  children,
  text,
  to,
  onClick,
  className = '',
  fullWidth = false,
}) => {
  const buttonContent = (
    <button
      onClick={onClick}
      className={`${fullWidth ? 'w-full' : ''} btn-outline-primary ${className}`}>
      {children || text}
    </button>
  );

  return to ? <Link to={to}>{buttonContent}</Link> : buttonContent;
};

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
