var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var ff = navigator.userAgent.indexOf('Firefox') > 0;
var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
if (iOS) document.body.classList.add('iOS');

var logoAnimation = function() {
    document.body.classList.add('ready');
    var setDashoffset = function(el) {
        var l = el.getTotalLength();
        el.setAttribute('stroke-dasharray', l);
        return [l,0];
    }
    var letters = anime({
        targets: '#lines path',
        strokeDashoffset: {
            value: setDashoffset,
            duration: 700,
            easing: 'easeOutQuad'
        },
        transform: ['translate(0 128)', 'translate(0 0)'],
        delay: function(el, i) {
            return 750 + (i * 120)
        },
        duration: 1400
    });
    var dotJSRoll = anime({
        targets: '#dot-js',
        transform: ['translate(0 0)', 'translate(544 0)'],
        delay: letters.duration - 800,
        duration: 800,
        elasticity: 300
    });
    var dotJSDown = anime({
        targets: '#dot-js',
        transform: ['translate(0 -304)', 'translate(0 0)'],
        duration: 500,
        elasticity: 600,
        autoplay: false
    });
    var dotJSUp = anime({
        targets: '#dot-js',
        transform: ['translate(0 0) scale(1 3)', 'translate(0 -352) scale(1 1)'],
        duration: 800,
        easing: 'easeOutCirc',
        complete: dotJSDown.play
    });

    var letterI = anime({
        targets: '#line-i-1',
        strokeDashoffset: {
            value: setDashoffset,
            duration: 700,
            easing: 'easeOutQuad'
        },
        transform: function() {
            return ff ? ['rotate(360)', 'rotate(0)'] : ['rotate(360 240 64)', 'rotate(0 240 64)'];
        },
        duration: 2500,
        delay: letters.duration - 780
    });
    var dotI = anime({
        targets: '#dot-i',
        transform: ['translate(0 -352) scale(1 3)', 'translate(0 0) scale(1 1)'],
        opacity: {
            value: [0, 1],
            easing: 'linear',
            duration: 100
        },
        delay: letters.duration + 250
    });
    var JSletters = anime({
        targets: ['#line-j', '#line-s'],
        strokeDashoffset: setDashoffset,
        duration: 1200,
        delay: function(el, i) { return (letterI.duration - 1400) + (i * 60) },
        easing: 'easeInOutQuart'
    });
    var gradients = anime({
        targets: '#fills *:not(#dot-i)',
        opacity: [0, 1],
        delay: letterI.duration - 300,
        delay: function(el, i, l) {
            var mid = l/2;
            var index = (i - mid) > mid ? 0 : i;
            var delay = Math.abs(index - mid);
            return (letterI.duration - 1300) + (delay * 30);
        },
        duration: 500,
        easing: 'linear'
    });
    var showDescription = anime({
        targets: ['.logo', '.description', '.links', 'footer'],
        opacity: {
            value: 1,
            easing: 'linear',
            duration: 1000
        },
        translateY: ['1rem', '0rem'],
        delay: function(el, i, l) { return ((l - i) * 100) + (letterI.duration - 600); },
        duration: 2250,
        easing: 'easeOutExpo'
    });
}
window.onload = logoAnimation;
