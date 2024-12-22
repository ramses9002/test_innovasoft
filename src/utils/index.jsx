export const cutInputField = (e, limiter) => {
    if (e.target.value.length > limiter) {
        e.target.value = e.target.value.slice(0, limiter);
    }
};

export const UpdateToken = async (token, date) => {
    window.localStorage.setItem("persist:token", JSON.stringify({ token: token, expiresUtc: date }));
};

export const convertToBase64FromImage = (file) => {
    const convertPromise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
    const base64String = convertPromise.then((response) => {
        return response;
    });
    return base64String;
};

export const convertToImageFromBase64 = (str, preview = false) => {
    if (str) {
        var pos = str.indexOf(";base64,");
        var type = str.substring(5, pos);
        var b64 = str.substr(pos + 8);
        var imageContent = atob(b64);
        var buffer = new ArrayBuffer(imageContent.length);
        var view = new Uint8Array(buffer);

        for (var n = 0; n < imageContent.length; n++) {
            view[n] = imageContent.charCodeAt(n);
        }
        var blob = new Blob([buffer], { type: type });

        if (preview) {
            return URL.createObjectURL(blob);
        } else {
            return new File([blob], generatorId(10, 1), { lastModified: new Date().getTime(), type });
        }
    }
    return str;
};

export const generatorId = (length, type = 1) => {
    //===type 1 - all || 2 - allstring || 3 - Upperstring || 4 - Lowerstring || 5 - number
    let result = "";
    let characters = "";
    switch (type) {
        case 1:
            characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
            break;
        case 2:
            characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            break;
        case 3:
            characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
        case 4:
            characters = "abcdefghijklmnopqrstuvwxyz";
            break;
        case 5:
            characters = "123456789";
            break;
        default:
            break;
    }
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
};
