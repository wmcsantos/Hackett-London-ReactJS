export interface Login {
    access_token: string
    token_type: string
  }
  
  const loginAccess = async (
    email: string, 
    password: string
): Promise<Login> => {
    try {
        const formData = new URLSearchParams()
        formData.append('username', email)
        formData.append('password', password)

        const response = await fetch(`http://localhost:8000/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        })
    
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.detail || `HTTP error! Status: ${response.status}`)
        }
    
        return response.json()
    } catch (error) {
        console.error('Login error:', error);
        throw error
    }
  }
  
  export default loginAccess