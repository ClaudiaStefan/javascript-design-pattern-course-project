(function () {
    var cats = null,
        currentSelectionElem = document.getElementById('current-selection'),
        selectionNameElem = document.getElementById('selection-name'),
        currentCountElem = document.getElementById('current-count'),
        selectionPhotoElem = document.getElementById('selection-photo');

    ajax.load('../cats.json', loadSuccessCb);
    selectionPhotoElem.addEventListener('click', addClicks, false);

    function loadSuccessCb (data) {
        var parentElem = document.getElementById('selection-list'),
            docFragment = document.createDocumentFragment(),
            index = 0,
            catsLength;
        //We use a comparator to compare the name of two cats.
        cats = data.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        catsLength = cats.length;
        console.log('We have loaded the cats:' + JSON.stringify(cats));
        for (;index < catsLength; index += 1) {
            var imgElem = document.createElement('img');
            imgElem.id = cats[index].id;
            imgElem.src = cats[index].photo;
            imgElem.className = 'small-cat';
            imgElem.addEventListener('click', selectCat, false);
            docFragment.appendChild(imgElem);
        }
        parentElem.appendChild(docFragment);
    }

    function selectCat (event) {
        var index = 0,
            catsLength = cats.length;
        currentSelectionElem.style.display = 'inline-block';
        console.log('This cat was selected:' + event.target.id);
        for (;index < catsLength; index += 1) {
            if(cats[index].id === event.target.id) {
                selectionNameElem.innerHTML = cats[index].name;
                currentCountElem.innerHTML = cats[index].count;
                selectionPhotoElem.src = cats[index].photo;
            }
        }
    }

    function addClicks() {
        var index = 0,
            catsLength = cats.length;

        for (;index < catsLength; index += 1) {
            if(cats[index].name === selectionNameElem.innerHTML) {
                cats[index].count += 1;
                currentCountElem.innerHTML = cats[index].count;
            }
        }
    }
})();