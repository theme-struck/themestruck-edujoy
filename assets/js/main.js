$(document).ready(function(){
    
    var owl = $("#owl-demo");
    owl.owlCarousel({
        items: 3, //10 items above 1000px browser width
        itemsDesktop: [1000, 3], //5 items between 1000px and 901px
        itemsDesktopSmall: [900, 2], // betweem 900px and 601px
        itemsTablet: [600, 1], //2 items between 600 and 0
        itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option
    });
    
    $('.menu-btn').on('click', function(){
        $('.main-menu').toggleClass('open');
    });
    
    var headerHeight = $('header').outerHeight();
    $('header').css('top', '-' + headerHeight +'px');
    
    var lastScrollTop = 0, 
        delta = headerHeight/2;
    $(window).on('scroll', function(){
        var scrollTop = $(this).scrollTop();
        if( Math.abs(scrollTop - lastScrollTop) <= delta) return false;
        if(scrollTop > lastScrollTop){
            $('header').removeClass('open');
            $('.main-menu').removeClass('open');
        } else {
            $('header').addClass('open');
        }
        lastScrollTop = scrollTop;
    });
    
    
    var lastId,
         topMenu = $(".spy-nav"),
         // All list items
         menuItems = topMenu.find("a"),
         // Anchors corresponding to menu items
         scrollItems = menuItems.map(function () {
             var item = $($(this).attr("href"));
             if (item.length) {
                 return item;
             }
         });
    
    // so we can get a fancy scroll animation
     menuItems.click(function (e) {
         var href = $(this).attr("href"),
             offsetTop = href === "#" ? 0 : $(href).offset().top;
         $('html, body').stop().animate({
             scrollTop: offsetTop
         }, 300);
         e.preventDefault();
     });
    
    // Bind to scroll
     $(window).scroll(function () {
         // Get container scroll position
         var fromTop = $(this).scrollTop() + 10;

         // Get id of current scroll item
         var cur = scrollItems.map(function () {
             if ($(this).offset().top < fromTop)
                 return this;
         });
         // Get the id of the current element
         cur = cur[cur.length - 1];
         var id = cur && cur.length ? cur[0].id : "";

         if (lastId !== id) {
             lastId = id;
             // Set/remove active class
             menuItems
                 .parent().removeClass("active")
                 .end().filter("[href=#" + id + "]").parent().addClass("active");
         }
     });
    
});