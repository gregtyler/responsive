document.addEventListener("DOMContentLoaded", function(){

function injectCSS( type, deets ) {
    if( type==='file' ) {
        var link = document.createElement('link');
        link.href = chrome.extension.getURL( deets );
    } else if( type==='raw' ) {
        var link = document.createElement('style');
        link.innerHTML = deets
    }
    link.type = 'text/css';
    link.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(link);
}

if( window.location.host.substr(-11) === 'youtube.com' ) {
window.ytEd = {
    $: function(id){return document.getElementById(id);},
    c: function(tag){return document.createElement(tag);},
    init: function() {
        injectCSS( 'file', 'youtube.css' );
    
        var attr = ytEd.$('movie_player').src;
        ytEd.$('movie_player').src = "";
        ytEd.$('movie_player').src = attr;
    
        ytEd.changeLayout();
        ytEd.hideComments();
    },
    
    changeLayout: function() {
        /* Full screen width, pl0x */
        var $container = ytEd.$('watch7-video-container')||ytEd.$('player');
        $container.style.paddingLeft = 0;
        
        // Add sidebar
        var div = ytEd.c('div');
        div.id = 'ytEd-side';
        $container.appendChild( div );
        
        // Add clearer
        var cl = ytEd.c('div');
        cl.style.clear = 'both';
        $container.appendChild( cl );
        
        //ytEd.$('watch7-video').style.width = '100%';
        var $player = (ytEd.$('watch7-player')||ytEd.$('player'));
        $player.style.width = '100%';
        window.addEventListener( 'resize', ytEd.resize, false );
        ytEd.resize();
        
        /* Sidebar! */
        var $side = ytEd.$('ytEd-side');
        $side.innerHTML = '<h2>' + ytEd.$('eow-title').innerHTML +'</h2>';
        
        var $comments = ytEd.c('div');
        $comments.id = 'ytEd-comments';
        $comments.appendChild( (ytEd.$('watch7-discussion')||ytEd.$('watch-discussion')) );
        
        $side.appendChild( $comments );
    },
    
    resize: function() {
        if( window.innerWidth < 1000 ) {
            var newHeight = window.innerWidth*0.6 + 'px';
            (ytEd.$('watch7-player')||ytEd.$('player-api')).style.height = newHeight;
            ytEd.$('ytEd-side').style.height = 'auto';
            ytEd.$('ytEd-side').style.width = '100%';
        } else {
            var newHeight = 600 + 'px';
            (ytEd.$('watch7-player')||ytEd.$('player-api')).style.height = newHeight;
            ytEd.$('ytEd-side').style.height = newHeight;
            ytEd.$('ytEd-side').style.width = (window.innerWidth - 1000 - 40) + 'px';
        }
    },
    
    toggleComments: function( force ) {
        var cv = (ytEd.$('watch7-discussion')||ytEd.$('watch-discussion'));
        cv.style.display = ( typeof force==="boolean"?(force?'block':'none'):(cv.style.display==='none'?'block':'none') );
        return false;
    },

    hideComments: function() {
        var a = ytEd.c('a');
        a.href = '#';
        a.id = 'ytEd-commentsButton';
        a.onclick = ytEd.toggleComments;
        a.innerHTML = 'Toggle comments';

        var cv = (ytEd.$('watch7-discussion')||ytEd.$('watch-discussion'));
        cv.parentNode.insertBefore( a, cv );
    }
}

ytEd.init();
} else if( window.location.host.substr(-9) === 'bbc.co.uk' ) {
window.bbcEd = {
    $: function(id){return document.getElementById(id);},
    c: function(tag){return document.createElement(tag);},
    init: function() {
        // Wait 'til page has really loaded
        bbcEd.emp = bbcEd.$('bbc_emp_embed_emp')||bbcEd.$('imp-embed');
        if( !bbcEd.emp ) { setTimeout( bbcEd.init, 100 );return false; }
        
        // Responsive classico!
        bbcEd.$('blq-container-inner').style.maxWidth = '100%';
        bbcEd.$('emp').style.width = '100%';
        bbcEd.$('emp').style.height = 'auto';
        bbcEd.emp.style.width = '100%';
        // When we resize, make the height update suitably
        window.addEventListener( 'resize', bbcEd.resize, false );
        bbcEd.resize();
    },
    resize: function() {
        bbcEd.emp = bbcEd.$('bbc_emp_embed_emp')||bbcEd.$('imp-embed');
        // Responsive classico!
        bbcEd.$('blq-container-inner').style.maxWidth = '100%';
        bbcEd.$('emp').style.width = '100%';
        bbcEd.$('emp').style.height = 'auto';
        bbcEd.emp.style.width = '100%';
        bbcEd.emp.style.height = parseInt(bbcEd.emp.offsetWidth)*9/16 + 'px';
    }
}
bbcEd.init();
} else if( window.location.host.substr(-13) === 'wikipedia.org' ) {
window.wikiEd = {
    $: function(id){return document.getElementById(id);},
    c: function(tag){return document.createElement(tag);},
    init: function() {
        injectCSS('raw', '@media only screen and (max-width:1000px){#mw-panel{display:none}div#content{margin-left:0}#left-navigation{left:0}#toc{float:none;width:100%}}');
    }
}
wikiEd.init();
} else if( window.location.host.substr(-10) === 'reddit.com' ) {
window.wikiEd = {
    init: function() {
        injectCSS('file', 'reddit.css');
        injectCSS('file', 'sourcesanspro.css');
    }
}
wikiEd.init();
}
}, false);