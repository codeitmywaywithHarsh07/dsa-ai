import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div className={`ml-64 p-6 h-full ${className}`}>
      {children}
    </div>
  );
};

export default Container;
