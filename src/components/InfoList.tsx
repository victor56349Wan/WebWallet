import { useEffect } from 'react'
import {
    useAppKitState,
    useAppKitTheme,
    useAppKitEvents,
    useAppKitAccount,
    useWalletInfo
     } from '@reown/appkit/react'
import { useWaitForTransactionReceipt } from 'wagmi'

interface InfoListProps {
    hash: `0x${string}` | undefined;
    signedMsg: string;
    balance: string;
}

export const InfoList = ({ hash, signedMsg }: InfoListProps) => {
    const {address, isConnected, embeddedWalletInfo } = useAppKitAccount(); // AppKit hook to get the account information
    const events = useAppKitEvents() // AppKit hook to get the events

    const { data: receipt } = useWaitForTransactionReceipt({ hash, confirmations: 2,  // Wait for at least 2 confirmation
        timeout: 300000,    // Timeout in milliseconds (5 minutes)
        pollingInterval: 1000,  })

    useEffect(() => {
        console.log("Events: ", events);
    }, [events]);

    useEffect(() => {
        console.log("Embedded Wallet Info: ", embeddedWalletInfo);
    }, [embeddedWalletInfo]);

  return (
    <>
        {hash && (
        <section>
            <h2>Sign Tx</h2>
            <pre>
                Hash: {hash}<br />
                Status: {receipt?.status.toString()}<br />
            </pre>
        </section>
        )}
        {signedMsg && (
        <section>
            <h2>Sign msg</h2>
            <pre>
                signedMsg: {signedMsg}<br />
            </pre>
        </section>
        )}
        <section>
            <h2>Status</h2>
            <pre>
                Address: {address}<br />
                Connected: {isConnected.toString()}<br />
            </pre>
        </section>

    </>
  )
}
