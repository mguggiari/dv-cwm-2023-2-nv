
export function dateToString(date) {
    if(date == null) return null;
    
    const dateFormater = new  Intl.DateTimeFormat("es-AR", {
        year: '2-digit' ,month: '2-digit', day:'2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
    }).format(date);
    
    return dateFormater.replace(',', '');
}