// This function change a format of date. For example: "1.9.2011" will become "01.09.2011"
let dateStyler = (date) => {
    let regExp = /[:.\s]/g;
    let signs = date.matchAll(regExp);
    let indexs = [];
    let count = 0;

    date = date.trim().split('');
    
    signs = Array.from(signs);

    signs.forEach(sign => {
        indexs.push(sign.index);
    });

    indexs.forEach(index => {
        if (index - 2 === -1) {
            date.unshift('0');
            count++;
        } else {
            if (/[^0-9]/.test(date[index + count - 2])) {
                date.splice(index + count - 1, 0, '0');
                count++;
            }
        }
    });
    
    if (/[^0-9]/.test(date[date.length - 2])) {
        date.splice(date.length - 1, 0, '0');
    }

    return date.join("");
}

export {dateStyler}