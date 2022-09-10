import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

import Button from "./Button";
import Card from "./Card";

type Props = {
  tokens: number[];
  onClose: () => void;
};

export const Modal: React.FC<Props> = ({ tokens, onClose }) => {
  return (
    <Transition appear show={Boolean(tokens.length)} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl border-4 border-secondary bg-black p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-center text-3xl font-extrabold italic"
                >
                  Mint successful
                </Dialog.Title>
                <div className="mt-4 flex flex-wrap justify-center">
                  {tokens.map((token) => (
                    <Card
                      key={token}
                      idx={token}
                      img={`https://cloudflare-ipfs.com/ipfs/bafybeidx27hzjcg4ryni5u5gpmpxrs4cxv4ivuda5w57xxx2wgdao6hsxi/${token}.png`}
                    />
                  ))}
                </div>

                <div className="mt-4 flex justify-center gap-x-2">
                  <Button onClick={onClose}>Close</Button>
                  {/* <Button className="bg-blue-500 text-white">
                    Open OpenSea
                  </Button> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default Modal;
