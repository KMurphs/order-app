var XmlHttpRequest = function() {}

XmlHttpRequest.prototype.getData = function(url, data) {
    let final_url = url

    if (Object.keys(data).length > 0) {
        let get_data = '';
        Object.keys(data).forEach(item => {
            get_data = `${get_data}&${item}=${data[item]}`
        })
        final_url = url + '?' + get_data.substr(1)
    }

    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                try {
                    resolve(JSON.parse(xhttp.responseText));
                } catch {
                    reject('Could Not Parse Server Response')
                }
            }
        };
        xhttp.open('GET', final_url, true);
        xhttp.send();
    });
}



XmlHttpRequest.prototype.postData = function(url, data) {
    return new Promise((resolve) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                resolve(JSON.parse(xhttp.responseText));
            }
        };
        xhttp.open('POST', url, true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(data);
    })
}