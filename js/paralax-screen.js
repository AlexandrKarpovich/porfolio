let w = window.innerWidth,
    h = window.innerHeight;
console.log(w);
console.log(h);


// $(document).ready(function(){
//     var windowWidth = $(window).width();
//
//     $('.page-container ,.text').mousemove(function(event){
//         var moveX = (($(window).width() / 2) - event.pageX) * 0.1;
//         var moveY = (($(window).height() / 2) - event.pageY) * 0.1;
//         $('.page-back').css('margin-left',moveX + 'px');
//         $('.page-back').css('margin-top',moveY + 'px');
//     });
//
// });

// $(window).on('mousemove', function(e){
//     var w = $(window).width();
//     var h = $(window).height();
//
//     var offsetX = 0.5 - e.pageX / w;
//     var offsetY = 0.5 - e.pageY / h;
//
//     console.log('mousemove');
//
//     $('.parallax').each(function(i, el){
//         var offset = parseInt($(el).data('offset'));
//
//         var translate = "translate3d("+ Math.round(offsetX * offset) + "px," + Math.round(offsetY * offset) + "px, 0px";
//
//         console.log('each');
//
//         $(el).css({
//             'transform':translate
//         })
//     })
// })
