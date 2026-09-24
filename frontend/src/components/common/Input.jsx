import React from 'react';

export function Input({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  icon: Icon,
  disabled = false,
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-[#172033] uppercase tracking-wider">
          {label} {required && <span className="text-[#D64545]">*</span>}
        </label>
      )}
      <div className="relative rounded-lg shadow-xs">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8697C4]">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input
          id={id}
          type={type}
          disabled={disabled}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`block w-full rounded-lg text-sm bg-white border transition-colors duration-150
            ${Icon ? 'pl-9' : 'pl-3.5'} pr-3.5 py-2
            ${
              error
                ? 'border-[#D64545] focus:border-[#D64545] focus:ring-1 focus:ring-[#D64545]'
                : 'border-[#ADBBDA]/60 hover:border-[#8697C4] focus:border-[#7091E6] focus:ring-2 focus:ring-[#7091E6]/20'
            }
            text-[#172033] placeholder-[#8697C4]/70 outline-none disabled:bg-[#F8F9FC] disabled:text-[#8697C4]
            ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-[#D64545] mt-1">{error}</p>}
      {helperText && !error && <p className="text-xs text-[#5F6B85] mt-1">{helperText}</p>}
    </div>
  );
}
