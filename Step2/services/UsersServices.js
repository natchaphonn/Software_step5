export async function createMovie(data) {
  console.log( data )
    const response = await fetch(`http://localhost:3001/api/user/insert`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: data
      })
    return await response.json();
}