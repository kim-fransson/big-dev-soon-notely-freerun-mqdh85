import { Dialog, DialogProps, Transition } from "@headlessui/react";
import { AddNoteForm } from "../AddNoteForm/AddNoteForm";
import CloseIcon from "@icons/close-icon.svg?react";
import { Button } from "@/components/atoms/Button";
import { Fragment } from "react";

export type AddNoteDialogProps = DialogProps<"div">;

export const AddNoteDialog = (props: AddNoteDialogProps) => {
  const { onClose, open } = props;
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog {...props} className="relative z-50">
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
            <Dialog.Panel className="bg-white rounded-2xl shadow-lg p-6 max-w-xl">
              <Dialog.Title className="header-s text-gray-900/87 leading-8 mb-6 flex justify-between items-center">
                Add note
                <Button intent="icon" onClick={() => onClose(false)}>
                  <CloseIcon />
                </Button>
              </Dialog.Title>

              <AddNoteForm
                onSubmit={() => onClose(false)}
                onCancel={() => onClose(false)}
              />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
