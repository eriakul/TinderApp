export function fetchLinesForName(name) {
    const url = 'https://tinderapp.azurewebsites.net/api/getLinesForName';
    const data = { "name": name.toLowerCase() };
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    })
}

export function sendSmsMessage(number) {
    const url = `https://tinderapp.azurewebsites.net/api/sendSMSMessage`;
    const data = { "number": number };
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    })
}

export function fetchAuthToken(number, code, req_code) {
    const url = `https://tinderapp.azurewebsites.net/api/getAccessTokenWithSMS`;
    const data = { "number": number, "code": code, "req_code": req_code };
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

export function addLineToDatabase(name, punText) {
    const url = `https://tinderappdatabase.azurewebsites.net/api/addUserLine`;
    const data = { "name": name.toLowerCase(), "punText": punText };
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    })
}


export function sendTinderMessage(token, match_id, message) {
    const url = `https://tinderapp.azurewebsites.net/api/sendMessage`;
    const data = { "token": token, "match_id": match_id, "message": message };
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    })
}