chrome.runtime.onInstalled.addListener(function (){
  chrome.tabs.create({ url: "popup.html" });
  chrome.contextMenus.create({
      id:"addToDictionary",
      title:"Add to Dictionary",
      contexts:["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(function(info,tab){
    if (info.menuItemId==="addToDictionary"&&info.selectionText){
        chrome.storage.sync.get(['selectedDictionary','selectedLanguage'],function(data){
            var selectedDictionary=data.selectedDictionary||'cambridge';
            var selectedLanguage=data.selectedLanguage||'english';
            var dictionaryUrl;
            switch(selectedDictionary){
                case'cambridge':
                  dictionaryUrl="https://dictionary.cambridge.org/dictionary/"+encodeURIComponent(selectedLanguage)+"/"+encodeURIComponent(info.selectionText);
                  break;
                case'oxford':
                  dictionaryUrl="https://www.oed.com/search/dictionary/?scope=Entries&q="+encodeURIComponent(info.selectionText);
                  break;
                case'merriam-webster':
                  dictionaryUrl="https://www.merriam-webster.com/dictionary/"+encodeURIComponent(info.selectionText);
                  break;
              default:
                  dictionaryUrl="https://dictionary.cambridge.org/dictionary/english/"+encodeURIComponent(info.selectionText); // Default to Cambridge Dictionary
          }
          chrome.windows.create({
              url:dictionaryUrl,
              type:"popup",
              width:400,
              height:400
          });
      });
  }
});

