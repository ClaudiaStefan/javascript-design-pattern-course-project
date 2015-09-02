var ajax = {
    'load' : function (url, callback) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = ensureReadiness;

        function ensureReadiness() {
            if(xhr.readyState < 4) {
                return;
            }

            if(xhr.status !== 200) {
                return;
            }

            /*
                 onreadystatechange will fire five times as your specified page is requested.

                 0: uninitialized
                 1: loading
                 2: loaded
                 3: interactive
                 4: complete
             */
            if(xhr.readyState === 4) {
                callback(JSON.parse(xhr.response));
            }
        }

        xhr.open('GET', url, true);
        xhr.send('');
    }

};
