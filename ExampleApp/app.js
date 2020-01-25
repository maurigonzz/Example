(function () {

    var loadScript = function(url, callback){

            script.type = "text/javascript";

            if (script.readyState) { //IE
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else { //Others
                script.onload = function () {
                    callback();
                };
            }

            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
    };



    var myAppJavaScript = function($){
      /* Your app's JavaScript here.
         $ in this scope references the jQuery object we'll use.
         Don't use 'jQuery', or 'jQuery191', here. Use the dollar sign
         that was passed as argument.*/
      //$('body').append("<p>I'm using jQuery version "+$.fn.jquery+'</p>');
      console.log('Im using jQuery version: ' + $.fn.jquery);
    };

    // For jQuery version 1.7
    var target = [3, 4, 0];

    var current = typeof jQuery === 'undefined' ? [0,0,0] : $.fn.jquery.split('.').map(function(item) {
        return parseInt(item);
    });

    if (current[0] < target[0] || (current[0] == target[0] && current[1] < target[1])) {
      loadScript('//ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js', function(){
        var jQuery1101 = jQuery.noConflict(true);
        myAppJavaScript(jQuery1101);
        console.log('jquery loaded');
      });
    } else {
      myAppJavaScript(jQuery);
    }

})();
