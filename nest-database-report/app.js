const dateStr = "00/00/2009";
const [day, month, year] = dateStr.split('/');
const date = new Date(parseInt(year), 0, 1); // Set về ngày đầu tiên của tháng 1 năm 2009

console.log(date);
