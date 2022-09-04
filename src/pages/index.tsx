import { Show } from "@prisma/client";
import { NextPage } from "next";
import Head from "next/head";
import { useRef } from "react";
import { TwitchPlayerNonInteractive } from "react-twitch-embed";
import DefaultInitialPage from "../components/DefaultInitialPage";
import { trpc } from "../utils/trpc";
import Sidebar from "../components/Sidebar";
import useWindowEvents from "../hooks/useWindowEvents";
import useKeyboardEvents from "../hooks/useKeyboardEvents";

type SidebarnHandle = React.ElementRef<typeof Sidebar>;

function getCurrentChannel(shows: Show[]): Show | undefined {
  if (!shows || !shows.length) return;
  return shows.reduce((acc, currentValue) => {
    const currentDate = new Date();
    const currentTime = `${currentDate.getHours()}${currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    const showIsOn: boolean =
      Number(currentTime) >= Number(currentValue.startTime.replace(":", ""));
    return showIsOn ? currentValue : acc;
  }, shows[0]);
}

const Home: NextPage = () => {
  const { data: shows } = trpc.useQuery(["schedule.getAll"]);
  const sidebarRef = useRef<SidebarnHandle>(null);

  useKeyboardEvents({
    toggleSidebar: () => {
      sidebarRef.current?.toggleSidebar();
    },
  });

  const { limits } = useWindowEvents();

  const handleOpenSchedule = () => {
    sidebarRef.current?.openSidebar();
  };

  const currentChannel = getCurrentChannel(shows || []);

  return (
    <>
      <Head>
        <title>Twitch Cable</title>
      </Head>
      {!shows || !currentChannel ? (
        <DefaultInitialPage onClickToOpenSchedule={handleOpenSchedule} />
      ) : (
        <main
          className="container mx-auto flex flex-col justify-center items-center"
          id="twitch-embed"
        >
          <TwitchPlayerNonInteractive
            channel={currentChannel.channel}
            width={limits.width}
            height={limits.height}
            muted={false}
          />
        </main>
      )}
      <Sidebar shows={shows || []} ref={sidebarRef} />
    </>
  );
};

export default Home;
