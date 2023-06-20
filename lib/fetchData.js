export async function getDestinations() {
    const res = await fetch('https://space-tourism-json-server.vercel.app/destinations')
    if (!res.ok) throw new Error('failed to fetch data')
    return res.json()
}

export async function getCrew() {
    const res = await fetch('https://space-tourism-json-server.vercel.app/crew')
    if (!res.ok) throw new Error('failed to fetch data')
    return res.json()
}

export async function getTech() {
    const res = await fetch('https://space-tourism-json-server.vercel.app/technology')
    if (!res.ok) throw new Error('failed to fetch data')
    return res.json()
}

