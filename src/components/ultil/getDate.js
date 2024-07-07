export function getDate(date) {
    let dateObj = new Date(date);
    const year = dateObj.getUTCFullYear();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    return `${day}-${month}-${year}`;
  }