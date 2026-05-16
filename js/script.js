    const fadeElements = document.querySelectorAll('.fade-up');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      })
    }, {
      threshold: 0.15
    });

    fadeElements.forEach(element => {
      observer.observe(element);
    });