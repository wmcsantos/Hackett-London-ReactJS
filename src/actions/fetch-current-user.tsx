const fetchCurrentUser = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error('No token found!')
    }

    const res = await fetch('http://localhost:8000/auth/users/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })

    if (!res.ok) {
        throw new Error('Failed to fetch user info')
    }

    const data = await res.json()
    return data
}

export default fetchCurrentUser