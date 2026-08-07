import os

base_path = r"d:\3-2 class stuff\software lab\project\ResCollab testing\frontend\src"

directories = [
    "components/ui",
    "layouts",
    "pages",
]

for d in directories:
    os.makedirs(os.path.join(base_path, d), exist_ok=True)

ui_components = {
    "Button.jsx": """import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-sm',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 shadow-sm',
    outline: 'border border-border-main bg-transparent hover:bg-gray-100 text-text-main',
    ghost: 'hover:bg-gray-100 text-text-main hover:text-gray-900',
    link: 'underline-offset-4 hover:underline text-primary',
  };
  
  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-lg',
    lg: 'h-12 px-8 rounded-xl text-lg',
    icon: 'h-10 w-10',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
});
Button.displayName = 'Button';
""",
    "Card.jsx": """import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Card({ className, ...props }) {
  return (
    <div
      className={cn('rounded-2xl border border-border-main bg-card text-text-main shadow-sm transition-all hover:shadow-md', className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}
""",
    "Input.jsx": """import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-xl border border-border-main bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';
"""
}

for filename, content in ui_components.items():
    with open(os.path.join(base_path, "components/ui", filename), "w", encoding="utf-8") as f:
        f.write(content)

print("Generated UI components successfully.")
