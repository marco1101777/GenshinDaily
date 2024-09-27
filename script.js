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
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);
const getId = id => document.getElementById(id);
// dp
const visionCharacter = {}

const parseCharacter = (character) => character.trim().replace(/\s+/g, '-').toLowerCase();

const getImgUrl = (character) => `https://genshin.jmp.blue/characters/${parseCharacter(character)}/icon`;

async function toBase64(imageUrl) {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error(error);
    }
}

function saveImageToLocalStorage(url, characterName) {
    toBase64(url).then(base64Image => {
        localStorage.setItem(characterName, base64Image);
    });
}

async function displayImageFromLocalStorage(characterName) {
    let base64Image = localStorage.getItem(characterName);
    const img = document.createElement('img');

    if (!base64Image) {
        base64Image = await toBase64(getImgUrl(characterName));
        localStorage.setItem(characterName, base64Image);
    }

    img.src = base64Image;
    img.alt = characterName;
    img.classList.add("character-icon");
    return img;
}
const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
async function getVisionCharacter(nameCharacter) {
    let  vision = ""
    await fetch(`https://genshin.jmp.blue/characters/${nameCharacter}`)
        .then(async (response) => {
            const character = await response.json()
            console.log(character.vision)
            vision = (character.vision)
        })
        .catch(erro => console.log(erro))
    return vision 
}

const vision = {
    "Anemo" :"#7ee5b8", 
    "Pyro" :"#a92c2e",
    "Cryo" :"#9ddae6",
    "Geo":"#eacf5d",
    "Dendro":"#aadf28",
    "Electro":"#a254bf",
    "Hydro": "#27d7e9",
}
const dialog = new Modal(getId('characterModal'));
const modalIcon = $('.iconModal');
const infoModal = $('.infoModal');
const nameCharacterModal = $('.nameCharacter');
const close = $('.close');




async function getCharactersOfDay() {
    const day = new Date().getDay();
    const today = days[day -1];
    const characters = [];

    Object.entries(materials).forEach(([domain, data]) => {
        if (data.days.includes(today)) {
            characters.push(...data.characters);
        }
    });

    const info = $('.info');
    characters.forEach(async name => {
        const img = await displayImageFromLocalStorage(name);
        const div = document.createElement('div');
        const visonColor = vision[await getVisionCharacter(parseCharacter(name))]
        visionCharacter[name] = visonColor ; 
        div.classList.add("character");
        div.style = "--element:" + visonColor          
        div.title = name;
        img.title = name ; 
        div.appendChild(img);
        div.addEventListener('click' , e => fillDialog(getDaysFarming(e.target.title)))
        info.appendChild(div);
    });
    console.log(visionCharacter)
    getId('day').textContent = today;
}

function getDaysFarming(characterName) {
    let farmingDays = [];
    let domain = "";

    Object.entries(materials).forEach(([key, value]) => {
        if (value.characters.includes(characterName)) {
            farmingDays = [...value.days];
            domain = key;
        }
    });

    return {
        character: characterName,
        domain:domain,
        days: farmingDays
    };
}

function fillDialog(info) {
    const all = $('.all')
    all.style = `--element:${visionCharacter[info.character]}`
    modalIcon.src = localStorage.getItem(info.character);
    nameCharacterModal.textContent = info.character;
    infoModal.innerHTML = `
        <div style="text-align:center;">
            Domain<br/>
            <span style="color:black ;        text-shadow:0 0 2px white;">${info.domain}</span>
        </div>
        <div style="text-align:center;">
            Days<br/>
            <span style="color:black        ; text-shadow:0 0 2px white;;">${info.days.join(", ")}</span>
        </div>
    `;
    dialog.showModal();
}

getCharactersOfDay();

close.addEventListener('click', () => dialog.close());
   
const activeCodes = [   "BLAZETONATLAN", 
                        "PT5WP6D5GXJ9",
                        "KALF66CLGXKM",
                        "XSME6NV4GX2Z"];
const codesBtn = $('.btnCodes');
const codesModal = new Modal($('.codesModal'));
const codes = $('.codes');

activeCodes.forEach(code => {
    const codeDiv = document.createElement('a');
    codeDiv.href = `https://genshin.hoyoverse.com/en/gift?code=${code}`;
    codeDiv.classList.add('codeList');
    
    const codeText = document.createElement('h2');
    codeText.textContent = code;
    codeDiv.appendChild(codeText);
    codes.appendChild(codeDiv);
});

codesBtn.addEventListener('click', () => codesModal.showModal());
