function showabout(){
    $("#about_container").css("display","inherit");
    $("#about_container").addClass("animated slideInLeft");
    setTimeout(function(){
        $("#about_container").removeClass("animated slideInLeft");
    },800);
}
function closeabout(){
    $("#about_container").addClass("animated slideOutLeft");
    setTimeout(function(){
        $("#about_container").removeClass("animated slideOutLeft");
        $("#about_container").css("display","none");
    },800);
}
function showwork(){
    $("#work_container").css("display","inherit");
    $("#work_container").addClass("animated slideInRight");
    setTimeout(function(){
        $("#work_container").removeClass("animated slideInRight");
    },800);
}
function closework(){
    $("#work_container").addClass("animated slideOutRight");
    setTimeout(function(){
        $("#work_container").removeClass("animated slideOutRight");
        $("#work_container").css("display","none");
    },800);
}
function showcontact(){
    $("#contact_container").css("display","inherit");
    $("#contact_container").addClass("animated slideInUp");
    setTimeout(function(){
        $("#contact_container").removeClass("animated slideInUp");
    },800);
}
function closecontact(){
    $("#contact_container").addClass("animated slideOutDown");
    setTimeout(function(){
        $("#contact_container").removeClass("animated slideOutDown");
        $("#contact_container").css("display","none");
    },800);
}
setTimeout(function(){
    $("#loading").addClass("animated fadeOut");
    setTimeout(function(){
      $("#loading").removeClass("animated fadeOut");
      $("#loading").css("display","none");
      $("#box").css("display","none");
      $("#about").removeClass("animated fadeIn");
      $("#contact").removeClass("animated fadeIn");
      $("#work").removeClass("animated fadeIn");
    },1000);
},1500);

document.documentElement.className += ' hasjs';

var Slider = (function (window){
    // rilevo il supporto nativo alla selezione degli elementi con query CSS
    var _hasQuerySelector = 'querySelectorAll' in document;
    //supporto universale all'aggiunta di eventi
    //based on http://ejohn.org/projects/flexible-javascript-events/
    function addEvent( obj, type, func ) {
    var fn = function (e) {
    if (e.preventDefault) {
    e.preventDefault();
    } else {
    e.returnValue = false;
    }
    func();
    };
    if ( obj.attachEvent ) {
    obj['e'+type+fn] = fn;
    obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
    obj.attachEvent( 'on'+type, obj[type+fn] );
    } else {
    obj.addEventListener( type, fn, false );
    }
    }
    //selezione degli elementi via query CSS
    function getEls (selector, context) {
    var parent = context || document;
    // uso Sizzle come fallback
    return _hasQuerySelector ? parent.querySelectorAll(selector) : Sizzle(selector, parent);
    }
    //Estraggo il primo elemento di una query
    function getEl (selector, context) {
    return getEls(selector, context)[0];
    }

    var _Slider = function (wrapper) {
        //il contenitore dello slider
        var $wrapper = document.getElementById(wrapper),
        //navigazione indietro
        $navPrev = getEl('.nav_prev', $wrapper),
        //navigazione avanti
        $navNext = getEl('.nav_next', $wrapper),
        //puntatori diretti alle immagini
        $navBtns = getEls('.nav_btn', $wrapper),
        //questo riferimento a this ci servirà più tardi
        that = this;
        //salvo un riferimento interno ad alcuni elementi
        this.$slider = getEl('.slider', $wrapper);
        // numero totale delle immagini
        this.IMAGE_COUNT = getEls('.slider img', $wrapper).length || 0;
        // l'immagine visualizzata corrente
        this.current_img = 0;
        //agganciamo gli eventi ai controlli...
        //...immagine precedente
        addEvent($navPrev, 'click', function () {
        that.prev();
        });
        //...immagine successiva
        addEvent($navNext, 'click', function () {
        that.next();
        });
        //.., puntatori
        for (var i=0, l = $navBtns.length; i < l; i++) {
        addEvent($navBtns[i], 'click',
        //uso una closure per "fissare" il valore di i
        (function () {
        var index = i;
        return function () {
        that.seek(index);
        };
        })()
        );
        }
        };

        _Slider.prototype = {
            //larghezza di default dell'immagine
            IMAGE_WIDTH : 480,
            seek : function (index) {
            if (index < 0 || index >= this.IMAGE_COUNT) {
            index = 0; //normalizza il puntatore
            }
            //imposto l'immagine corrente
            this.current_img = index;
            //visualizzo l'immagine richiesta
            this._animateSlide('-' + (index*this.IMAGE_WIDTH) + 'px');
            },
            next : function () {
            this.seek(this.current_img + 1);
            },
            prev : function () {
            this.seek(this.current_img - 1);
            },
            _animateSlide : function (amount) {
            //modifico la proprietà CSS left del contenitore delle immagini
            this.$slider.style.left = amount;
            }
            };

            //sopra c'è il prototipo
return _Slider;
})(window);

// browser standard-compliant
if ( document.addEventListener ) {
    document.addEventListener('DOMContentLoaded', function () {
    new Slider('#wrapper');
    }, false);
    // fallback per IE
    } else if ( window.attachEvent ) {
    window.attachEvent('onload', function () {
    new Slider('#wrapper');
    });
    }