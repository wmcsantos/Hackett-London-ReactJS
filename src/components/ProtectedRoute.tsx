import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.tsx'
import React from 'react'

interface ProtectedRouteProps {
    children: React.ReactNode
    redirectIfAuthenticated?: boolean
    fallbackPath?: string
}

const ProtectedRoute = ({ 
    children,
    redirectIfAuthenticated = false,
    fallbackPath = '/login' 
}: ProtectedRouteProps) => {
    const { user, loading } = useUser()

    if (redirectIfAuthenticated) {
        if (user && !loading) {
            return <Navigate to="/account" replace />
        }
    } else {
        if (!user && !loading) {
            return <Navigate to={fallbackPath} replace />
        }
    }

    return <>{children}</>
}

export default ProtectedRoute
