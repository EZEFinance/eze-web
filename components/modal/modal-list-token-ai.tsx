import { Button } from '@heroui/button'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/modal'
import { Image } from '@heroui/image'
import React from 'react'
import { useStaking } from '@/hooks/query/useStaking'
import { DECIMALS_MOCK_TOKEN } from '@/lib/constants'
import { useAccountBalanceAI } from '@/hooks/query/useAccountBalanceAI'
import { useTransferAI } from '@/hooks/mutation/api/useTransferAI'
import { useAccount } from 'wagmi'
import { Input } from '@heroui/input'
import ModalTransactionCustom from './modal-transaction-custom'
import { Loader2 } from 'lucide-react'

export default function ModalListTokenAI({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: () => void;
}) {
  const { sData } = useStaking();
  const { address } = useAccount();
  const [isOpenUSDC, setIsOpenUSDC] = React.useState<boolean>(false);
  const [isOpenUSDT, setIsOpenUSDT] = React.useState<boolean>(false);
  const [isOpenDAI, setIsOpenDAI] = React.useState<boolean>(false);
  const [isOpenWETH, setIsOpenWETH] = React.useState<boolean>(false);
  const [isOpenUNI, setIsOpenUNI] = React.useState<boolean>(false);

  const mockUSDC = sData?.find((pool) => pool.nameToken === 'USDC') ?? null;
  const mockUSDT = sData?.find((pool) => pool.nameToken === 'USDT') ?? null;
  const mockDAI = sData?.find((pool) => pool.nameToken === 'DAI') ?? null;
  const mockWETH = sData?.find((pool) => pool.nameToken === 'WETH') ?? null;
  const mockUNI = sData?.find((pool) => pool.nameToken === 'UNI') ?? null;

  const { bNormalized: bnUSDC } = useAccountBalanceAI({ token: mockUSDC?.addressToken as HexAddress, decimal: DECIMALS_MOCK_TOKEN });
  const { bNormalized: bnUSDT } = useAccountBalanceAI({ token: mockUSDT?.addressToken as HexAddress, decimal: DECIMALS_MOCK_TOKEN });
  const { bNormalized: bnDAI } = useAccountBalanceAI({ token: mockDAI?.addressToken as HexAddress, decimal: DECIMALS_MOCK_TOKEN });
  const { bNormalized: bnWETH } = useAccountBalanceAI({ token: mockWETH?.addressToken as HexAddress, decimal: DECIMALS_MOCK_TOKEN });
  const { bNormalized: bnUNI } = useAccountBalanceAI({ token: mockUNI?.addressToken as HexAddress, decimal: DECIMALS_MOCK_TOKEN });

  const [amountUSDC, setAmountUSDC] = React.useState<string>('');
  const [amountUSDT, setAmountUSDT] = React.useState<string>('');
  const [amountDAI, setAmountDAI] = React.useState<string>('');
  const [amountWETH, setAmountWETH] = React.useState<string>('');
  const [amountUNI, setAmountUNI] = React.useState<string>('');

  const { mutation: mUSDC, result: rUSDC } = useTransferAI();
  const { mutation: mUSDT, result: rUSDT } = useTransferAI();
  const { mutation: mDAI, result: rDAI } = useTransferAI();
  const { mutation: mWETH, result: rWETH } = useTransferAI();
  const { mutation: mUNI, result: rUNI } = useTransferAI();

  const handleTransfer = async (token: string) => {
    if (token === 'USDC') {
      await mUSDC.mutateAsync({
        user_address: address as HexAddress,
        contract_address: mockUSDC?.addressToken as string,
        to: address as HexAddress,
        amount: amountUSDC
      }, {
        onSuccess: () => setIsOpenUSDC(true)
      });
    } else if (token === 'USDT') {
      await mUSDT.mutateAsync({
        user_address: address as HexAddress,
        contract_address: mockUSDT?.addressToken as string,
        to: address as HexAddress,
        amount: amountUSDT
      }, {
        onSuccess: () => setIsOpenUSDT(true)
      });
    } else if (token === 'DAI') {
      await mDAI.mutateAsync({
        user_address: address as HexAddress,
        contract_address: mockDAI?.addressToken as string,
        to: address as HexAddress,
        amount: amountDAI
      }, {
        onSuccess: () => setIsOpenDAI(true)
      });
    } else if (token === 'WETH') {
      await mWETH.mutateAsync({
        user_address: address as HexAddress,
        contract_address: mockWETH?.addressToken as string,
        to: address as HexAddress,
        amount: amountWETH
      }, {
        onSuccess: () => setIsOpenWETH(true)
      });
    } else if (token === 'UNI') {
      await mUNI.mutateAsync({
        user_address: address as HexAddress,
        contract_address: mockUNI?.addressToken as string,
        to: address as HexAddress,
        amount: amountUNI
      }, {
        onSuccess: () => setIsOpenUNI(true)
      });
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      className='pb-5'
    >
      <ModalContent>
        <ModalHeader>
          List Token
        </ModalHeader>
        <ModalBody>
          <div className='flex flex-col gap-4 w-full h-full'>
            <div className='flex flex-col gap-4 w-full h-[60vh] overflow-y-scroll px-2'>
              <div className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between gap-2 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
                <div className='flex flex-col gap-2 w-full'>
                  <div className="flex items-center gap-3 justify-between">
                    <div className='flex flex-row gap-2 items-center'>
                      <div className="w-10 h-10 rounded-full bg-gray-700/50 p-2 flex items-center justify-center group-hover:bg-gray-700 transition-all">
                        <Image
                          src={mockUSDC?.logo}
                          alt={`${mockUSDC?.nameToken} logo`}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-300">{mockUSDC?.nameToken}</span>
                        <span className="text-xs text-gray-500">Token</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-bold text-white">
                        {bnUSDC ? Number(bnUSDC).toFixed(2) : '0.0000'}
                      </span>
                      <span className="text-xs text-gray-500">Balance</span>
                    </div>
                  </div>
                  <Input type='number' placeholder='Amount' variant='bordered' onChange={(e) => setAmountUSDC(e.target.value)} />
                  <Button
                    onPress={() => handleTransfer('USDC')}
                    isLoading={mUSDC.isPending}
                    disabled={!amountUSDC}
                  >
                    {mUSDC.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Transfer'}
                  </Button>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between gap-2 border border-gray-700 hover:border-blue-500/50 transition-all group">
                <div className='flex flex-col gap-2 w-full'>
                  <div className="flex items-center gap-3 justify-between">
                    <div className='flex flex-row gap-2 items-center'>
                      <div className="w-10 h-10 rounded-full bg-gray-700/50 p-2 flex items-center justify-center group-hover:bg-gray-700 transition-all">
                        <Image
                          src={mockUSDT?.logo}
                          alt={`${mockUSDT?.nameToken} logo`}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-300">{mockUSDT?.nameToken}</span>
                        <span className="text-xs text-gray-500">Token</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-bold text-white">
                        {bnUSDT ? Number(bnUSDT).toFixed(2) : '0.0000'}
                      </span>
                      <span className="text-xs text-gray-500">Balance</span>
                    </div>
                  </div>
                  <Input type='number' placeholder='Amount' variant='bordered' onChange={(e) => setAmountUSDT(e.target.value)} />
                  <Button
                    onPress={() => handleTransfer('USDT')}
                    isLoading={mUSDT.isPending}
                    disabled={!amountUSDT}
                  >
                    {mUSDT.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Transfer'}
                  </Button>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between gap-2 border border-gray-700 hover:border-blue-500/50 transition-all group">
                <div className='flex flex-col gap-2 w-full'>
                  <div className="flex items-center gap-3 justify-between">
                    <div className='flex flex-row gap-2 items-center'>
                      <div className="w-10 h-10 rounded-full bg-gray-700/50 p-2 flex items-center justify-center group-hover:bg-gray-700 transition-all">
                        <Image
                          src={mockDAI?.logo}
                          alt={`${mockDAI?.nameToken} logo`}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-300">{mockDAI?.nameToken}</span>
                        <span className="text-xs text-gray-500">Token</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-bold text-white">
                        {bnDAI ? Number(bnDAI).toFixed(2) : '0.0000'}
                      </span>
                      <span className="text-xs text-gray-500">Balance</span>
                    </div>
                  </div>
                  <Input type='number' placeholder='Amount' variant='bordered' onChange={(e) => setAmountDAI(e.target.value)} />
                  <Button
                    onPress={() => handleTransfer('DAI')}
                    isLoading={mDAI.isPending}
                    disabled={!amountDAI}
                  >
                    {mDAI.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Transfer'}
                  </Button>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between gap-2 border border-gray-700 hover:border-blue-500/50 transition-all group">
                <div className='flex flex-col gap-2 w-full'>
                  <div className="flex items-center gap-3 justify-between">
                    <div className='flex flex-row gap-2 items-center'>
                      <div className="w-10 h-10 rounded-full bg-gray-700/50 p-2 flex items-center justify-center group-hover:bg-gray-700 transition-all">
                        <Image
                          src={mockWETH?.logo}
                          alt={`${mockWETH?.nameToken} logo`}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-300">{mockWETH?.nameToken}</span>
                        <span className="text-xs text-gray-500">Token</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-bold text-white">
                        {bnWETH ? Number(bnWETH).toFixed(2) : '0.0000'}
                      </span>
                      <span className="text-xs text-gray-500">Balance</span>
                    </div>
                  </div>
                  <Input type='number' placeholder='Amount' variant='bordered' onChange={(e) => setAmountWETH(e.target.value)} />
                  <Button
                    onPress={() => handleTransfer('WETH')}
                    isLoading={mWETH.isPending}
                    disabled={!amountWETH}
                  >
                    {mWETH.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Transfer'}
                  </Button>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between gap-2 border border-gray-700 hover:border-blue-500/50 transition-all group">
                <div className='flex flex-col gap-2 w-full'>
                  <div className="flex items-center gap-3 justify-between">
                    <div className='flex flex-row gap-2 items-center'>
                      <div className="w-10 h-10 rounded-full bg-gray-700/50 p-2 flex items-center justify-center group-hover:bg-gray-700 transition-all">
                        <Image
                          src={mockUNI?.logo}
                          alt={`${mockUNI?.nameToken} logo`}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-300">{mockUNI?.nameToken}</span>
                        <span className="text-xs text-gray-500">Token</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-bold text-white">
                        {bnUNI ? Number(bnUNI).toFixed(2) : '0.0000'}
                      </span>
                      <span className="text-xs text-gray-500">Balance</span>
                    </div>
                  </div>
                  <Input type='number' placeholder='Amount' variant='bordered' onChange={(e) => setAmountUNI(e.target.value)} />
                  <Button
                    onPress={() => handleTransfer('UNI')}
                    isLoading={mUNI.isPending}
                    disabled={!amountUNI}
                  >
                    {mUNI.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Transfer'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Button
            onPress={setIsOpen}
            className='mt-4'
          >
            Close
          </Button>
        </ModalBody>
      </ModalContent >
      <ModalTransactionCustom
        isOpen={isOpenUSDC}
        setIsOpen={() => setIsOpenUSDC(!isOpenUSDC)}
        data={rUSDC?.txhash || ""}
        name='transfer'
        status={mUSDC.status}
      />
      <ModalTransactionCustom
        isOpen={isOpenUSDT}
        setIsOpen={() => setIsOpenUSDT(!isOpenUSDT)}
        data={rUSDT?.txhash || ""}
        name='transfer'
        status={mUSDT.status}
      />
      <ModalTransactionCustom
        isOpen={isOpenDAI}
        setIsOpen={() => setIsOpenDAI(!isOpenDAI)}
        data={rDAI?.txhash || ""}
        name='transfer'
        status={mDAI.status}
      />
      <ModalTransactionCustom
        isOpen={isOpenWETH}
        setIsOpen={() => setIsOpenWETH(!isOpenWETH)}
        data={rWETH?.txhash || ""}
        name='transfer'
        status={mWETH.status}
      />
      <ModalTransactionCustom
        isOpen={isOpenUNI}
        setIsOpen={() => setIsOpenUNI(!isOpenUNI)}
        data={rUNI?.txhash || ""}
        name='transfer'
        status={mUNI.status}
      />
    </Modal >
  )
}
