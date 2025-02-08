import TransactionTabs from "./_components/TransactionTabs";

export default function page() {
  return (
    <section id="home" className="relative flex w-full h-full items-center justify-start sm:justify-center flex-grow overflow-x-auto">
      <div className="w-full">
        <TransactionTabs />
      </div>
    </section>
  );
}
