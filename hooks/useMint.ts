import {
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
  useWaitForTransaction,
} from "wagmi";
import { BigNumber } from "ethers";
import { ABI as BAYCV2 } from "@/ABI";
import { contractAddress } from "@/constants";
import { useMemo } from "react";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";

type Props = {
  handleSuccess: (tokens: number[]) => void;
  quantity?: number;
  price?: any;
};

export const useMint = ({ handleSuccess, quantity, price }: Props) => {
  const { address } = useAccount();
  const addRecentTransaction = useAddRecentTransaction();

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: BAYCV2,
    functionName: "mint",
    enabled: Boolean(address) && Boolean(price) && Boolean(quantity),
    args: [quantity],
    overrides: {
      gasLimit: 1300000,
      value: price && quantity && BigNumber.from(price).mul(quantity),
    },
  });

  const {
    data: tx,
    write: mint,
    isLoading: isMintLoading,
    isError: isMintError,
    isSuccess: isMintSuccess,
  } = useContractWrite({
    ...config,
    enabled: Boolean(address),
    onSuccess(data) {
      addRecentTransaction({
        hash: data.hash,
        description: "Mint",
      });
    },
  });

  const {
    data: txRes,
    isLoading: isWaitLoading,
    error: isWaitError,
    isSuccess: isWaitSuccess,
  } = useWaitForTransaction({
    hash: tx?.hash,
    onSuccess(data) {
      const minedTokens = data?.logs?.map((log) => Number(log.topics[3]));
      handleSuccess(minedTokens);
    },
  });

  const isLoading = useMemo(
    () => isWaitLoading || isMintLoading,
    [isMintLoading, isWaitLoading]
  );
  const isError = useMemo(
    () => isWaitError || isMintError,
    [isWaitError, isMintError]
  );
  const isSuccess = useMemo(
    () => isWaitSuccess && isMintSuccess,
    [isWaitSuccess, isMintSuccess]
  );

  return useMemo(
    () => ({ mint, isLoading, isError, isSuccess }),
    [mint, isLoading, isError, isSuccess]
  );
};
