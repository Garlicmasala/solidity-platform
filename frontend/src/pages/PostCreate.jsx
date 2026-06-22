import React, { useState } from 'react'
import { usePost } from '../contracts/hooks'

export default function PostCreate({ account }) {
  const [content, setContent] = useState('')
  const { loading, error, createPost } = usePost(account)

  async function submitPost() {
    if (!account) return alert('Connect wallet first')
    
    // In a real app, upload to IPFS first to get contentHash
    // For now, using a mock IPFS hash
    const contentHash = 'QmMock' + Math.random().toString(36).slice(2)
    
    try {
      const receipt = await createPost(contentHash)
      alert(`Post created! TX: ${receipt.transactionHash}`)
      setContent('')
    } catch (e) {
      alert(`Error: ${e.message}`)
    }
  }

  return (
    <div>
      <h2>New Post</h2>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={6}
        disabled={loading}
      />
      <br />
      <button onClick={submitPost} disabled={loading || !account}>
        {loading ? 'Publishing...' : 'Publish'}
      </button>
      <p style={{ fontSize: '12px', color: '#666' }}>
        Note: Content is stored with mock IPFS hash. In production, use IPFS gateway.
      </p>
    </div>
  )
}
