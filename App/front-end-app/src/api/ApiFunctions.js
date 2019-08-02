export function fetchLinesForName(name) {
    const url = 'https://tinderapp.azurewebsites.net/api/getLinesForName';
    const data = { "name": name };
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    })
}

export function fetchAuthToken(email, password) {
    const url = `https://tinderapp.azurewebsites.net/api/getAuthToken`;
    const data = { "email": email, "password": password };
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    })
}

export function fetchMatchData(token) {
    const url = `https://tinderapp.azurewebsites.net/api/getMatchData`;
    const data = { "token": token };
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    })
}

export function fetchMatchMessages(token, match_id) {
    const url = `https://tinderapp.azurewebsites.net/api/getMatchMessages`;
    const data = { "token": token, "match_id": match_id };
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    })
}