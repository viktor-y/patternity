const $ = require('jquery');

const Animate = function() {
  function run(element, animation, infinite, animationEndCallback) {
    infinite = infinite || false;
    animationEndCallback = animationEndCallback || function() {};

    if (isAnimationSupported()) {
      $(element).addClass('animated ' + animation + isInfinite(infinite));
      $(element).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(event) {
        $(event.target).removeClass('animated ' + animation + ' infinite');
        animationEndCallback(event.target);
      });
    } else {
      animationEndCallback(element);
    }
  }

  function isInfinite(infinite) {
    return infinite ? ' infinite' : '';
  }

  function isAnimationSupported() {
    let animation = false, animationstring = 'animation', keyframeprefix = '', pfx = '';
    const domPrefixes = 'Webkit Moz O ms Khtml'.split(' '), elm = document.createElement('div');

    if (elm.style.animationName !== undefined) {
      animation = true;
    }

    if (animation === false) {
      for (let i = 0; i < domPrefixes.length; i++) {
        if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
          pfx = domPrefixes[i];
          animationstring = pfx + 'Animation';
          keyframeprefix = '-' + pfx.toLowerCase() + '-';
          animation = true;
          break;
        }
      }
    }

    return animation;
  }

  return {
    run:                  run,
    isAnimationSupported: isAnimationSupported
  };
};

module.exports = new Animate();
