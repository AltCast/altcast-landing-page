(function(w) {

  document.body.addEventListener('click', function(e) {
    e.preventDefault(); 

    var el = findRealTarget(e.target, 'scrollable');
    var elTarget, finalTarget;

    if (el) {
      elTarget = el.getAttribute('href');
      finalTarget = document.querySelector(elTarget);

      console.log(elTarget);
      console.log(finalTarget);

      if (finalTarget) {
        doScrolling(finalTarget.offsetTop, 1000);
      }
    }
  });

  function findRealTarget(el, needle) {
    if (el.className.indexOf(needle) > -1) {
      return el;
    } else {
      if (el === document.body) {
        return null;
      }
      return findRealTarget(el.parentNode, needle);
    }
  }

  function doScrolling(elementY, duration) { 
    var startingY = w.pageYOffset;
    var diff = elementY - startingY;
    var start;
  
    // Bootstrap our animation - it will get called right before next frame shall be rendered.
    w.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      var time = timestamp - start;
      var percent = Math.min(time / duration, 1);
  
      w.scrollTo(0, startingY + diff * percent);
  
      if (time < duration) {
        w.requestAnimationFrame(step);
      }
    })
  }

}(window));