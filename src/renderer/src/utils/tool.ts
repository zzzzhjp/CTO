interface Tool {
    dateFormat(date:string | number | Date , fmt?: string): string
}

const tool:Tool = {
    dateFormat: (date , fmt = 'yyyy-MM-dd hh:mm:ss')=>{
        date = new Date( date )

        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth()+3)/3),
            'S': date.getMilliseconds()
        }
        if(/(y+)/.test(fmt)){
            fmt = fmt.replace( RegExp.$1 , (date.getFullYear() + '').substring( 4 - RegExp.$1.length))
        }
        for( let k in o){
            if( new RegExp("("+k+")").test(fmt)){
                fmt = fmt.replace( RegExp.$1 , (RegExp.$1.length == 1) ? (0[k]) : (("00" + o[k]).substring(("" + o[k]).length)))
            }
        }

        return fmt
    }
}

export default tool