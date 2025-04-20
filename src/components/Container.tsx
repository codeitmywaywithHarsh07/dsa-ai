import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div className={`md:ml-64 md:p-6 p-2 h-full ${className}`}>
      {children}
    </div>
  );
};

export default Container;
