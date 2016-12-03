var token = 'DirectLogin token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIiOiIifQ.zXG9sAr_WE0hWDD3S4IsYS7_mLDCSCsF5HcfSI2m2xo"'
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open('GET', theUrl, true); // true for asynchronous 
    xmlHttp.setRequestHeader('Authorization', token);
    xmlHttp.send(null);
}

function getAccounts() {
    var url = 'https://apisandbox.openbankproject.com/obp/v2.1.0/my/banks/rbs/accounts';
    httpGetAsync(url, function(res) {
        var accounts = JSON.parse(res);
        console.log(accounts);
        var accountsUL = makeUL(accounts);
        document.getElementById('accounts').appendChild(accountsUL);
    });
}

function makeUL(array) {
    var list = document.createElement('ul');
    array.forEach(account => {
        var accountElem = document.createElement('li');
        accountElem.setAttribute('id', account.id);

        appendName(accountElem);
        appendTags(accountElem);

        list.appendChild(accountElem);
    });
    return list;
}

function appendName(accountElem) {
    var id = accountElem.getAttribute('id');
    var name = document.createElement('h3');
    name.appendChild(document.createTextNode(id));
    accountElem.appendChild(name);
}

function appendTags(accountElem) {
    var tagsUl = document.createElement('ul');
    var id = accountElem.getAttribute('id');
    getTags(id, tags => {
        tags.forEach(tag => {
            var tagLi = document.createElement('li');

            var tagP = document.createElement('div');
            tagP.appendChild(document.createTextNode(tag));
            tagLi.appendChild(tagP);

            var tagRemoveButton = document.createElement('button');
            tagRemoveButton.appendChild(document.createTextNode('X'));
            tagRemoveButton.setAttribute('onclick', `deleteTag("${id}", "${tag}")`);
            tagLi.appendChild(tagRemoveButton);

            tagsUl.appendChild(tagLi);
        });
    });
    accountElem.appendChild(tagsUl);

    var inputTA = document.createElement('textarea');
    inputTA.setAttribute('rows', 1);
    inputTA.setAttribute('id', 'submitTag:' + id);
    accountElem.appendChild(inputTA);

    var inputSubmit = document.createElement('button');
    inputSubmit.setAttribute('onclick', `addTag("${id}")`);
    inputSubmit.appendChild(document.createTextNode('Submit'));
    accountElem.appendChild(inputSubmit);
}

function deleteTag(account, tag) {
    console.log('deleting tag:', tag);
    console.log('from account:', account);
}

function addTag(account, tag) {
    //TODO implement
    var tag = document.getElementById('submitTag:' + account).value;
    console.log('adding tag:', tag);
    console.log('to account:', account);
}

function getTags(id, cb) {
    //TODO implement
    cb(['tag1','tag2']);
}
