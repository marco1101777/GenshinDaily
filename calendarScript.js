let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
const birthdays =  [{"name": "Albedo", "birthday": "09-13"},
 {"name": "Alhaitham", "birthday": "02-11"},
 {"name": "Aloy", "birthday": "04-04"},
 {"name": "Amber", "birthday": "08-10"},
 {"name": "Arataki Itto", "birthday": "06-01"},
 {"name": "Arlecchino", "birthday": "08-22"},
 {"name": "Kamisato Ayaka", "birthday": "09-28"},
 {"name": "Kamisato Ayato", "birthday": "03-26"},
 {"name": "Baizhu", "birthday": "04-25"},
 {"name": "Barbara", "birthday": "07-05"},
 {"name": "Beidou", "birthday": "02-14"},
 {"name": "Bennett", "birthday": "02-29"},
 {"name": "Candace", "birthday": "05-03"},
 {"name": "Charlotte", "birthday": "04-10"},
 {"name": "Chevreuse", "birthday": "01-10"},
 {"name": "Chiori", "birthday": "08-17"},
 {"name": "Chongyun", "birthday": "09-07"},
 {"name": "Clorinde", "birthday": "09-20"},
 {"name": "Collei", "birthday": "05-08"},
 {"name": "Cyno", "birthday": "06-23"},
 {"name": "Dehya", "birthday": "04-07"},
 {"name": "Diluc", "birthday": "04-30"},
 {"name": "Diona", "birthday": "01-18"},
 {"name": "Dori", "birthday": "12-21"},
 {"name": "Emilie", "birthday": "09-22"},
 {"name": "Eula", "birthday": "10-25"},
 {"name": "Faruzan", "birthday": "12-07"},
 {"name": "Fischl", "birthday": "05-27"},
 {"name": "Freminet", "birthday": "09-24"},
 {"name": "Furina", "birthday": "10-13"},
 {"name": "Gaming", "birthday": "12-22"},
 {"name": "Ganyu", "birthday": "12-02"},
 {"name": "Gorou", "birthday": "05-18"},
 {"name": "Hu Tao", "birthday": "07-15"},
 {"name": "Jean", "birthday": "03-14"},
 {"name": "Kaeya", "birthday": "11-30"},
 {"name": "Kaveh", "birthday": "07-09"},
 {"name": "Kaedehara Kazuha", "birthday": "10-29"},
 {"name": "Keqing", "birthday": "11-20"},
 {"name": "Kirara", "birthday": "01-22"},
 {"name": "Klee", "birthday": "07-27"},
 {"name": "Sangonomiya Kokomi", "birthday": "02-22"},
 {"name": "Kuki Shinobu", "birthday": "7-27"},
 {"name": "Layla", "birthday": "11-18"},
 {"name": "Lisa", "birthday": "06-09"},
 {"name": "Lynette", "birthday": "02-02"},
 {"name": "Lyney", "birthday": "02-02"},
 {"name": "Mika", "birthday": "08-11"},
 {"name": "Mona", "birthday": "08-31"},
 {"name": "Nahida", "birthday": "10-27"},
 {"name": "Navia", "birthday": "08-16"},
 {"name": "Neuvillette", "birthday": "12-18"},
 {"name": "Nilou", "birthday": "12-03"},
 {"name": "Ningguang", "birthday": "08-26"},
 {"name": "Noelle", "birthday": "03-21"},
 {"name": "Qiqi", "birthday": "03-03"},
 {"name": "Raiden Shogun", "birthday": "06-26"},
 {"name": "Razor", "birthday": "09-09"},
 {"name": "Rosaria", "birthday": "01-24"},
 {"name": "Kujou Sara", "birthday": "07-14"},
 {"name": "Sayu", "birthday": "10-19"},
 {"name": "Sethos", "birthday": "05-31"},
 {"name": "Shenhe", "birthday": "03-10"},
 {"name": "Shikanoin Heizou", "birthday": "7-24"},
 {"name": "Sigewinne", "birthday": "03-30"},
 {"name": "Sucrose", "birthday": "11-26"},
 {"name": "Tartaglia", "birthday": "07-20"},
 {"name": "Thoma", "birthday": "01-09"},
 {"name": "Tighnari", "birthday": "12-29"},
 {"name": "Venti", "birthday": "06-16"},
 {"name": "Wanderer", "birthday": "01-03"},
 {"name": "Wriothesley", "birthday": "11-23"},
 {"name": "Xiangling", "birthday": "11-02"},
 {"name": "Xianyun", "birthday": "04-11"},
 {"name": "Xiao", "birthday": "04-17"},
 {"name": "Xingqiu", "birthday": "10-09"},
 {"name": "Xinyan", "birthday": "10-16"},
 {"name": "Yae Miko", "birthday": "06-27"},
 {"name": "Yanfei", "birthday": "07-28"},
 {"name": "Yaoyao", "birthday": "03-06"},
 {"name": "Yelan", "birthday": "04-20"},
 {"name": "Yoimiya", "birthday": "06-21"},
 {"name": "Yun Jin", "birthday": "05-21"},
 {"name": "Zhongli", "birthday": "12-31"}]

const day = document.querySelector(".calendar-dates");

const currdate = document
    .querySelector(".calendar-current-date");

const prenexIcons = document
    .querySelectorAll(".calendar-navigation span");





const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const manipulate = () => {
    let dayone = new Date(year, month, 1).getDay();
    let lastdate = new Date(year, month + 1, 0).getDate();
    let dayend = new Date(year, month, lastdate).getDay();
    let monthlastdate = new Date(year, month, 0).getDate();
    let lit = "";
    for (let i = dayone; i > 0; i--) {
        lit +=
            `<li class="inactive">${monthlastdate - i + 1}</li>`;
    }
    for (let i = 1; i <= lastdate; i++) {
        let br = birthdays.find((element) => element.birthday.split('-')[0] == month +1  && element.birthday.split('-')[1] == i);
        let isToday = i === date.getDate()
            && month === new Date().getMonth()
            && year === new Date().getFullYear()
            ? "active"
            : "";
        let more = ""
        if (br){
           more =  `
                <p class="listCharacter">
                    ${br.name}
                </p>
            ` 
        }
        lit += `<li class="${isToday}">
                    ${i}
                
                    ${more}
                
                </li>`;
    }

    for (let i = dayend; i < 6; i++) {
        lit += `<li class="inactive">${i - dayend + 1}</li>`
    }

    currdate.innerText = `${months[month]} ${year}`;

    day.innerHTML = lit;
}

manipulate();
const btnToday = document.querySelector('.today') 
btnToday.addEventListener('click' , ()=> {
    month = new Date().getMonth() 
    manipulate()
})
prenexIcons.forEach(icon => {
    icon.addEventListener("click", () => {

        month = icon.id === "calendar-prev" ? month - 1 : month + 1;

        if (month < 0 || month > 11) {
            date = new Date(year, month, new Date().getDate());
            year = date.getFullYear();
            month = date.getMonth();
        }
        else {
            date = new Date();
        }
        manipulate();
    });
});

