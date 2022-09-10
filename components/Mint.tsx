import React, { useMemo, useState, useCallback } from "react";

import { useAccount, useBalance } from "wagmi";
import Button from "./Button";
import Input from "./Input";
import ConnectButton from "./ConnectButton";
import Modal from "./Modal";

import { useGetContractInfo, useMint, useOnMint } from "@/hooks";
import { isDev, positiveNum } from "@/constants";
import { utils, BigNumber } from "ethers";

function Mint() {
  const { isConnected, address } = useAccount();
  const { data: balance, isLoading: isLoadingBalance } = useBalance({
    addressOrName: address,
    enabled: Boolean(address),
    watch: false,
    staleTime: Infinity,
  });
  const [quantity, setQuantity] = useState<undefined | number>(1);
  const {
    data: [totalSupply, price, balanceOf] = [],
    isLoading: isLoadingContractInfo,
    refetch: refetchInfo,
  } = useGetContractInfo();
  useOnMint({ refetchInfo });
  const [tokens, setTokens] = useState<number[]>([]);

  const onClose = useCallback(() => {
    setTokens([]);
  }, []);

  const uintPrice = useMemo(() => {
    if (!price) return 0;
    return Number(utils.formatEther(price));
  }, [price]);

  const { mint, isLoading: isLoadingMint } = useMint({
    handleSuccess: (tokens) => {
      refetchInfo();
      setQuantity(1);
      setTokens(tokens);
    },
    quantity,
    price,
  });

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && positiveNum.test(value)) {
      setQuantity(Number(value));
    }

    if (!value) {
      setQuantity(undefined);
    }
  }, []);

  const available = useMemo(() => {
    if (!totalSupply) return 0;
    return 10000 - totalSupply.toNumber();
  }, [totalSupply]);

  const isLoading = useMemo(
    () => isLoadingContractInfo || isLoadingMint,
    [isLoadingContractInfo, isLoadingMint]
  );

  const totalPrice = useMemo(() => {
    if (!price) return 0;
    return BigNumber.from(price).mul(quantity || 1);
  }, [quantity, price]);

  const isEnoughBalance = useMemo(() => {
    if (!balance?.value) return false;
    return BigNumber.from(balance.value).gte(totalPrice);
  }, [balance?.value, totalPrice]);

  const { isError, errorMsg } = useMemo(() => {
    if (!isConnected) return { isError: false, errorMsg: null };

    if (quantity && !isEnoughBalance) {
      return { isError: true, errorMsg: "Insufficient funds" };
    }

    return { isError: false, errorMsg: null };
  }, [balance, quantity]);

  const isDisabled = useMemo(
    () =>
      !isConnected ||
      isLoading ||
      !available ||
      !mint ||
      !quantity ||
      available < quantity ||
      isError ||
      isLoadingBalance,
    [
      isConnected,
      isLoading,
      mint,
      quantity,
      available,
      isError,
      isLoadingBalance,
    ]
  );

  return (
    <>
      <section id="mint" className="mb-5">
        <h2 className="mt-10 mb-2 text-center text-3xl font-extrabold italic">
          MINT (Available: {available || "?"})
        </h2>
        {/* {isDev ? (
        <div className="mb-2 rounded-[10px] bg-yellow-200 py-2 px-5 text-black">
          ⚠️ Testnet
        </div>
      ) : null} */}
        <div className="flex flex-wrap justify-center gap-x-2">
          <div className="flex gap-x-2">
            <div className="relative">
              <span className="text-shadow-full text-md absolute right-0 -top-2 left-0 z-10 mx-auto flex w-full justify-center font-semibold italic text-white">
                QUANTITY
              </span>
              <Input
                disabled={isLoading}
                value={quantity}
                onChange={onChange}
                type="number"
                min={1}
                max={available}
              />
            </div>
            <div className="relative">
              {isError ? (
                <div className="text-shadow-full-red text-md absolute right-0 -bottom-2 left-0 z-10 mx-auto flex w-full justify-center font-semibold italic text-white">
                  {errorMsg}
                </div>
              ) : null}
              <Button
                disabled={isDisabled}
                loading={isLoading}
                onClick={() => mint?.()}
                className="min-w-[220px]"
              >
                Mint ({!quantity ? uintPrice : utils.formatEther(totalPrice)}{" "}
                ETH)
              </Button>
            </div>
          </div>
          <ConnectButton />
        </div>
      </section>
      <Modal tokens={tokens} onClose={onClose} />
    </>
  );
}

export default Mint;
