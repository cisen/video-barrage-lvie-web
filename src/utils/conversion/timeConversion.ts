export const timetoRFC3339 = (date: Date) => {
    let y = date.getFullYear()
    let m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
    let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    let hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    var endDate = y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    endDate = endDate.replace(/\s+/g, 'T') + '+08:00'
    return endDate
}
export const rFC3339ToTime = (dateStr: string) => {
    var date = new Date(dateStr).toJSON();
    let newDate: string
    return newDate = new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
}
