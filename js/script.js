// Свайпер
const swiper = new Swiper('.swiper', {
    loop: true,
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
  });


// Таби 
$(document).ready(function(){
    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');
    
    
    // Модальні вікна

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });
    


    // Маска вводу номера
    $('input[name=phone]').mask("+38(099) 999-99-99");


    

    //Валідація форми
    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Будь ласка, введіть своє ім'я",
                    minlength: jQuery.validator.format("Введіть {0} символа!")
                  },
                phone: "Будь ласка, введіть свій номер телефону",
                email: {
                  required: "Будь ласка, введіть свою пошту",
                  email: "Неправильно введена адреса пошти"
                }
            }
        });
    }
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');
    
    $('form').submit(function(e) {
        e.preventDefault();
    

        validateForms(this);
        if ($(this).valid()) {
            $('input').val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        }
    });

    // Плавний скролл та підняття вгору
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $(".pageup").click(function(){
        $("html, body").animate({scrollTop: 0}, 1000);
        return false;
    });

    new WOW().init();

    $(document).on('click', function(event) {
        if ($(event.target).hasClass('overlay')) {
          // Натиснуто на область поза модальним вікном, закриваємо все
          $('.overlay, #order, #thanks, #consultation').fadeOut();
        }
      });
});

