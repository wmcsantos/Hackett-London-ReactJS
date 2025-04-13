export default async function updateUser(updatedData: any, token: string) {
    const response = await fetch(`http://localhost:8000/users/me`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })

    if (!response.ok) {
        throw new Error('Failed to update user')
    }

    return await response.json()
}