"use client";

import { cn } from "@/lib/utils";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { Input } from "@heroui/input";
import { cardsFaucet } from "./FaucetComponents";

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
        {cardsFaucet.map((card, i) => (
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

              <Input variant="bordered" placeholder="address"/>

              {selectedCard?.id !== 1 && (
                <div className="flex gap-4">
                  <Button
                    className={`flex-1 ${selectedCard?.id === 2 ? "bg-pink-500" :
                        selectedCard?.id === 3 ? "bg-purple-500" :
                          selectedCard?.id === 4 ? "bg-purple-500" :
                            selectedCard?.id === 5 ? "bg-green-500" :
                              selectedCard?.id === 6 ? "bg-blue-500" : ""
                      }`}
                    onPress={handleClaim}
                    disabled={!!transactionStatus}
                  >
                    {transactionStatus ? "Processing..." : "$ CLAIM"}
                  </Button>

                  <Button
                    className="flex-1"
                    variant="flat"
                    onPress={closeModal}
                  >
                    Close
                  </Button>
                </div>
              )}
            </ModalBody>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}