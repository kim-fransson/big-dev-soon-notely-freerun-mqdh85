import {
  Dialog as HeadlessDialog,
  DialogProps as HeadlessDialogProps,
} from "@headlessui/react";
import CloseIcon from "@icons/close-icon.svg?react";
import { Button } from "@/components/atoms/Button";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type DialogProps = {
  dialogChildren: ReactNode;
  heading: string;
} & HeadlessDialogProps<"div">;

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

export const Dialog = (props: DialogProps) => {
  const { dialogChildren, ...rest } = props;
  const { onClose, open, heading } = props;
  return (
    <AnimatePresence>
      {open && (
        <HeadlessDialog {...rest} className="relative z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30"
            aria-hidden="true"
          />
          <div className="fixed inset-0 flex w-screen items-center justify-center">
            <HeadlessDialog.Panel
              as={motion.div}
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl shadow-lg p-6 max-w-xl w-full"
            >
              <HeadlessDialog.Title className="header-s capitalize text-gray-900/87 leading-8 mb-6 flex justify-between items-center">
                {heading}
                <Button intent="icon" onPress={() => onClose(false)}>
                  <CloseIcon />
                </Button>
              </HeadlessDialog.Title>
              {dialogChildren}
            </HeadlessDialog.Panel>
          </div>
        </HeadlessDialog>
      )}
    </AnimatePresence>
  );
};
