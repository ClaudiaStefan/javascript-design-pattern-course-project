(function () {
    var model = {
        init: function(successCb) {
            ajax.load('../cats.json', successCb);
        },

        currentCat: null,

        setCats: function (cats) {
            //We use a comparator to compare the name of two cats.
            this.cats = cats.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
        },

        getAllCats: function() {
            return this.cats;
        }
    };


    var octopus = {
        init: function() {
            model.init(successCb);

            function successCb (data) {
                model.setCats(data);
                viewCatList.init();
            }
        },

        getCats: function() {
            return model.getAllCats();
        },

        selectCat: function (id) {
            model.currentCat = id;
            viewCurrentCat.init();
            viewCurrentCat.render(id);
        },

        countClicks: function () {
            var index = 0,
                cats = octopus.getCats(),
                catsLength = cats.length;

            for (;index < catsLength; index += 1) {
                if(cats[index].id === model.currentCat) {
                    cats[index].count += 1;
                }
            }
            viewCurrentCat.render(model.currentCat);
        }
    };


    var viewCatList = {
        init: function() {
            viewCatList.render();
        },

        render: function(){
            var parentElem = document.getElementById('selection-list'),
                docFragment = document.createDocumentFragment(),
                index = 0,
                catsLength,
                cats = octopus.getCats();

            catsLength = cats.length;

            for (;index < catsLength; index += 1) {
                var imgElem = document.createElement('img'),
                    spanElem = document.createElement('span');
                imgElem.id = cats[index].id;
                imgElem.src = cats[index].photo;
                imgElem.className = 'small-cat';
                imgElem.addEventListener('click', selectCat, false);
                spanElem.innerHTML = cats[index].name;
                docFragment.appendChild(spanElem);
                docFragment.appendChild(imgElem);
            }

            function selectCat (event) {
               octopus.selectCat(event.target.id);
            }

            parentElem.appendChild(docFragment);
        }
    };

    var viewCurrentCat = {
        init: function() {
            this.currentSelectionElem = document.getElementById('current-selection');
            this.selectionNameElem = document.getElementById('selection-name');
            this.currentCountElem = document.getElementById('current-count');
            this.selectionPhotoElem = document.getElementById('selection-photo');
            this.selectionPhotoElem.addEventListener('click', octopus.countClicks, false);
        },

        render: function (id){
            var index = 0,
                cats = octopus.getCats(),
                catsLength = cats.length;
            this.currentSelectionElem.style.display = 'inline-block';
            console.log('This cat was selected:' + id);
            for (;index < catsLength; index += 1) {
                if(cats[index].id === id) {
                    this.selectionNameElem.innerHTML = cats[index].name;
                    this.currentCountElem.innerHTML = cats[index].count;
                    this.selectionPhotoElem.src = cats[index].photo;
                }
            }
        }
    };
    octopus.init();
})();