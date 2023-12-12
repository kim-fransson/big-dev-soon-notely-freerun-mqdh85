import { PropsWithChildren, useState } from "react";
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
