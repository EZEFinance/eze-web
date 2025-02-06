import { Button } from '@heroui/button'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/modal'
import { Image } from '@heroui/image'
import React from 'react'
import { useAccountBalance } from '@/hooks/query/useAccountBalance'
import { useStaking } from '@/hooks/query/useStaking'
import { DECIMALS_MOCK_TOKEN } from '@/lib/constants'
import { useAddressAI } from '@/hooks/query/useAddressAI'
import { Input } from '@heroui/input'
import ButtonTransfer from '../button/button-transfer'

export default function ModalListToken({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: () => void;
}) {
  const { sData } = useStaking();
  const { addressAI } = useAddressAI();

  const mockUSDC = sData?.find((pool) => pool.nameToken === 'USDC') ?? null;
  const mockUSDT = sData?.find((pool) => pool.nameToken === 'USDT') ?? null;
  const mockDAI = sData?.find((pool) => pool.nameToken === 'DAI') ?? null;
  const mockWETH = sData?.find((pool) => pool.nameToken === 'WETH') ?? null;
  const mockUNI = sData?.find((pool) => pool.nameToken === 'UNI') ?? null;

  const { bNormalized: bnUSDC, bRefetch: brUSDC } = useAccountBalance({ token: mockUSDC?.addressToken as HexAddress, decimal: DECIMALS_MOCK_TOKEN });
  const { bNormalized: bnUSDT, bRefetch: brUSDT } = useAccountBalance({ token: mockUSDT?.addressToken as HexAddress, decimal: DECIMALS_MOCK_TOKEN });
  const { bNormalized: bnDAI, bRefetch: brDAI } = useAccountBalance({ token: mockDAI?.addressToken as HexAddress, decimal: DECIMALS_MOCK_TOKEN });
  const { bNormalized: bnWETH, bRefetch: brWETH } = useAccountBalance({ token: mockWETH?.addressToken as HexAddress, decimal: DECIMALS_MOCK_TOKEN });
  const { bNormalized: bnUNI, bRefetch: brUNI } = useAccountBalance({ token: mockUNI?.addressToken as HexAddress, decimal: DECIMALS_MOCK_TOKEN });

  const [amountUSDC, setAmountUSDC] = React.useState<string>('');
  const [amountUSDT, setAmountUSDT] = React.useState<string>('');
  const [amountDAI, setAmountDAI] = React.useState<string>('');
  const [amountWETH, setAmountWETH] = React.useState<string>('');
  const [amountUNI, setAmountUNI] = React.useState<string>('');

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
                  <ButtonTransfer
                    addressToken={mockUSDC?.addressToken as HexAddress}
                    amount={amountUSDC}
                    toAddress={addressAI as HexAddress}
                    bRefetch={brUSDC}
                    disabled={!amountUSDC}
                  />
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between gap-2 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
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
                  <ButtonTransfer
                    addressToken={mockUNI?.addressToken as HexAddress}
                    amount={amountUNI}
                    toAddress={addressAI as HexAddress}
                    bRefetch={brUNI}
                    disabled={!amountUNI}
                  />
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between gap-2 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
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
                  <Input type='number' variant='bordered' placeholder='Amount' onChange={(e) => setAmountDAI(e.target.value)} />
                  <ButtonTransfer
                    addressToken={mockDAI?.addressToken as HexAddress}
                    amount={amountDAI}
                    toAddress={addressAI as HexAddress}
                    bRefetch={brDAI}
                    disabled={!amountDAI}
                  />
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between gap-2 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
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
                  <ButtonTransfer
                    addressToken={mockWETH?.addressToken as HexAddress}
                    amount={amountWETH}
                    toAddress={addressAI as HexAddress}
                    bRefetch={brWETH}
                    disabled={!amountWETH}
                  />
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between gap-2 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
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
                  <ButtonTransfer
                    addressToken={mockUSDT?.addressToken as HexAddress}
                    amount={amountUSDT}
                    toAddress={addressAI as HexAddress}
                    bRefetch={brUSDT}
                    disabled={!amountUSDT}
                  />
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
    </Modal >
  )
}
