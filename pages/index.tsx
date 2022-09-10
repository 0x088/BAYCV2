import React from "react";
import dynamic from "next/dynamic";

const MintWithNoSSR = dynamic(() => import("@/components/Mint"), {
  ssr: false,
});

import { info } from "@/constants";
import List from "@/components/List";

const Main: React.FC = () => {
  const links: { title: string; url: string }[] = [
    { title: "LooksRare", url: info.looksRarePrefix },
    {
      title: "Twitter",
      url: info.twitter,
    },
    {
      title: "Contract",
      url: info.contract,
    },
    {
      title: "Github",
      url: info.github,
    },
  ];

  return (
    <div className="container mx-auto overflow-hidden">
      <div className="mt-20 flex flex-col items-center justify-center px-3 md:mt-28">
        <h1 className="text-7xl font-extrabold italic md:text-8xl">
          BAYC<span className="text-red-600">V2</span>
        </h1>
        <p className="my-1 w-full text-center text-xl md:w-1/2 md:text-2xl">
          {info.description}
        </p>
        <ul className="mb-10 flex flex-wrap justify-center gap-x-5 p-0 text-[20px] font-semibold">
          {links.map(({ title, url }) => (
            <li key={title}>
              <a
                href={url}
                className="underline hover:no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
        <List />
        <MintWithNoSSR />
      </div>
    </div>
  );
};

export default Main;
