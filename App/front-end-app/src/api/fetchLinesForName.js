export function fetchLinesForName(name) {
    const url = 'https://tinderapp.azurewebsites.net/api/getLinesForName';
    const data = { "name": name };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    })
}