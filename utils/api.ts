// createURL is a helper function that creates a URL based on the path passed in.
// It works by using the window.location.origin to get the origin of the current page and then appending the path to it.
// This is useful because it allows us to make requests to the same origin as the current page without having to hardcode the origin.
const createURL = (path) => {
    return window.location.origin + path
}

export const updatedEntry = async (id, content) => {
    const res = await fetch(new Request(createURL(`/api/journal/${id}`), {
        method: 'PATCH',
        body: JSON.stringify({ content }),
    }))

    if (res.ok) {
        const data = await res.json()
        return data.data
    }

}


export const createNewEntry = async () => {
    const res = await fetch(new Request(createURL('/api/journal'), {
        method: 'POST',
    }))

    if (res.ok) {
        const data = await res.json()
        return data.data
    }
}


export const askQuestion = async question => {
    const res = await fetch(new Request(createURL('/api/question'), {
        method: 'POST',
        body: JSON.stringify({ question }),
    }))

    if (res.ok) {
        const data = await res.json()
        return data.data
    }
}

export const deleteEntry = async (id) => {
    const res = await fetch(new Request(createURL(`/api/journal/${id}`), {
        method: 'DELETE',
    }))

    if (res.ok) {
        const data = await res.json()
        return data.data
    }
}
