import React, { useEffect } from 'react'
import { ethers } from 'ethers'

export default function WalletConnect({ account, setAccount }) {
  useEffect(() => {
    if (window.ethereum && !account) {
      window.ethereum.request({ method: 'eth_accounts' }).then((acc) => {
        if (acc && acc[0]) setAccount(acc[0])
      })
    }
  }, [])

  async function connect() {
    if (!window.ethereum) return alert('Please install MetaMask')
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAccount(accounts[0])
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="wallet">
      {account ? (
        <span className="acct">{account}</span>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  )
}
