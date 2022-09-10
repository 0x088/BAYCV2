import { useContractEvent } from "wagmi";
import { ABI as BAYCV2 } from "@/ABI";
import { contractAddress } from "@/constants";
import { BigNumber } from "ethers";

type Props = {
  refetchInfo: () => void;
};

export const useOnMint = ({ refetchInfo }: Props) => {
  useContractEvent({
    addressOrName: contractAddress,
    contractInterface: BAYCV2,
    eventName: "Transfer",
    listener: (event: string[]) => {
      if (BigNumber.from(event[0]).isZero()) {
        refetchInfo();
      }
    },
  });
};
