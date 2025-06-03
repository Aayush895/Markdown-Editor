const baseURL = 'http://localhost:3000/documents'

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
