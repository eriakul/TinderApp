'use es6'
import 'fetch'

export default (email, password) => {
    const url = 'https://tinderapp.azurewebsites.net/api/getLinesForName';
    const data = { name: "jennifer" };

    const response = fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    }).then(response => { return response.json() }).then(contents => console.log(contents))
    return response

}