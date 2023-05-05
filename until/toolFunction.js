const numDict = { "0": "零", "1": "一", "2": "二", "3": "三", "4": "四", "5": "五", "6": "六", "7": "七", "8": "八", "9": "九" };
const unitDict = ["", "十", "百", "千", "万", "十万", "百万", "千万", "亿", "十亿", "百亿", "千亿"]

function numberChangeCh(numberStr) {
    let reg = /\d+/g;
    let chineseStr = numberStr.replace(reg, function (match) {
        let len = match.length;
        let str = '';
        for (var i = 0; i < len; i++) {
            var curNum = match.charAt(i);
            if (curNum !== "0") {
                // 处理数字
                var numRes = numDict[curNum] + unitDict[len - 1 - i];
                if (i === len - 1 && curNum === "1" && len > 1) {
                    numRes = unitDict[len - 1 - i];
                }
                str += numRes;
            } else {
                // 处理 0
                if (i === len - 1 || (i < len - 1 && match.charAt(i + 1) !== "0")) {
                    str += "零";
                }
            }
        }

        if (str.charAt(str.length - 1) == '零' && str.length > 1) {
            str = str.slice(0, str.length - 1)
        }
        let newReg = /一十/g;
         str = str.replace(newReg, "十");
        return str;
    });
    return chineseStr
}
module.exports = {
    numberChangeCh
}