'use es6'
import 'fetch'

export default (email, password) => {
    const url = 'https://tinderappgetlinesforname.azurewebsites.net';
    const data = { name: "jennifer" };

    const response = fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            // 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "http://localhost:3000",
            'Accept': 'application/json',
            'Origin': 'http://localhost:3000'
        }
    }).then(response => { response.text() }).then(contents => console.log(contents))
    return response

}