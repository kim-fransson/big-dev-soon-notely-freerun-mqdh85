import { PropsWithChildren, useState } from "react";

export type TooltipProps = {
  text: string;
} & PropsWithChildren;

export const Tooltip = ({ text, children }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  let enterTimeout: NodeJS.Timeout;

  const handleMouseEnter = () => {
    enterTimeout = setTimeout(() => {
      setShowTooltip(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(enterTimeout);
    setTimeout(() => {
      setShowTooltip(false);
    }, 500);
  };

  const handleFocus = () => {
    setShowTooltip(true);
  };

  const handleBlur = () => {
    setShowTooltip(false);
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-label={text}
      >
        {children}
      </div>
      {showTooltip && (
        <div
          className="absolute z-10 px-3 py-2 caption text-gray-100 bg-gray-600 
        rounded-lg shadow-md left-1/2 -translate-x-1/2 capitalize -bottom-2 translate-y-full"
        >
          {text}
        </div>
      )}
    </div>
  );
};
