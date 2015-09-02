(function () {
    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                date: new Date().toUTCString()
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = document.getElementById('notes');
            var newNoteForm = document.getElementById('new-note-form');
            var newNoteContent = document.getElementById('new-note-content');
            newNoteForm.addEventListener('submit', function(e){
                octopus.addNewNote(newNoteContent.value);
                newNoteContent.value = '';
                e.preventDefault();
            }, false);
            view.render();
        },
        render: function(){
            var index = 0,
                notes = octopus.getNotes(),
                notesLength = notes.length,
                docFrag = document.createDocumentFragment();

            while (this.noteList.firstChild) {
                this.noteList.removeChild(this.noteList.firstChild);
            }

            for (; index < notesLength; index += 1) {
                var li = document.createElement('li'),
                    span1 = document.createElement('span'),
                    span2 = document.createElement('span');
                li.className = 'note';
                span1.innerHTML = notes[index].content + ' ';
                span2.innerHTML = notes[index].date;
                span2.className = 'date';
                li.appendChild(span1);
                li.appendChild(span2);
                docFrag.appendChild(li);
            }

            this.noteList.appendChild(docFrag);
        }
    };

    octopus.init();

})();