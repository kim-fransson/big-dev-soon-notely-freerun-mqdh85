import {
  Dialog as HeadlessDialog,
  DialogProps as HeadlessDialogProps,
  Transition,
} from "@headlessui/react";
import CloseIcon from "@icons/close-icon.svg?react";
import { Button } from "@/components/atoms/Button";
import { Fragment, ReactNode } from "react";

export type DialogProps = {
  dialogChildren: ReactNode;
} & HeadlessDialogProps<"div">;

export const Dialog = (props: DialogProps) => {
  const { dialogChildren, ...rest } = props;
  const { onClose, open, title } = props;
  return (
    <Transition appear show={open} as={Fragment}>
      <HeadlessDialog {...rest} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <HeadlessDialog.Panel className="bg-white rounded-2xl shadow-lg p-6 max-w-xl w-full">
              <HeadlessDialog.Title className="header-s capitalize text-gray-900/87 leading-8 mb-6 flex justify-between items-center">
                {title}
                <Button intent="icon" onPress={() => onClose(false)}>
                  <CloseIcon />
                </Button>
              </HeadlessDialog.Title>
              {dialogChildren}
            </HeadlessDialog.Panel>
          </Transition.Child>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};
