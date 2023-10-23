import { userAut, userOrg } from "./gipAPI.js";

export function cookisGo(name) {
    let matches = [];
    try{
    for (let item in name){
        let child = document.cookie.match(new RegExp(
            "(?:^|; )" + name[item].replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));

            matches.push(decodeURIComponent(child[1]));
    }
    return matches;
}catch{
    return matches;
}
}

export function pageAgent(){
    const key = document.querySelector('.keyApi').value;
        console.log(key)
    if(key){
        userAut();
        userOrg();
    }else{
        document.querySelector('.keyApi').value = 'Указан не верный ключ';
        document.querySelector('.keyApi').style.color = 'red';
        document.querySelector('.keyApi').style.border = '1px solid red'
}
}