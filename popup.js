document.addEventListener('DOMContentLoaded',function() {
    var selectElement=document.getElementById('dictionarySelect');
    var languageSelectContainer=document.createElement('div');
    languageSelectContainer.id='languageSelectContainer';
    document.body.appendChild(languageSelectContainer);

    function updateLanguageSelect(selectedDictionary) {
        languageSelectContainer.innerHTML=''; // 清空之前的内容
        if (selectedDictionary==='cambridge') {
            languageSelectContainer.innerHTML = `
                <h3>Select Language:</h3>
                <select id="LanguageSelect">
                    <option value="english">English</option>
                    <option value="english-chinese-traditional">繁體中文</option>
                    <option value="english-chinese-simplified">简体中文</option>
                    <option value="english-chinese-simplified">简体中文</option>
                    <option value="english-dutch">Dutch</option>
                    <option value="english-french">French</option>
                    <option value="english-german">German</option>
                </select>
            `;
            var languageSelectElement=document.getElementById('LanguageSelect');
            chrome.storage.sync.get('selectedLanguage',function(data) {
                var selectedLanguage=data.selectedLanguage||'english';
                languageSelectElement.value=selectedLanguage;

                languageSelectElement.addEventListener('change',function() {
                    chrome.storage.sync.set({'selectedLanguage':languageSelectElement.value });
                });
            });
        }
    }

    function initialize() {
        chrome.storage.sync.get(['selectedDictionary','selectedLanguage'],function(data) {
            var selectedDictionary = data.selectedDictionary||'cambridge';
            selectElement.value=selectedDictionary;
            updateLanguageSelect(selectedDictionary);
        });
    }

    selectElement.addEventListener('change',function() {
        var selectedDictionary=selectElement.value;
        chrome.storage.sync.set({'selectedDictionary':selectedDictionary });
        updateLanguageSelect(selectedDictionary);
    });
    initialize();
});
