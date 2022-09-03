import { Show } from "@prisma/client";
import Schedule from "./Schedule";
import ScheduleForm from "./ScheduleForm";

export default function Sidebar({
  isOpen,
  toggleSidebar,
  shows,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
  shows: Show[];
}) {
  return (
    <aside
      className={`transform fixed top-0 w-80 min-h-screen transition-transform bg-white ${
        isOpen ? "translate-x-0" : "-translate-x-80"
      }`}
    >
      Sidebar {isOpen ? "aberta" : "fechada"}
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
}
