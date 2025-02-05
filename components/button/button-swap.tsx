'use client';
import { EZEFinanceABI } from '@/lib/abis/EZEFinanceABI';
import { MockTokenABI } from '@/lib/abis/MockTokenABI';
import { denormalize, valueToBigInt } from '@/lib/bignumber';
import { ADDRESS_EZEFINANCE } from '@/lib/constants';
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import type {
  TransactionError,
  TransactionResponse,
} from '@coinbase/onchainkit/transaction';
import type { ContractFunctionParameters } from 'viem';

export default function ButtonSwap({
  fromToken,
  toToken,
  validateSwap,
  addressTokenIn,
  addressTokenOut,
  amount,
  decimals,
  disabled
}: {
  fromToken: {
    addressToken: string;
  };
  toToken: {
    addressToken: string;
  };
  validateSwap: () => boolean;
  addressTokenIn: string;
  addressTokenOut: string;
  amount: string;
  decimals: number;
  disabled: boolean;
}) {
  const dAmount = denormalize(amount || 0, decimals);

  const contracts = [
    {
      address: addressTokenIn,
      abi: MockTokenABI,
      functionName: 'approve',
      args: [ADDRESS_EZEFINANCE, valueToBigInt(dAmount + 10)],
    },
    {
      address: ADDRESS_EZEFINANCE,
      abi: EZEFinanceABI,
      functionName: 'swap',
      args: [addressTokenIn, addressTokenOut, valueToBigInt(dAmount)],
    }
  ] as unknown as ContractFunctionParameters[];

  const handleError = (err: TransactionError) => {
    console.error('Transaction error:', err);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
  };

  return (
    <div className="flex">
      <Transaction
        contracts={contracts}
        className=""
        chainId={84532}
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <TransactionButton
          className="z-0 group relative text-sm inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 gap-2 w-full [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover mt-2 rounded-[20px] h-12"
          text={!fromToken ? 'Select From Token' :
            !toToken ? 'Select To Token' :
              !amount ? 'Enter Amount' :
                validateSwap() ? 'Swap' : 'Insufficient Balance'}
          disabled={disabled}
        />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}