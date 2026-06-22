import React, { useState } from 'react'
import WalletConnect from './components/WalletConnect'
import Profile from './pages/Profile'
import Feed from './pages/Feed'
import PostCreate from './pages/PostCreate'

export default function App() {
  const [route, setRoute] = useState('feed')
  const [account, setAccount] = useState(null)

  return (
    <div className="app">
      <header>
        <h1>Solidity Platform (dApp)</h1>
        <nav>
          <button onClick={() => setRoute('feed')}>Feed</button>
          <button onClick={() => setRoute('profile')}>Profile</button>
          <button onClick={() => setRoute('post')}>New Post</button>
        </nav>
        <WalletConnect account={account} setAccount={setAccount} />
      </header>

      <main>
        {route === 'feed' && <Feed account={account} />}
        {route === 'profile' && <Profile account={account} />}
        {route === 'post' && <PostCreate account={account} />}
      </main>
    </div>
  )
}
