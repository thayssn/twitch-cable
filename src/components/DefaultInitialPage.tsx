import Head from "next/head";

type DefaultInitialPageProps = {
  onClickToOpenSchedule: () => void;
};

export default function DefaultInitialPage({
  onClickToOpenSchedule,
}: DefaultInitialPageProps) {
  return (
    <>
      <Head>
        <title>Twitch Cable</title>
      </Head>
      <main className="container mx-auto flex flex-col w-screen h-screen justify-center items-center">
        <h1 className="text-5xl md:text-8 font-extrabold text-gray-300">
          Welcome to <span className="text-purple-400">Twitch Cable</span>
        </h1>

        <h2 className="text-3xl text-white mt-6">
          It looks like you don't have any show scheduled.
        </h2>

        <p
          className="text-2xl text-purple-400 mt-6 hover:text-purple-300 transition-colors cursor-pointer"
          onClick={onClickToOpenSchedule}
        >
          Click here to create a schedule
        </p>
      </main>
    </>
  );
}
