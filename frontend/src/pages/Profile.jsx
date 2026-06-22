import React, { useState } from 'react'
import { useProfile } from '../contracts/hooks'

export default function Profile({ account }) {
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const { loading, error, createProfile, fetchProfile } = useProfile(account)

  async function handleCreate() {
    if (!account) return alert('Connect wallet first')
    try {
      await createProfile(username, bio)
      alert('Profile created! (Check console for tx details)')
      setUsername('')
      setBio('')
    } catch (e) {
      alert(`Error: ${e.message}`)
    }
  }

  async function handleFetch() {
    if (!account) return alert('Connect wallet first')
    try {
      const profile = await fetchProfile(account)
      alert(`Profile: ${profile.username || '(none)'} - Bio: ${profile.bio || '(none)'}`)
    } catch (e) {
      alert(`Error: ${e.message}`)
    }
  }

  return (
    <div>
      <h2>Profile</h2>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      
      <div>
        <label>Username</label>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          disabled={loading}
        />
      </div>

      <div>
        <label>Bio</label>
        <input
          value={bio}
          onChange={e => setBio(e.target.value)}
          disabled={loading}
        />
      </div>

      <button onClick={handleCreate} disabled={loading || !account}>
        {loading ? 'Creating...' : 'Create / Update Profile'}
      </button>

      <button onClick={handleFetch} disabled={loading || !account} style={{ marginLeft: '8px' }}>
        Fetch My Profile
      </button>
    </div>
  )
}
