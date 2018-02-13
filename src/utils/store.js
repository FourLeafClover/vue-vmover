let setObject = (key, data) => {
    if (data == "" || data == null) {
        window.localStorage.setItem(key, data);
    } else {
        window.localStorage.setItem(key, JSON.stringify(data));
    }
}

let getObject = (key) => {
    let result = window.localStorage.getItem(key);
    if (result != null && result != undefined && result.length > 0) {
        result = JSON.parse(result);
    } else {
        result = null;
    }
    return result;
}

let setString = (key, data) => {
    window.localStorage.setItem(key, JSON.stringify(data));
}

let getString = (Key) => {
    window.localStorage.getItem(key);
}

let setNumber = (key, data) => {
    window.localStorage.setItem(key, JSON.stringify(data));
}

let getNumber = (Key) => {
    Number(window.localStorage.getItem(key));
}

let clear = () => {
    window.localStorage.clear();
}

export default {
    setObject: setObject,
    getObject: getObject,
    setString: setString,
    getString: getString,
    setNumber: setNumber,
    getNumber: getNumber,
    clear: clear
}