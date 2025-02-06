import SwapCard from "@/components/card/card-swap";

export default function page() {
  return (
    <section id="home" className="relative flex w-full h-full items-center justify-start sm:justify-center flex-grow overflow-x-auto">
      <div className="w-full">
        <SwapCard />
      </div>
    </section>
  );
}
