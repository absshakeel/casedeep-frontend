import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  styles?: string;
}

const ComponentWrapper: React.FC<Props> = ({
  children,
  styles = "h-full",
}: Props) => {
  return (
    <div className={`w-full ${styles}`}>
      <div className="w-full h-full max-w-[1200px] m-auto lg:px-8 px-3">
        {children}
      </div>
    </div>
  );
};

export default ComponentWrapper;
