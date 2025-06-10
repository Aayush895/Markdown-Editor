const baseURL = 'http://localhost:3000/documents'

// TODO: Error handling for api responses
export async function createDocument({ docName, docBody }) {
  const response = await fetch(`${baseURL}/`, {
    method: 'POST',
    body: JSON.stringify({ name: docName, content: docBody }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await response.json()
}

export async function getDocuments() {
  const response = await fetch(`${baseURL}/`)
  return await response.json()
}

export async function deleteDocument(id) {
  const response = await fetch(`${baseURL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}
