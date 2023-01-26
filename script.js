const perspective = document.getElementById('scroll-perspective');
  const images = perspective.querySelectorAll('img');
  const maxScrollSpeed = 5;
  let lastTime;
  let previousScrollPosition;
  let timer = 0;

  const animationOptions = {
    duration: 200,
    fill: 'forwards',
    iteration: 1
  }

  window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;
    const currentTime = new Date().getTime();
    let scrollSpeed = 0;
    
    if (previousScrollPosition !== undefined && lastTime !== undefined) {
      const timeElapsed = currentTime - lastTime;
      scrollSpeed = Math.abs(currentScrollPosition - previousScrollPosition) / timeElapsed;
    }

    if (timer !== null) {
      clearTimeout(timer);        
    }

    timer = setTimeout(function() {
      images.forEach((image) => {
        image.animate([{
          transform: `rotateX(0deg)`
        }], animationOptions)
      });
    }, 200);

    let degrees = (scrollSpeed / maxScrollSpeed) * 5;

    if (degrees < 0) {
      degrees = 0;
    } else if (degrees > 5) {
      degrees = 5;
    }

    console.log(degrees);

    images.forEach((image) => {
      if (previousScrollPosition > window.scrollY) {
        // up
        image.animate([{
          transform: `rotateX(-${degrees}deg)`
        }], animationOptions)
      } else {
        // down
        image.animate([{
          transform: `rotateX(${degrees}deg)`
        }], animationOptions)
      }
    });

    previousScrollPosition = window.scrollY;
    lastTime = currentTime;
  })
  let activeIndex = 0;

const groups = document.getElementsByClassName("card-group");

const handleLoveClick = () => {
  const nextIndex = activeIndex + 1 <= groups.length - 1 ? activeIndex + 1 : 0;
  
  const currentGroup = document.querySelector(`[data-index="${activeIndex}"]`),
        nextGroup = document.querySelector(`[data-index="${nextIndex}"]`);
        
  currentGroup.dataset.status = "after";
  
  nextGroup.dataset.status = "becoming-active-from-before";
  
  setTimeout(() => {
    nextGroup.dataset.status = "active";
    activeIndex = nextIndex;
  });
}

const handleHateClick = () => {
  const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : groups.length - 1;
  
  const currentGroup = document.querySelector(`[data-index="${activeIndex}"]`),
        nextGroup = document.querySelector(`[data-index="${nextIndex}"]`);
  
  currentGroup.dataset.status = "before";
  
  nextGroup.dataset.status = "becoming-active-from-after";
  
  setTimeout(() => {
    nextGroup.dataset.status = "active";
    activeIndex = nextIndex;
  });
}
