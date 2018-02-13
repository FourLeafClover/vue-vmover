let formatDate = (dateStr, format) => {
    let date = new Date(dateStr);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let min = date.getMinutes();
    let s = date.getSeconds();
    if (m < 10) {
        m = "0" + m;
    }
    if (d < 10) {
        d = "0" + d;
    }
    if (format == "yyyy-MM-dd hh:mm:ss") {
        return `${y}-${m}-${d} ${h}:${min}:${s}`
    } else if (format == "yyyy-MM-dd") {
        return `${y}-${m}-${d}`
    } else if (format == "yyyy/MM/dd") {
        return `${y}/${m}/${d}`
    }
    return "";
}

let getClientType = () => {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        return "IOS";
    } else {
        return "Android";
    }
}

let isFromWeixin = () => {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i)) {
        return true;
    } else {
        return false;
    }
}

let appEditorConverter = (str) => {
    let regExp = new RegExp("\n", "g");
    return str.replace(regExp, "<br/>");
}

let getReadQty = (num) => {
    let qtyStr = "";
    if (num) {
        let intQty = parseInt(num);
        if (intQty > 10000) {
            qtyStr += parseInt(intQty / 10000);
            let thousand = intQty % 10000;
            if (thousand >= 1000) {
                qtyStr += "." + parseInt(thousand / 1000);
            }
            qtyStr += "W";
            if ((thousand % 1000) > 0) {
                qtyStr += "+";
            }
        } else {
            qtyStr += intQty;
        }
    } else {
        qtyStr = "0";
    }
    return qtyStr;
}

let setPageInfo = (info) => {
    if (info) {
        /* 基本处理,可以解决非微信端问题 */
        let meta = document.getElementsByTagName('meta');
        if (info.title) {
            document.title = info.title + "|V电影";
            meta["sharecontent"].setAttribute("data-msg-title", info.title);
            meta["sharecontent"].setAttribute("data-line-title", info.title);
        }
        if (info.desc) {
            meta["description"].setAttribute("content", info.desc);
            meta["sharecontent"].setAttribute("data-msg-content", info.desc);
            meta["sharecontent"].setAttribute("data-line-content", info.title);
        }
    }
}

let convertDuration = (duration) => {
    let result = "";
    if (duration) {
        if (duration > 60) {
            let min = parseInt(duration / 60);
            let sec = parseInt(duration % 60);
            result = (min > 9 ? min : ("0" + min)) + ":" + (sec > 9 ? sec : ("0" + sec));
        } else {
            result = (duration > 9 ? duration : ("0" + duration));;
        }
    }
    return result;
}

export default {
    formatDate: formatDate,
    getClientType: getClientType,
    isFromWeixin: isFromWeixin,
    appEditorConverter: appEditorConverter,
    getReadQty: getReadQty,
    setPageInfo: setPageInfo,
    convertDuration: convertDuration
}