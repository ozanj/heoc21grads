$(function() {
  
  // Keyboard Controls

  var horizontalKeyboard = {
    78: 'right',  // n
    34: 'right',  // page down
    72: 'left',  // h
    37: 'left',  // left
    76: 'right',  // l
    39: 'right',  // right
    32: 'right',  // space
    80: 'left',  // p
    33: 'left',  // page up
    40: 'down'  // down
  };

  var verticalKeyboard = {
    78: 'down',  // n
    34: 'down',  // page down
    72: null,  // h
    37: null,  // left
    76: null,  // l
    39: null,  // right
    32: 'down',  // space
    80: 'up',  // p
    33: 'up',  // page up
    40: 'down'  // down
  };

  function handleVertical() {
    console.log('verticalKeyboard');
    Reveal.configure({
      keyboard: verticalKeyboard
    });
  }
  
  function handleHorizontal() {
    console.log('horizontalKeyboard');
    Reveal.configure({
      keyboard: horizontalKeyboard
    });
  }

  // Updating Navigation
  
  if (Reveal.getState().indexv > 0) {  // regular vertical slide
    handleVertical();
  } else {  // regular horizontal slide
    handleHorizontal();
  }

  Reveal.addEventListener('slide-vertical', function() {
    handleVertical();
  }, false);

  Reveal.addEventListener('slide-horizontal', function() {
    handleHorizontal();
  }, false);
  
  // Slideshow
  
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  var slideshows = document.querySelectorAll('.slides-wrapper');
  
  // Apply to all slideshows that you defined
  slideshows.forEach(initSlideShow);

  // Source: https://www.freecodecamp.org/news/how-to-create-a-slideshow/
  function initSlideShow(slideshow) {
    var slides = document.querySelectorAll(`#${slideshow.id} .slide`); // Get an array of slides

    var index = getRandomInt(slides.length), time = 2000;
    slides[index].classList.add('active');  
    
    setInterval( () => {
      slides[index].classList.remove('active');
      
      // Choose a random index
      index = getRandomInt(slides.length);
      
      slides[index].classList.add('active');

    }, time);
  }
  
  // Need to manually click for audio to play due to this: https://goo.gl/xX8pDD
  $('#slide-1').on('click', function() {
    document.querySelector('#slides-music').play();
  });
  
  // Theme + Background
  
  $('.theme-button').on('click', function(e) {
    var theme = e.target.innerHTML;
    var el = document.getElementById('theme');
    el.href = `libraries/frameworks/revealjs/css/theme/${theme}.css`;
  });
  
  $('.bg-button').on('click', function(e) {
    if (e.target.dataset.bg === 'on') {
      $('.slide-background').addClass('hide');
      e.target.dataset.bg = 'off';
    } else {
      $('.slide-background').removeClass('hide');
      e.target.dataset.bg = 'on';
    }
  });
  
  // Audio
  
  $('.audio-button').on('click', function(e) {
    if (e.currentTarget.dataset.status === 'off') {
      document.getElementById(e.currentTarget.dataset.id).play();
      $(this).find('i').removeClass('fa-play-circle');
      $(this).find('i').addClass('fa-pause-circle');
      e.currentTarget.dataset.status = 'on';
    } else {
      document.getElementById(e.currentTarget.dataset.id).pause();
      $(this).find('i').removeClass('fa-pause-circle');
      $(this).find('i').addClass('fa-play-circle');
      e.currentTarget.dataset.status = 'off';
    }
  });
  
  Reveal.addEventListener('slidechanged', function() {
    $('.audio-button').each(function(e) {
      $(this).find('i').removeClass('fa-pause-circle');
      $(this).find('i').addClass('fa-play-circle');
      $(this)[0].dataset.status = 'off';
    });
    $('.modal').fadeOut();
    $('.container img, .quote, .textbox').removeClass('disabled');
  });
  
  // Modal

  $('.reveal .container img, .reveal .quote, .reveal .textbox').on('click', function() {
    var $slide = $(this).closest('.horizontal');
    
    if ($(this).is('img')) {
      var src = $(this).attr('src');
      var content = `<img src="${src}" />`;
      $slide.find('.modal .content').html(content);
    } else if ($(this).hasClass('quote')) {
      var quote = $(this).html();
      $slide.find('.modal .content').html(quote);
    } else {
      var text = $(this).html();
      $slide.find('.modal .content').html(`<p class="plain-text">${text}</p>`);
    }

    $(this).closest('.horizontal').find('.modal').fadeIn();
    $(this).closest('.horizontal').find('.container img, .quote, .textbox').addClass('disabled');
  });

  $('.close').on('click', function() {
    $(this).closest('.horizontal').find('.modal').fadeOut();
    $(this).closest('.horizontal').find('.container img, .quote, .textbox').removeClass('disabled');
  });
  
});
