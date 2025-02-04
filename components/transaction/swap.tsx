import { Avatar, Name } from '@coinbase/onchainkit/identity';
import {
  Swap,
  SwapAmountInput,
  SwapToggleButton,
  SwapButton,
  SwapMessage,
  SwapToast,
} from '@coinbase/onchainkit/swap';
import { Wallet, ConnectWallet } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';
import type { Token } from '@coinbase/onchainkit/token';
import { ETHToken, USDCToken } from '@/data/dataToken';

export default function SwapBox() {
  const { address } = useAccount();

  const swappableTokens: Token[] = [
    ETHToken,
    USDCToken
  ];

  return address ? (
    <Swap className='border-1 border-foreground-50'>
      <SwapAmountInput
        label="Sell"
        swappableTokens={swappableTokens}
        token={ETHToken}
        type="from"
      />
      <SwapToggleButton className='rounded-full bg-black' />
      <SwapAmountInput
        label="Buy"
        swappableTokens={swappableTokens}
        token={USDCToken}
        type="to"
      />
      <SwapButton />
      <SwapMessage />
      <SwapToast />
    </Swap>
  ) : (
    <Wallet>
      <ConnectWallet>
        <Avatar className="h-6 w-6" />
        <Name />
      </ConnectWallet>
    </Wallet>
  );
}