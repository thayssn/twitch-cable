import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { TwitchPlayer } from "react-twitch-embed";
import DefaultInitialPage from "../components/DefaultInitialPage";
import { trpc } from "../utils/trpc";
import Sidebar from "../components/Sidebar";
import useWindowEvents from "../hooks/useWindowEvents";
import useKeyboardEvents from "../hooks/useKeyboardEvents";
import { getCurrentChannel } from "../utils/getCurrentChannel";
import ChatSidebar from "../components/ChatSidebar";

type SidebarnHandle = React.ElementRef<typeof Sidebar>;
type ChatSidebarnHandle = React.ElementRef<typeof ChatSidebar>;

const Home: NextPage = () => {
  const { data: shows } = trpc.useQuery(["schedule.getAll"]);
  const sidebarRef = useRef<SidebarnHandle>(null);
  const chatSidebarRef = useRef<ChatSidebarnHandle>(null);
  const twitchRef = useRef<HTMLElement>(null);

  useEffect(() => {
    twitchRef.current?.focus();
  }, []);

  useKeyboardEvents({
    toggleSidebar: () => {
      sidebarRef.current?.toggleSidebar();
    },
    toggleChatSidebar: () => {
      chatSidebarRef.current?.toggleSidebar();
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
          ref={twitchRef}
          className="container mx-auto flex flex-col justify-center items-center"
          id="twitch-embed"
        >
          <TwitchPlayer
            channel={currentChannel.channel}
            width={limits.width}
            height={limits.height}
            muted={false}
            allowFullscreen={true}
            autoplay={true}
            playsInline={true}
          />
        </main>
      )}
      <Sidebar shows={shows || []} ref={sidebarRef} />
      <ChatSidebar
        channel={currentChannel?.channel ?? ""}
        ref={chatSidebarRef}
      />
    </>
  );
};

export default Home;
