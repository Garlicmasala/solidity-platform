import React, { useState, useEffect } from 'react'

export default function Feed({ account }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // In a real app: query from The Graph (subgraph) or fetch events from contract
    // For now, using mock data
    setLoading(true)
    setTimeout(() => {
      setPosts([
        {
          id: 0,
          author: '0xabc...def1',
          content: 'QmMock1',
          timestamp: new Date(Date.now() - 3600000).toLocaleString(),
          likes: 5
        },
        {
          id: 1,
          author: '0x123...456',
          content: 'QmMock2',
          timestamp: new Date(Date.now() - 1800000).toLocaleString(),
          likes: 2
        }
      ])
      setLoading(false)
    }, 500)
  }, [])

  return (
    <div>
      <h2>Feed</h2>
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet. Be the first to post!</p>
      ) : (
        posts.map(p => (
          <div key={p.id} className="post">
            <div className="meta">
              <strong>{p.author}</strong>
              <span style={{ marginLeft: '8px', fontSize: '12px', color: '#666' }}>
                {p.timestamp}
              </span>
            </div>
            <div className="content">{p.content}</div>
            <div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
              👍 {p.likes} likes
            </div>
          </div>
        ))
      )}
      <p style={{ fontSize: '12px', color: '#666', marginTop: '20px' }}>
        💡 Tip: In production, integrate The Graph to query posts from contract events
      </p>
    </div>
  )
}
