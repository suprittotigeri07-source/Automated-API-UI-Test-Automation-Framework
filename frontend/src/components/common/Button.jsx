import React from 'react';

export function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon: Icon,
  className = '',
  onClick,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#7091E6]';

  const variants = {
    primary: 'bg-[#3D52A0] hover:bg-[#324382] text-white shadow-sm shadow-[#3D52A0]/20 active:translate-y-[1px]',
    secondary: 'bg-[#7091E6] hover:bg-[#5b7fdc] text-white shadow-sm shadow-[#7091E6]/20 active:translate-y-[1px]',
    outline: 'border border-[#ADBBDA] bg-white text-[#3D52A0] hover:bg-[#EDE8F5] hover:border-[#8697C4]',
    ghost: 'text-[#5F6B85] hover:bg-[#EDE8F5]/60 hover:text-[#172033]',
    soft: 'bg-[#EDE8F5] text-[#3D52A0] hover:bg-[#ADBBDA]/30',
    danger: 'bg-[#D64545] hover:bg-[#bf3939] text-white shadow-sm shadow-[#D64545]/20',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5 font-semibold',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 mr-1 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      ) : (
        Icon && <Icon className="w-4 h-4 shrink-0" />
      )}
      {children}
    </button>
  );
}
