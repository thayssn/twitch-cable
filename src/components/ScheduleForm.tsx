import { Show } from "@prisma/client";
import { FormEvent, useRef } from "react";
import InputGroup from "./InputGroup";
import { trpc } from "../utils/trpc";

const ScheduleForm = () => {
  const context = trpc.useContext();
  const formRef = useRef<HTMLFormElement>(null);

  const resetForm = () => {
    formRef.current?.reset();
    focusChannelInput();
  };

  const focusChannelInput = () => {
    const channelInput = formRef.current?.querySelector(
      '[name="channel"]'
    ) as HTMLElement;
    if (channelInput) channelInput.focus();
  };

  const { mutate, isLoading: isLoadingMutation } = trpc.useMutation(
    ["schedule.create"],
    {
      onSuccess() {
        context.invalidateQueries(["schedule.getAll"]);
        context.refetchQueries(["schedule.getAll"]);
        resetForm();
      },
    }
  );

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.target as HTMLFormElement);
    const dataObject = Object.fromEntries(formData.entries()) as Show;
    mutate(dataObject);
  };
  return (
    <>
      <h3 className="text-2xl leading-normal font-extrabold text-gray-300">
        Add show
      </h3>
      <form ref={formRef} className="" onSubmit={onSubmit}>
        <InputGroup
          name="channel"
          label="Channel"
          placeholder="alanzoka"
          inputProps={{ minLength: 3, required: true }}
        />
        <InputGroup
          name="startTime"
          label="Start Time"
          placeholder="10:00"
          type="time"
          inputProps={{ required: true }}
        />
        <button
          disabled={isLoadingMutation}
          type="submit"
          className="border-none outline-none rounded w-40 py-2 px-3 text-white hover:bg-purple-300 transition-colors bg-purple-400 mb-3"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default ScheduleForm;
