import { Show } from "@prisma/client";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { TwitchPlayer, TwitchPlayerNonInteractive } from "react-twitch-embed";
import DefaultInitialPage from "../components/DefaultInitialPage";
import { trpc } from "../utils/trpc";
import useSidebar from "../hooks/useSidebar";
import Sidebar from "../components/Sidebar";

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
  const [limits, setLimits] = useState({ width: 0, height: 0 });
  const { data: shows } = trpc.useQuery(["schedule.getAll"]);

  const { isOpen, toggleSidebar, openSidebar } = useSidebar();

  useEffect(() => {
    window &&
      setLimits({
        width: window.innerWidth,
        height: window.innerHeight,
      });
  }, []);

  const currentChannel = getCurrentChannel(shows || []);

  console.log("rendered");
  return (
    <>
      <Head>
        <title>
          {currentChannel && currentChannel.channel + " :: "} Twitch Cable
        </title>
      </Head>
      {!shows || !currentChannel ? (
        <DefaultInitialPage onClickToOpenSchedule={openSidebar} />
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
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        shows={shows || []}
      />
    </>
  );
};

export default Home;
