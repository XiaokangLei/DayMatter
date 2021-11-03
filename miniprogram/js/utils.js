class Utils {

    // 千分位切割
    thousandthPlace(v) {
            //按照 . 切割，分为整数和小数两个部分
            let va = v;
            if (va < 0) {
                va = -va;
            }
            let num = va.toString().split('.');

            //整数部分
            let intNum = num[0];

            //小数部分
            let decimalNum = num[1];
            let ints = [];

            //处理整数部分的千分位
            for (let i = intNum.length - 1; i >= 0; i -= 3) {
                let index = i - 2 < 0 ? 0 : i - 2;
                let currentInt = intNum.slice(index, i + 1);
                ints.unshift(currentInt);
            }

            ints = ints.join(',');

            //如果存在小数部分,则需要拼接小数部分
            if (decimalNum !== undefined) {
                ints += '.' + decimalNum;
            }
            if (v < 0) {
                ints = '-' + ints
            }
            return ints;
        }
        // 格式化时间
    formatDate(date, format) {
        //date: 日期对象
        //format: yyyy-MM-dd hh:mm:ss

        //获取年份
        let year = date.getFullYear();
        // 
        if (/(y+)/.test(format)) {
            //获取匹配组的内容
            let yearContent = RegExp.$1;
            // 

            format = format.replace(yearContent, year);
        }

        //处理月日时分秒
        let dateObject = {
            M: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds()
        };

        for (let key in dateObject) {
            //创建动态正则表达式
            let reg = new RegExp(`(${key}+)`)
                // 
            if (reg.test(format)) {
                //获取匹配组的内容, RegExp.$n必须需要test验证通过可以获取
                let content = RegExp.$1;
                // 

                //控制补零
                let value = dateObject[key] >= 10 ? dateObject[key] : content.length == 2 ? '0' + dateObject[key] : dateObject[key];
                format = format.replace(content, value);
            }
        }

        return format;
    }

    // 最后时间
    theLastDate() {
        return (this.formatDate(new Date(), 'yyyy-MM-dd'))
    }

}

export const utils = new Utils();