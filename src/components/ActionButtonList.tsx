import { useEffect } from 'react';
import { useDisconnect, useAppKit, useAppKitNetwork, useAppKitAccount  } from '@reown/appkit/react'
import { parseGwei, type Address } from 'viem'
import { useEstimateGas, useSendTransaction, useSignMessage, useBalance } from 'wagmi'

// test transaction
const TEST_TX = {
  to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045" as Address, // vitalik address
  value: parseGwei('0.0001')
}

interface ActionButtonListProps {
  sendHash: (hash: `0x${string}` ) => void;
  sendSignMsg: (hash: string) => void;
  sendBalance: (balance: string) => void;
}

export const ActionButtonList = ({ sendHash, sendSignMsg, sendBalance }: ActionButtonListProps) => {
    const { disconnect } = useDisconnect(); // AppKit hook to disconnect
    const { address, isConnected } = useAppKitAccount() // AppKit hook to get the address and check if the user is connected

    const { data: gas } = useEstimateGas({...TEST_TX}); // Wagmi hook to estimate gas
    const { data: hash, sendTransaction, } = useSendTransaction(); // Wagmi hook to send a transaction
    const { signMessageAsync } = useSignMessage() // Wagmi hook to sign a message
    const { refetch } = useBalance({
      address: address as Address
    }); // Wagmi hook to get the balance

    
    useEffect(() => {
        if (hash) {
          sendHash(hash);
        }
    }, [hash]);

  
    const handleDisconnect = async () => {
      try {
        await disconnect();
      } catch (error) {
        console.error("Failed to disconnect:", error);
      }
    };


  return (
    isConnected && (
    <div >
        <button onClick={handleDisconnect}>Disconnect</button>
    </div>
    )
  )
}
