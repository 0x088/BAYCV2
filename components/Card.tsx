import React from "react";
import { info } from "@/constants";

type Props = {
  idx: number;
  img?: string;
  url?: string;
};

const Card: React.FC<Props> = ({ idx, img, url }) => {
  return (
    <a
      href={url || `${info.openSeaPrefix}/${idx}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        className="m-2.5 flex h-[100px] min-h-[100px] w-[100px] min-w-[100px] rounded-[10px] hover:shadow-default md:h-[200px] md:min-h-[200px] md:w-[200px] md:min-w-[200px]"
        src={img || `./apev2/${idx}.png`}
        alt={`APYC #${idx}`}
        aria-label={`APYC #${idx}`}
      />
    </a>
  );
};

export default Card;
