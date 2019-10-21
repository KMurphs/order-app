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


XmlHttpRequest.prototype.postFormData = function(url, htmlForm) {
    return new Promise((resolve) => {
        let formData = new FormData(htmlForm);
        let xhr = new XMLHttpRequest();

        let onProgress = function(e) {
            if (e.lengthComputable) {
                let percentComplete = (e.loaded / e.total) * 100;
            }
        };

        let onReady = function(e) {
            // ready state
            resolve(JSON.parse('Form uploaded successfully'));
        };

        let onError = function(err) {
            // something went wrong with upload
            reject(err)
        };

        // formData.append('files', file);
        xhr.open('post', url, true);
        xhr.addEventListener('error', onError, false);
        xhr.addEventListener('progress', onProgress, false);
        xhr.send(formData);
        xhr.addEventListener('readystatechange', onReady, false);
    })
}