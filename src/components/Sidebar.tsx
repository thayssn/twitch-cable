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

const ToggleIcon = () => (
  <svg
    className="w-4 h-4 fill-white"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 581.176 581.176"
    xmlSpace="preserve"
  >
    <polygon
      points="132.436,0 59.789,0 59.789,314.804 36.324,314.804 36.324,387.451 59.789,387.451 132.436,387.451 
 157.402,387.451 157.402,314.804 132.436,314.804 		"
    />
    <rect x="59.789" y="435.882" width="72.647" height="145.294" />
    <rect x="255.015" y="193.725" width="72.647" height="387.451" />
    <polygon
      points="327.662,0 255.015,0 255.015,72.647 230.049,72.647 230.049,145.294 255.015,145.294 327.662,145.294 
 351.127,145.294 351.127,72.647 327.662,72.647 		"
    />
    <rect x="448.257" y="314.804" width="72.647" height="266.373" />
    <polygon
      points="520.904,193.725 520.904,0 448.257,0 448.257,193.725 423.775,193.725 423.775,266.373 448.257,266.373 
 520.904,266.373 544.853,266.373 544.853,193.725 		"
    />
  </svg>
);

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
      className={`transform fixed top-0 w-80 min-h-screen transition-transform p-4 bg-gray-700 ${
        isOpen ? "translate-x-0" : "-translate-x-80"
      }`}
    >
      <ScheduleForm />
      <Schedule shows={shows} />
      <div
        className="absolute ml-4 w-8 h-8 rounded-full left-full top-1/2 -my-8 bg-purple-700 text-white cursor-pointer flex justify-center items-center transition opacity-25 hover:opacity-100"
        onClick={toggleSidebar}
      >
        <ToggleIcon />
      </div>
    </aside>
  );
};

export default forwardRef(Sidebar);
