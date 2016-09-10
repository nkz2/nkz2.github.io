// center div on page, not just inside containing div
$(document).ready(function(){
    var elm1 = $('.description').width();
    var elm = elm1/2;
    var win1 = $(window).width();
    var win = win1/2;
    var m = win - elm ;
    console.log(m);
    $('.description').css("margin-left",m + "px")
});

// smooth scoller
// $('.smooth').on('click', function() {
//     $.smoothScroll({
//         scrollElement: $('body'),
//         scrollTarget: '#' + this.id
//     });
//
//     return false;
// });