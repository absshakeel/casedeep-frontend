import React, { ReactNode } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface Props {
  open: boolean;
  close: (e: boolean) => void;
  title?: string;
  children: ReactNode;
  size?: string;
  initialFocus?: React.RefObject<HTMLElement>;
}

const CustomDialog: React.FC<Props> = ({
  open,
  close,
  title,
  children,
  size = "max-w-md ",
  initialFocus,
}: Props) => {
  return (
    <Dialog
      open={open}
      as="div"
      initialFocus={initialFocus}
      className="relative z-50 modalShadow focus:outline-none"
      onClose={() => close(false)}
    >
      <div className="fixed inset-0 bg-black-1/40 z-10 p-2 csm:p-4 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className={`w-full ${size} rounded-xl bg-[#222222] p-4 csm:p-5 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0`}
          >
            <DialogTitle
              as="h3"
              className="text-base text-[#cccccc] font-pingfang"
            >
              {title}
            </DialogTitle>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default CustomDialog;
