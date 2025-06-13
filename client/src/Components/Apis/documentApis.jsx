// const baseURL = 'http://localhost:3000/documents'
const baseURL = 'https://markdown-editor-x6ea.onrender.com/documents'

// Helper to handle API response
async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const error = new Error(errorData.message || 'Something went wrong')
    error.status = response.status
    error.data = errorData
    throw error
  }
  return await response.json()
}

export async function createDocument({ docName, docBody }) {
  try {
    const response = await fetch(`${baseURL}/`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ name: docName, content: docBody }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return await handleResponse(response)
  } catch (error) {
    console.error('Create document error:', error)
    throw error
  }
}

export async function getDocuments() {
  try {
    const response = await fetch(`${baseURL}/`, {
      mode: 'cors',
    })
    return await handleResponse(response)
  } catch (error) {
    console.error('Fetch documents error:', error)
    throw error
  }
}

export async function editDocument(id, { docName, docBody }) {
  try {
    const response = await fetch(`${baseURL}/${id}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: docName, content: docBody }),
    })
    return await handleResponse(response)
  } catch (error) {
    console.error('Edit document error:', error)
    throw error
  }
}

export async function deleteDocument(id) {
  try {
    const response = await fetch(`${baseURL}/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await handleResponse(response)
  } catch (error) {
    console.error('Delete document error:', error)
    throw error
  }
}
