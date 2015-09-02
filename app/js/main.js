(function () {
    var model = {
        init: function(afterInitCb) {
            var that = this;

            ajax.load('../cats.json', loadSuccessCb);

            function loadSuccessCb (data) {
                //We use a comparator to compare the name of two cats.
                that.cats = data.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });

                console.log('We have loaded the cats:' + JSON.stringify(that.cats));

                if (afterInitCb) {
                    afterInitCb();
                }

            }
        },

        getAllCats: function() {
            return this.cats;
        }
    };


    var octopus = {
        getCats: function() {
            return model.getAllCats();
        },

        selectCat: function (event) {
            viewCurrentCat.init();
            viewCurrentCat.render(event);
        },

        init: function() {
            model.init(viewCatList.init);
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
                var imgElem = document.createElement('img');
                imgElem.id = cats[index].id;
                imgElem.src = cats[index].photo;
                imgElem.className = 'small-cat';
                imgElem.addEventListener('click', selectCat, false);
                docFragment.appendChild(imgElem);
            }

            function selectCat (event) {
               octopus.selectCat(event);
            }
            parentElem.appendChild(docFragment);
        }
    };

    var viewCurrentCat = {
        init: function() {
            var that = this;
            this.currentSelectionElem = document.getElementById('current-selection');
            this.selectionNameElem = document.getElementById('selection-name');
            this.currentCountElem = document.getElementById('current-count');
            this.selectionPhotoElem = document.getElementById('selection-photo');
            this.selectionPhotoElem.addEventListener('click', addClicks, false);
            function addClicks() {
                var index = 0,
                    cats = octopus.getCats(),
                    catsLength = cats.length;

                for (;index < catsLength; index += 1) {
                    if(cats[index].name === that.selectionNameElem.innerHTML) {
                        cats[index].count += 1;
                        that.currentCountElem.innerHTML = cats[index].count;
                    }
                }
            }
        },

        render: function (event){
            var index = 0,
                cats = octopus.getCats(),
                catsLength = cats.length;
            this.currentSelectionElem.style.display = 'inline-block';
            console.log('This cat was selected:' + event.target.id);
            for (;index < catsLength; index += 1) {
                if(cats[index].id === event.target.id) {
                    this.selectionNameElem.innerHTML = cats[index].name;
                    this.currentCountElem.innerHTML = cats[index].count;
                    this.selectionPhotoElem.src = cats[index].photo;
                }
            }
        }
    };
    octopus.init();
})();