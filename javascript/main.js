var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var ff = navigator.userAgent.indexOf('Firefox') > 0;
if (iOS) document.body.classList.add('iOS');

var logoAnimation = function() {
    document.body.classList.add('ready');
    var setDashoffset = function(el) {
        var l = el.getTotalLength();
        el.setAttribute('stroke-dasharray', l);
        return [l,0];
    };

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

    var endletters = anime({
        targets: '#endlines path',
        strokeDashoffset: {
            value: setDashoffset,
            duration: 0
        },
        transform: ['translate(0 128)', 'translate(0 0)'],
        delay: 0,
        duration: 0
    });

    var letterI = anime({
        targets: '#line-i-1',
        strokeDashoffset: {
            value: setDashoffset,
            duration: 1700,
            easing: 'easeOutQuad'
        },
        transform: function() {
            return ff ? ['rotate(360)', 'rotate(0)'] : ['rotate(360 240 64)', 'rotate(0 240 64)'];
        },
        duration: 2800,
        delay: letters.duration - 780
    });

    var endletterI = anime({
        targets: '#line-i-1',
        strokeDashoffset: {
            value: setDashoffset,
            duration: 0
        },
        transform: function() {
            return ff ? ['rotate(360)', 'rotate(0)'] : ['rotate(360 240 64)', 'rotate(0 240 64)'];
        },
        duration: 0,
        delay: endletters.duration
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

    var endShowDescription = anime({
        targets: ['.endlogo', '.enddescription', '.endlinks', 'footer'],
        opacity: {
            value: 1,
            duration: 0
        },
        translateY: ['1rem', '0rem'],
        delay: function() {console.log('hello'); return endletterI.duration},
        duration: 0
    });

}
window.onload = logoAnimation;


