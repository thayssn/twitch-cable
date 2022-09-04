import React, { forwardRef, useImperativeHandle } from "react";
import { Show } from "@prisma/client";
import Schedule from "./Schedule";
import ScheduleForm from "./ScheduleForm";
import useSidebar from "../hooks/useSidebar";

type SidebarProps = {
  shows: Show[];
};

type SidebarHandle = {
  openSidebar: () => void;
  toggleSidebar: () => void;
};

const Sidebar: React.ForwardRefRenderFunction<SidebarHandle, SidebarProps> = (
  props,
  ref
) => {
  const { shows } = props;
  const { isOpen, toggleSidebar, openSidebar } = useSidebar();

  useImperativeHandle(ref, () => ({
    openSidebar,
    toggleSidebar,
  }));

  return (
    <aside
      className={`transform fixed top-0 w-80 min-h-screen transition-transform bg-white ${
        isOpen ? "translate-x-0" : "-translate-x-80"
      }`}
    >
      <ScheduleForm />
      <Schedule shows={shows} />
      <div
        className="absolute left-full top-0 bg-orange-700 text-white cursor-pointer"
        onClick={toggleSidebar}
      >
        Toggle
      </div>
    </aside>
  );
};

export default forwardRef(Sidebar);
