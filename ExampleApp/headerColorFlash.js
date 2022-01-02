(function(){
    header = document.getElementsByClassName("js-topbar section-topbar");
    var ofs = 0;
    window.setInterval(function(){
      header[0].style.background = 'rgba(255,0,0,'+Math.abs(Math.sin(ofs))+')';
      ofs += 0.030;
    }, 5);

})();
