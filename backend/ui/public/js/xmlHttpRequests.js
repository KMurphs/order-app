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



XmlHttpRequest.prototype.handleFormData = function(method, url, data, requestHeaders) {
    return new Promise((resolve) => {

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                try {
                    resolve(JSON.parse(xhttp.responseText));
                } catch (exception) {
                    resolve(xhttp.responseText)
                }
            }
        };
        xhttp.error = (err) => {
            reject(err)
        }
        xhttp.open(method, url, true);
        for (const key in requestHeaders) {
            // xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.setRequestHeader(key, requestHeaders[key]);
        }
        xhttp.send(data);

    })
}



XmlHttpRequest.prototype.postFormData = function(url, htmlForm) {
    let formData = new FormData(htmlForm);
    return this.handleFormData('post', url, formData)
}
XmlHttpRequest.prototype.postData = function(url, data) {
    return this.handleFormData('post', url, data, { 'Content-type': 'application/x-www-form-urlencoded' })
}
XmlHttpRequest.prototype.putFormData = function(url, htmlForm) {
    let formData = new FormData(htmlForm);
    return this.handleFormData('put', url, formData)
}
XmlHttpRequest.prototype.putData = function(url, data) {
    return this.handleFormData('put', url, data, { 'Content-type': 'application/x-www-form-urlencoded' })
}
































// XmlHttpRequest.prototype.handleFormData = function(method, url, htmlForm, {}) {
//     return new Promise((resolve) => {
//         let formData = new FormData(htmlForm);
//         let xhr = new XMLHttpRequest();

//         let onProgress = function(e) {
//             if (e.lengthComputable) {
//                 let percentComplete = (e.loaded / e.total) * 100;
//             }
//         };

//         let onReady = function(e) {
//             // ready state
//             resolve(JSON.parse('Form uploaded successfully'));
//         };

//         let onError = function(err) {
//             // something went wrong with upload
//             reject(err)
//         };

//         // formData.append('files', file);
//         xhr.open(method, url, true);
//         xhr.addEventListener('error', onError, false);
//         xhr.addEventListener('progress', onProgress, false);
//         xhr.send(formData);
//         xhr.addEventListener('readystatechange', onReady, false);
//     })
// }