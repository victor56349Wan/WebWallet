//
// if you are not going to read or write smart contract, you can delete this file
//

import { useAppKitNetwork, useAppKitAccount  } from '@reown/appkit/react'
import { useReadContract, useWriteContract } from 'wagmi'
import { useEffect } from 'react'
const storageABI = [
	{
		"inputs": [],
		"name": "retrieve",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const storageSC = "0xEe6D291CC60d7CeD6627fA4cd8506912245c8cA4" 

export const SmartContractActionButtonList = () => {
    const { isConnected } = useAppKitAccount() // AppKit hook to get the address and check if the user is connected
    const { chainId } = useAppKitNetwork()
    const { writeContract, isSuccess } = useWriteContract()
    const readContract = useReadContract({
      address: storageSC,
      abi: storageABI,
      functionName: 'retrieve',
      query: {
        enabled: false, // disable the query in onload
      }
    })

    useEffect(() => {
      if (isSuccess) {
        console.log("contract write success");
      }
    }, [isSuccess])

 


  return (
    isConnected && chainId === 11155111 && ( // Only show the buttons if the user is connected to Sepolia
    <div >
    </div>
    )
  )
}
