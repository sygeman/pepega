"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, type ReactNode, useRef } from "react";

type ModalProperties = {
  id: string;
  isOpen: (id: string) => boolean;
  onClose: (id: string) => void;
  children?: ReactNode;
};

export const Modal = ({ id, isOpen, onClose, children }: ModalProperties) => {
  const completeButtonReference = useRef(null);
  const open = isOpen(id);
  const close = () => onClose(id);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[150] overflow-y-auto min-h-screen w-full flex items-center justify-center"
        static
        open={open}
        onClose={close}
        initialFocus={completeButtonReference}
      >
        <Dialog.Overlay className="fixed inset-0 bg-background opacity-90" />
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className="w-full flex justify-center rounded overflow-hidden z-10"
            onClick={close}
          >
            {children}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
