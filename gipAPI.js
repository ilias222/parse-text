///orgs/ilias222/repos1

import { Octokit } from "https://esm.sh/octokit";;
import { cookisGo } from "./gitApiAgent.js";

    
   export const userAut = async () => {
    const keyApi = `${cookisGo(['gitApi'])}`;
    const octokit = new Octokit({
      auth: keyApi
    })

      await octokit.request('GET /user', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }).then((use) => {
        if(use.status == 200){
          console.log(use)
          document.querySelector('.AuserGit').textContent = use.data.login;
          document.querySelector('.names').textContent = use.data.name;
          document.querySelector('.email').textContent = use.data.email;
          const useApi = encodeURIComponent('userGit') + '=' + encodeURIComponent(use.data.login) + '; expires=200000;';
          const keysApi = encodeURIComponent('gitApi') + '=' + encodeURIComponent(keyApi) + '; expires=200000;';
          document.cookie = keysApi;
          document.cookie = useApi;
        }
      })
      .catch((e) => {
        console.log('Ошибка при обращении к GitApi');
        document.querySelector('.keyApi').style.border = '1px solid red';
      })
  }

  export const userOrg = async () => {
    const keyApi = `${cookisGo(['gitApi'])}`;
    const octokit = new Octokit({
      auth: keyApi
    })

    await octokit.request('GET /user/orgs', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  }).then((org) => {
    if(org.status == 200){
      document.querySelector('.Aorganization').textContent = org.data[0].login;
      const orgApi = encodeURIComponent('organization') + '=' + encodeURIComponent(org.data[0].login) + '; expires=200000;';
      document.cookie = orgApi;
    }
  })
  .catch((e) => {
    console.log('Ошибка при обращении к GitApi', keyApi)
    document.querySelector('.keyApi').style.border = '1px solid red' 
  })
}

export const repoOrg = async () => {
  const keyApi = `${cookisGo(['gitApi'])}`;
  const octokit = new Octokit({
    auth: keyApi
  })

  const org = cookisGo(['organization'])
  await octokit.request(`GET /orgs/${org}/repos`, {
    org: `${org}`,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  }).then((item) => {
    const arr = item.data;
    arr.map((item) => {
      document.querySelector('.repository').innerHTML += `<option value=${item.name}>${item.name}</option>`;
    })

  })
}

export const listCommit = async (repo) =>{
  const keyApi = `${cookisGo(['gitApi'])}`;
  const octokit = new Octokit({
    auth: keyApi
  })

  const org = cookisGo(['organization']);
  console.log(keyApi)

  await octokit.request(`GET /repos/${org}/${repo}/commits`, {
    owner: `${org}`,
    repo: `${repo}`,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  }).then((list) => {
    console.log('Где берем хексы коммитов',list)
    const nav = document.querySelector('.list-commit');
    const arr = list.data;
    nav.innerHTML = '';
    arr.map((item, index) => {
      nav.innerHTML += `<p> ${index +1}) Автор : ${item.author.login} 
      /// <span>Дата фиксайии : ${item.commit.author.date}</span></p>`;
      
      nav.innerHTML += `<p>commit : ${item.sha}</p>`;
    })
  }).catch((err) => {
    const item = document.querySelector('.list-commit');
    item.innerHTML = `<p>Репозиторий пуст!</p>`;
  });
}

export const newFile = async (repo, patch, commit, describt, author, email, namesfile = '') => {
  const org = cookisGo(['organization']);
  const keyApi = `${cookisGo(['gitApi'])}`;

  const octokit = new Octokit({
    auth: keyApi
  })

await octokit.request(`PUT /repos/${org}/${repo}/contents/${patch}`, {
  owner: `${org}`,
  repo: `${repo}`,
  path: `${patch}`,
  message: `${commit}`,
  sha: `${namesfile}`,
  committer: {
    name: `${author}`,
    email: `${email}`
  },
  content: `${describt}`,
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
}).then((e) => console.log(e)).catch((err) => console.log(err))
}

export const prevFile = async (repo, patch) => {
  const org = cookisGo(['organization']);
  const keyApi = `${cookisGo(['gitApi'])}`;

  const octokit = new Octokit({
    auth: keyApi
  })

await octokit.request(`GET /repos/${org}/${repo}/contents/${patch}`, {
  owner: `${org}`,
  repo: `${repo}`,
  path: `${patch}`,
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
}).then((data) => {
  if(data.data.content != undefined){ 
  document.querySelector('.prev-app').value = decodeURIComponent(escape(atob(data.data.content)));
  }
})
}
    /**
     * Для создания репы, нужно иметь активную организацию ни Гитхаб
     * В информации о профиле - создать организацию (наименование, капча и т.п)
     * Далее перейти в профиль организации и выдать админ права в привелегиях участников (там только ты)
     * В разделе люди - юзер должен быть с правами Владелец
     * В настройках - токены личного доступа - Разрешить доступ через детальные персональные токены доступа - Да
     * В личном профиле - настройки - настройки разработчика. Создаем детальный токен, с привязкой владельца
     * организации
     * Далее в настройках организации - токены личного доступа - активные токины, должны увидеть свой токен
     * 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
     */
    // repo - string; describt - string; typerepo - bool(publick/private)
    export const newRepos = async(repo, descript, typerepo) => {
    const org = cookisGo(['organization']);
    const keyApi = `${cookisGo(['gitApi'])}`;
  
    const octokit = new Octokit({
      auth: keyApi
    })
    
        await octokit.request(`POST /orgs/${org}/repos`, {
            org: `${org}`,
            name: `${repo}`,
            description: `${descript}`,
            homepage: 'https://github.com/iliasApi',
            'private': typerepo,
            has_issues: true,
            has_projects: true,
            has_wiki: true,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          }).then(item => console.log(item));
      }

        /// Запрос репозитория 

      export const myRepo = async(repo, patch) => {
          const org = cookisGo(['organization']);
          const keyApi = `${cookisGo(['gitApi'])}`;
        
          const octokit = new Octokit({
            auth: keyApi
          })

        await octokit.request(`GET /repos/${org}/${repo}/contents/{${patch}}`, {
          owner: `${org}`,
          repo: `${repo}`,
          path: `${patch}`,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        }).then(item => {
          console.log(item.data)
          const nav = document.querySelector('.list-file-repo');
          nav.innerHTML = '';
          const arr = item.data;
          arr.map((items, index) => {
            nav.innerHTML += `<p> ${index + 1} Имя репозитория : ${items.name} </p> 
                              <p> Путь к репозиторию : ${org}/${items.path} </p>
                              <p> SHA репозитория : ${items.sha} </p>`
          })
        });
    }

    // То же без ключа
    
// const aw = async () => { await fetch('https://api.github.com/repos/ilias222/newsJS')
//     .then((item) => item.json())
//     .then((js) => console.log(js))}
//     aw()
