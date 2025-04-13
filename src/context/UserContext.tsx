import React, { createContext, useContext, useEffect, useState } from 'react'
import fetchCurrentUser from '../actions/fetch-current-user.tsx'

type User = {
    title: string
    first_name: string
    last_name: string
    email: string
    gender: string
    is_admin: boolean
}

type UserContextType = {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    loading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await fetchCurrentUser()
                setUser(userData)
            } catch (err) {
                console.log('No user logged in or error:', err)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, loading}}>
            { children }
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}