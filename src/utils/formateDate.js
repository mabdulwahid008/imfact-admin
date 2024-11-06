export function formateDate(utcTime) {
    const date = new Date(utcTime);
    if (isNaN(date)) {
        return '---';
    }

    const options = {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
    };

    // Format the date as 'mm.dd.yy' first
    const formattedDate = date.toLocaleDateString('en-US', options).replace(/\//g, '.');

    // Split and rearrange it to 'yy.mm.dd'
    const [month, day, year] = formattedDate.split('.');
    return `${year}.${month}.${day}`;
}
