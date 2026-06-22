import { useState, useCallback } from 'react'
import * as contractUtils from './contractUtils'

export function useProfile(account) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createProfile = useCallback(
    async (username, bio) => {
      if (!account) throw new Error('No account connected')
      setLoading(true)
      setError(null)
      try {
        const tx = await contractUtils.createProfile(username, bio)
        setProfile({ username, bio, owner: account })
        return tx
      } catch (e) {
        setError(e.message)
        throw e
      } finally {
        setLoading(false)
      }
    },
    [account]
  )

  const fetchProfile = useCallback(
    async (addr) => {
      setLoading(true)
      setError(null)
      try {
        const p = await contractUtils.getProfile(addr)
        setProfile(p)
        return p
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { profile, loading, error, createProfile, fetchProfile }
}

export function usePost(account) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createPost = useCallback(
    async (contentHash) => {
      if (!account) throw new Error('No account connected')
      setLoading(true)
      setError(null)
      try {
        const receipt = await contractUtils.createPost(contentHash)
        return receipt
      } catch (e) {
        setError(e.message)
        throw e
      } finally {
        setLoading(false)
      }
    },
    [account]
  )

  return { loading, error, createPost }
}

export function useFollow(account) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const follow = useCallback(
    async (userAddr) => {
      if (!account) throw new Error('No account connected')
      setLoading(true)
      setError(null)
      try {
        const receipt = await contractUtils.followUser(userAddr)
        return receipt
      } catch (e) {
        setError(e.message)
        throw e
      } finally {
        setLoading(false)
      }
    },
    [account]
  )

  return { loading, error, follow }
}
