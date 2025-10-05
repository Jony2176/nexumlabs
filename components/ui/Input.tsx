import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const Input: React.FC<InputProps> = ({ label, id, className, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium theme-text-primary">
        {label}
      </label>
      <input
        id={id}
        className={`input-premium ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;