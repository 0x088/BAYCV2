import { useContractReads, useAccount } from "wagmi";
import { ABI as BAYCV2 } from "@/ABI";
import { contractAddress } from "@/constants";
import { useMemo } from "react";

const contract = {
  addressOrName: contractAddress,
  contractInterface: BAYCV2,
};

export const useGetContractInfo = () => {
  const { address } = useAccount();

  const result = useContractReads({
    contracts: [
      {
        ...contract,
        functionName: "totalSupply",
      },
      {
        ...contract,
        functionName: "price",
      },
      {
        ...contract,
        functionName: "balanceOf",
        args: [address ?? "0x0000000000000000000000000000000000000001"],
      },
    ],
  });

  return useMemo(() => result, [result]);
};
