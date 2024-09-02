const materials = {
    "Freedom":  {
       "characters" : ["Amber" ,"Barbara" ,"Klee" , "Sucrose" ,"Diona","Tartaglia","Aloy"] ,  
       "days" :["Monday" ,"thursday","Sunday"] 
    },
    "Resistance" : {
        "characters" : ["Bennett","Diluc","Jean","Mona","Noelle","Razor","Eula"] ,
        "days": ["Tuesday","Friday","Sunday"]  
    },
    "Ballad" : {
        "characters":["Venti","Lisa","Fischl","Kaeya","Albedo","Rosaria","Mika"],
        "days" : ["Wednesday","Saturday","Sunday"] 
    },
    "Prosperity":{
        "characters" : ["Qiqi","Keqing","Ningguang","Xiao","Yelan","Shenhe","Gaming"] ,
        "days" : ["Monday","Thursday","Sunday"] 
    },
    "Diligence":{
        "characters":["Xiangling","Chongyun","Hu tao","Ganyu","Kazuha","Yun Jin","yaoyao"], 
        "days" : ["Tuesday","Friday","Sunday"] 
    },
    "Gold" : {
        "characters":["Beidou","Xingqiu","Zhongli","Xinyan","Yanfei","Baizhu","Xianyun"],
        "days" : ["Wednesday","Saturday","Sunday"] 
    },
    "Transience" : {
        "characters" : ["Yoimiya", "Thoma", "kokomi", "Shikanoin Heizou" , "Kirara" ] ,
        "days" :["Monday","Thursday","Sunday"] 
    },
    "Elegance": {
        "characters" : ["Ayaka","arataki-itto","Sara","Ayato" ,"Kuki Shinobu"] ,
        "days" :["Tuesday","Friday","Sunday"] 
    },
    "Light" : {
        "characters" : ["Sayu" , "Gorou","Raiden","Yae Miko","Chiori"] ,
        "days" : ["Wednesday", "Saturday","Sunday"] 
    },
    "Admonition" : {
        "characters" : ["Cyno","Candace","Tighnari","Faruzan"] ,
        "days" : ["Monday","Thursday","Sunday"] 

    },
    "Ingenuity" : {
        "characters" : ["Dori","Nahida","alhaitham","layla","Kaveh"],
        "days" : ["Tuesday","Friday","Sunday"] 
    },
    "Praxis" : {
        "characters" : ["Collei" , "Nilou","Dehya","Wanderer","Sethos"] , 
        "days" : ["Wednesday","Saturday","Sunday"] 
    },
    "Equity":{
        "characters":["lyney","Neuvillette","Navia","Sigewinne"],  
        "days" : ["Monday","Thursday","Sunday"] 
    },
    "Justice" : {
        "characters" : ["Freminet","Clorinde","Charlotte","Furina"],
        "days" : ["Tuesday","Friday","Sunday"] 
    },
    "Order": {
        "characters" : ["Wriothesley","Lynette","Chevreuse","Arlecchino","Emilie"], 
        "days" : ["Wednesday","Saturday","Sunday"] 
    }
}


const $ = sel =>  document.querySelector(sel) 

const $$ = sel =>  document.querySelectorAll(sel)
const getId = id =>document.getElementById(id) 
const consol = getId("consol")



const parseCharacter = (character) => {
    character = character.replace( /\s/,'-');
    return character.toLowerCase() 
    
}

// load icons characters 
// api genshin 
//
const getImg = (ch) => {
    ch = parseCharacter(ch) ; 
    return `https://genshin.jmp.blue/characters/${ch}/icon-side`
}
function toBase64(imageUrl, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', imageUrl);
    xhr.responseType = 'blob';
    xhr.send();
}

function saveImageToLocalStorage(url,nameCharacter) {
    toBase64(url, function(base64Image) {
        localStorage.setItem(nameCharacter, base64Image);
    });
}
function displayImageFromLocalStorage(nameCharacter) {
    const base64Image = localStorage.getItem(nameCharacter);
    if (base64Image) {
        const img = document.createElement('img');
        img.src = base64Image;
        return img 
    }else{
        toBase64(getImg(nameCharacter),function(base64Image) {
            localStorage.setItem(nameCharacter, base64Image);
        });
         const img = document.createElement('img');
        img.src = base64Image;
        return img 

    }
}



const days = ["Sunday","Monday" , "Tuesday" , "Wednesday","Thursday","Friday" ,"Saturday"] 
//  get day and  show a character talents for day   
function getCharactersOfDay(){
    const  day = new Date().getDay() ;
    const characters = [] ;
    Object.entries(materials).forEach(([key, value]) => {
        const ifValue = value.days.find((daysMaterial) => daysMaterial == days[day] );
        if (ifValue){
            const ch = value.characters ;
            characters.push(...ch) ;
        }
    });
    const info = $('.info') ;
    characters.forEach(name => {
        const img = displayImageFromLocalStorage(name)
        const div = document.createElement('div') 
        div.classList.add("character")
        div.title = name ;
        img.title = name ;
        img.classList.add("character-icon")
        div.appendChild(img)
        info.appendChild(div) ;

    });
    const today =getId('day').innerHTML = days[day]
}

function getDaysFarmign(nameCharacter) {
    const farmingDays = [] 
    let nameDomain = "" ;
    Object.entries(materials).forEach(([key,value]) => {
        if(value.characters.find((character) => nameCharacter == character)){
            farmingDays.push(...value.days) ;
            nameDomain = key ; 
           console.log(key) 
        }
    });
    return {
        character:nameCharacter,
        domain : nameDomain , 
        days : farmingDays 
    }
}




getCharactersOfDay()
const dialog = getId('modal')
const modalIcon = $('.iconModal')
const infoModal = $('.infoModal') 
const close = $('.close')
close.addEventListener('click',()=>{
    dialog.close() 
    console.log("cerrado")
})


function fillDialog(info) {
    modalIcon.src = localStorage.getItem(info.character) ;
    infoModal.innerHTML = `
        <span style="color:cyan">${info.domain}<span> 
        <span style="color:cyan">${info.days}<span> 
    `
    dialog.showModal() 
    
}


const characterBtn =$$('.character') 

characterBtn.forEach((ch) => {
        ch.addEventListener('click',(e)=>{
            fillDialog(getDaysFarmign(e.target.title))
        })
})
