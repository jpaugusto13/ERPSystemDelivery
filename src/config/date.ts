const date = new Date();

let day = date.getDay();
let dayDate = date.getDate();
let mouth = date.getMonth();
let year = date.getFullYear();

mouth++

let fullDate = `${dayDate <= 9 ? "0"+dayDate : dayDate}/${mouth <=  9 ? "0"+mouth : mouth}/${year}`

export { day, mouth, year, fullDate };