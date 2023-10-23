// Скрипт инекции в текущую html страницу

export async function injection(script){

    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }
    
    let [tab] = await chrome.tabs.query(
        { active: true, lastFocusedWindow: true });

        console.log(tab)
    try{
    document.cookie = "adsfzxczxv=visible";
    chrome.scripting.executeScript({
      target : {tabId : tab.id},
      files : [ script ],
    });
    
    console.log('Скрипт внедрен!')
    
    
    }catch{
        (error) => {
            console.log('При инъекции скрипта, произошла ошибка :', error)
        }
    }
  }
