"use client";

import { cn } from "@/lib/utils";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <motion.img
      src={card.thumbnail}
      height="500"
      width="500"
      className={cn(
        "object-cover object-center absolute inset-0 h-full w-full transition duration-200"
      )}
      alt="thumbnail"
    />
  );
};

export function FaucetGrid() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<string>("");

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleClaim = useCallback(() => {
    setTransactionStatus("Processing");
    setTimeout(() => {
      setTransactionStatus("Completed");
    }, 2000);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCard(null);
    setTransactionStatus("");
  }, []);

  const getModalTitle = (card: Card | null) => {
    if (!card) return "";
    if (card.id === 1) return "What is Faucet?";

    try {
      const content = card.content as JSX.Element;
      if (content?.props?.children) {
        const titleElement = content.props.children.find(
          (child: { props?: { className?: string } }) => child?.props?.className?.includes('font-bold')
        );
        return titleElement ? `Claim ${titleElement.props.children}` : "Claim Tokens";
      }
      return "Claim Tokens";
    } catch {
      return "Claim Tokens";
    }
  };

  return (
    <div className="w-full h-screen py-10">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
        {cards.map((card, i) => (
          <div key={i} className={cn(card.className)}>
            <motion.div
              onClick={() => handleCardClick(card)}
              className={cn(
                card.className,
                "relative overflow-hidden cursor-pointer bg-white rounded-xl h-full w-full hover:scale-105 transition-transform duration-200"
              )}
              whileHover={{ y: -5 }}
            >
              <ImageComponent card={card} />
            </motion.div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onClose={closeModal}
        style={{ backgroundImage: `url(${selectedCard?.thumbnail})` }}
        className="max-w-2xl bg-cover bg-center bg-white"
      >
        <ModalContent>
          <div className="backdrop-brightness-25 w-full h-full bg-black/60">
            <ModalHeader className="text-2xl font-bold">
              {getModalTitle(selectedCard)}
            </ModalHeader>
            <ModalBody className="p-6">
              <div className="text-lg pt-20">
                {selectedCard?.content}
              </div>

              {selectedCard?.id !== 1 && (
                <div className="mt-6 space-y-4">
                  <div className="flex gap-4">
                    <Button
                      className="flex-1 bg-primary"
                      onClick={handleClaim}
                      disabled={!!transactionStatus}
                    >
                      {transactionStatus ? "Processing..." : "$ CLAIM"}
                    </Button>

                    <Button
                      className="flex-1"
                      variant="bordered"
                      onClick={closeModal}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </ModalBody>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div className="cursor-default">
      <p className="font-bold md:text-4xl text-xl text-white">
        What is faucet?
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Faucet is a service that provides small amounts of cryptocurrency for free, usually for testing purposes.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div className="cursor-default">
      <p className="font-bold md:text-4xl text-xl text-white">
        $UNI
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        UNI token is the governance token of Uniswap, one of the largest decentralized exchanges (DEX) built on Ethereum.
      </p>
      <Button variant="shadow" className="bg-pink-500">
        $ CLAIM
      </Button>
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <div className="cursor-default">
      <p className="font-bold md:text-4xl text-xl text-white">
        $DAI
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        DAI token is a decentralized, collateral-backed stablecoin that aims to maintain a 1:1 peg with the US dollar.
      </p>
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div className="cursor-default">
      <p className="font-bold md:text-4xl text-xl text-white">
        $WETH
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        WETH (Wrapped Ether) is a token that represents ETH (Ethereum) in an ERC-20 compatible form.
      </p>
    </div>
  );
};

const SkeletonFive = () => {
  return (
    <div className="cursor-default">
      <p className="font-bold md:text-4xl text-xl text-white">
        $USDT
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        USDT (Tether) is a centralized stablecoin pegged to the US dollar, meaning 1 USDT ≈ $1.
      </p>
    </div>
  );
};

const SkeletonSix = () => {
  return (
    <div className="cursor-default">
      <p className="font-bold md:text-4xl text-xl text-white">
        $USDC
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        USDC (USD Coin) is a centralized stablecoin pegged to the US dollar (1 USDC = $1).
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "/bg-faucet.jpg",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "/bg-uni.jpg",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "/bg-dai.jpg",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "/bg-weth.jpg",
  },
  {
    id: 5,
    content: <SkeletonFive />,
    className: "md:col-span-2",
    thumbnail:
      "/bg-usdt.jpg",
  },
  {
    id: 6,
    content: <SkeletonSix />,
    className: "col-span-1",
    thumbnail:
      "/bg-usdc.jpeg",
  },
];
