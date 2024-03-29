new Glider(document.querySelector('.glider'), {
    // Mobile-first defaults
    slidesToShow: 1,
    slidesToScroll: 1,
    scrollLock: true,
    dots: '#resp-dots',
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
    },
    responsive: [
      {
        // screens greater than >= 775px
        breakpoint: 768,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 3,
          slidesToScroll: 1,
          itemWidth: 150,
          duration: 0.25
        }
      },{
        // screens greater than >= 1024px
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          itemWidth: 150,
          duration: 0.25
        }
      }
    ]
  });

  new Glider(document.querySelector('.glider2'), {
    // Mobile-first defaults
    slidesToShow: 1,
    slidesToScroll: 1,
    scrollLock: true,
    dots: '#resp-dots2',
    arrows: {
      prev: '.glider-prev2',
      next: '.glider-next2'
    },
    responsive: [
      {
        // screens greater than >= 775px
        breakpoint: 768,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 3,
          slidesToScroll: 1,
          itemWidth: 150,
          duration: 0.25
        }
      },{
        // screens greater than >= 1024px
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          itemWidth: 150,
          duration: 0.25
        }
      }
    ]
  });

  