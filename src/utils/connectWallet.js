import { ethers } from "ethers";
import EthereumProvider from "@walletconnect/ethereum-provider";

export const connectWallet = async () => {
    try {
        let provider;

        // If MetaMask or injected wallet exists
        if (window.ethereum) {
            provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
        } else {
            // WalletConnect fallback (QR wallets)
            const wcProvider = await EthereumProvider.init({
                projectId: "c674e5428b407689d82656c738203f81", // get from WalletConnect Cloud
                chains: [43114], // Avalanche C-Chain
                showQrModal: true
            });

            await wcProvider.connect();
            provider = new ethers.BrowserProvider(wcProvider);
        }

        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        console.log("Connected wallet:", address);
        return address;

    } catch (error) {
        console.error("Wallet connection failed:", error);
        throw error;
    }
};
