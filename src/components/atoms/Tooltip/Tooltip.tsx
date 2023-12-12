import { PropsWithChildren, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type TooltipProps = {
  text: string;
} & PropsWithChildren;

const fadeIn = {
  hidden: {
    opacity: 0,
    y: "80%",
    x: "-50%",
  },
  visible: {
    y: "100%",
    x: "-50%",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
  },
};

export const Tooltip = ({ text, children }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [keyboardFocused, setKeyboardFocused] = useState(false);

  let enterTimeout: NodeJS.Timeout;

  useEffect(() => {
    const handleKeyDown = () => {
      setKeyboardFocused(true);
    };
    const handleMouseDown = () => {
      setKeyboardFocused(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleMouseEnter = () => {
    setKeyboardFocused(false);
    enterTimeout = setTimeout(() => {
      setShowTooltip(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(enterTimeout);
    setTimeout(() => {
      setShowTooltip(false);
    }, 100);
  };

  const handleFocus = () => {
    if (keyboardFocused) {
      setShowTooltip(true);
    }
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
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute z-10 px-3 py-2 caption text-gray-100 bg-gray-600 
            rounded-lg shadow-md left-1/2 capitalize -bottom-2"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
