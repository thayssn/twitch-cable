import React, { forwardRef, useImperativeHandle } from "react";
import useSidebar from "../hooks/useSidebar";
import { TwitchChat } from "react-twitch-embed";

type ChatSidebarProps = {
  channel: string;
};

type ChatSidebarHandle = {
  toggleSidebar: () => void;
};

const ToggleIcon = () => (
  <svg
    className="w-4 h-4 fill-white"
    viewBox="0 0 128 128"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M113,0H15A15,15,0,0,0,0,15V79.57a15,15,0,0,0,15,15H38.28a1,1,0,0,1,1,1V121a7,7,0,0,0,11.95,4.95L82.31,94.87a1,1,0,0,1,.71-.29h30a15,15,0,0,0,15-15V15A15,15,0,0,0,113,0Zm9,79.57a9,9,0,0,1-9,9H83a7,7,0,0,0-4.95,2L47,121.7a1,1,0,0,1-1.71-.71V95.57a7,7,0,0,0-7-7H15a9,9,0,0,1-9-9V15a9,9,0,0,1,9-9h98a9,9,0,0,1,9,9Z" />
  </svg>
);

const ChatSidebar: React.ForwardRefRenderFunction<
  ChatSidebarHandle,
  ChatSidebarProps
> = (props, ref) => {
  const { channel } = props;
  const { isOpen, toggleSidebar } = useSidebar();

  useImperativeHandle(ref, () => ({
    toggleSidebar,
  }));

  return (
    <aside
      className={`transform fixed right-0 top-0 w-96 min-h-screen transition-transform p-4 flex items-center ${
        isOpen ? "translate-x-0" : "translate-x-96"
      }`}
    >
      <TwitchChat channel={channel} />
      <div
        className="absolute mr-4 w-8 h-8 rounded-full right-full top-1/2 -my-8 bg-purple-700 text-white cursor-pointer flex justify-center items-center transition opacity-25 hover:opacity-100"
        onClick={toggleSidebar}
      >
        <ToggleIcon />
      </div>
    </aside>
  );
};

export default forwardRef(ChatSidebar);
