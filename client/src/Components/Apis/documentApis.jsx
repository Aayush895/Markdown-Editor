const baseURL = 'http://localhost:3000/documents'

// TODO: Error handling for api responses
export async function createDocument({ docName, docBody }) {
  const response = await fetch(`${baseURL}/`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ name: docName, content: docBody }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await response.json()
}

export async function getDocuments() {
  const response = await fetch(`${baseURL}/`, {
    mode: 'cors',
  })
  return await response.json()
}

export async function editDocument(id, { docName, docBody }) {
  const response = await fetch(`${baseURL}/${id}`, {
    method: 'PATCH',
    mode: 'cors',
    body: JSON.stringify({ name: docName, content: docBody }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await response.json()
}

export async function deleteDocument(id) {
  const response = await fetch(`${baseURL}/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}
