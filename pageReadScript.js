//Подмена интерфейса на странице редактора

import { arrCoockies } from "./constGitApi.js";
import { userAut, userOrg, repoOrg, listCommit, newFile, prevFile, newRepos, myRepo } from "./gipAPI.js";
import { pageAgent } from "./gitApiAgent.js";

let cheking = false;

document.querySelector('.keyApi').addEventListener('input', (e) => {
    e.target.style.border = '1px solid black';
    e.target.style.color = 'black';
})

document.querySelector('.cheking-ui').addEventListener('click', (e) => {
    const position = document.querySelector('.cheking-ui').style.left
    if(!cheking){
        document.querySelector('.cheking-ui-chaib').style.left = e.clientX + 100 + 'px' ;
        cheking = true;
        console.log(e.target.x)
    }else{
        document.querySelector('.cheking-ui-chaib').style.left = e.clientX - 100 + 'px' ;
        cheking = false;
        console.log(e.target.x)
    }
})


//Открыть файл с ПК
document.querySelector('.plays').addEventListener('click', () =>{
    try{
    fetch(`http://localhost:3000/${document.querySelector('.open-file').files[0].name}`)
    .then((item) => item.text())
    .then((file) => document.querySelector('.read-app').value = file)
    .catch((err) => document.querySelector('.read-app').value = String(err));
    document.querySelector('.open-file').value = '';
    } catch{
        document.querySelector('.read-app').value = 'Сначало - Выбрать файл, после - Показать. Играйте по правилам!'
    }
})

// Блок сохранения файла
document.querySelector('.click-file').addEventListener('click', () => {
    document.querySelector('.window-assept').style.display = 'block';
        //Если введен апи ключ
        if(arrCoockies.length > 0){
            document.querySelector('.autodificate-user').style.display = 'block';
            document.querySelector('.no-autodificate-user').style.display = 'none';
            userAut();
            userOrg();
            repoOrg();
        } else{
            document.querySelector('.autodificate-user').style.display = 'none';
            document.querySelector('.no-autodificate-user').style.display = 'block';
            return;
        }
        // селект списка репозитория
        document.querySelector('.repository').addEventListener('change', (opt) => {
            console.log(opt.target.value)
            listCommit(opt.target.value);
        })

        //Ввели путь к файлу
        document.querySelector('.patch').addEventListener('change', (e) =>{

            const org = document.querySelector('.Aorganization').textContent;
            const nameRepo = document.querySelector('.repository').value;

            fetch(`https://api.github.com/repos/${org}/${nameRepo}/contents/${e.target.value}`)
            .then((data) => data.json())
            .then((item) => {
                document.querySelector('.shaFile').value = item.sha
            })
            .catch(() => document.querySelector('.shaFile').value = 'SHA или файл - не найден');
        });

        //Кнопка - отправить в репозиторий
        document.querySelector('.next-commit').addEventListener('click', () =>{
            const indexFile = document.querySelector('.read-app').value;
            const base64File = btoa(unescape(encodeURIComponent(indexFile)))

            const commit = document.querySelector('.commit').value;
            const patch = document.querySelector('.patch').value;
            const repo = document.querySelector('.repository').value;
            const author = document.querySelector('.AuserGit').textContent;
            const email = document.querySelector('.email').textContent;
            const namesFile = document.querySelector('.shaFile').value;
            const shaCommit = document.querySelector('.prev-app').value;
//Вынести в проверку
            if(shaCommit == 'undefined'){
                document.querySelector('.prev-app').value = '';
            }
            

            newFile(repo, patch, commit, base64File, author, email, namesFile);
        })

        //Кнопка - сравнить с предыдущим
        document.querySelector('.prev-commit').addEventListener('click', () =>{

            const patch = document.querySelector('.patch').value;
            const repo = document.querySelector('.repository').value;

            document.querySelector('.prev-app').style.display = 'block';
            document.querySelector('.add-next-file').style.display = 'block';

            prevFile(repo, patch);
        })

        // Кнопка - создать репозиторий
        document.querySelector('.gitGo').addEventListener('click', () =>{
            const namerepo = document.querySelector('.name-repo').value;
            const describtRepo = document.querySelector('.describt-repo').value;
            const typeRepo = document.querySelector('.type-repo').value;

            if(typeRepo == 'private'){
                newRepos(namerepo, describtRepo, true);
            } else{
                newRepos(namerepo, describtRepo, false);
            }
        });

        //Поле - путь к репозиторию
        document.querySelector('.patch-dir').addEventListener('change', (e) =>{
            myRepo(document.querySelector('.repository').value, e.target.value)
        });

        //Кнопка - вернуть в редакцию
        document.querySelector('.add-next-file').addEventListener('click', () =>{
            const onlyText = document.querySelector('.read-app').value;
            document.querySelector('.read-app').value = `${document.querySelector('.prev-app').value}\n${onlyText}`;
        });
});

document.querySelector('.gitIndetificate').addEventListener('click', () => {
    pageAgent()
})

//Кнопка Х в меню сохранений

document.querySelector('.closet').addEventListener('click', () => {
    document.querySelector('.window-assept').style.display = 'none';
    document.querySelector('.prev-app').style.display = 'none';
    document.querySelector('.add-next-file').style.display = 'none';
});

document.querySelector('.write-file').addEventListener('click', () => {
    const datas = document.querySelector('.read-app').value;
    const nameFile = document.querySelector('.name-assept').value;

    const bodys = `${nameFile}(///)${datas}`

    fetch('http://localhost:3000/newfile', {
        method: 'post',
        headers: {
            "Content-Type": "text/plain",
        },
        body: bodys
    })
})
