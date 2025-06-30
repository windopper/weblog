'use client';

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function InteractiveButton({ 
  children, 
  onClick = () => alert('Hello from MDX!'),
  className = "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
}: InteractiveButtonProps) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
} 