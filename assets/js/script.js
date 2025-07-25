"use script"

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};


const buttons = document.querySelectorAll('.listen-button');
const audios = document.querySelectorAll('audio');

let currentAudio = null;
let currentButton = null;

buttons.forEach(button => {
  const audioId = button.getAttribute('data-audio');
  const audio = document.getElementById(audioId);

  button.addEventListener('click', () => {
    // Останавливаем текущий трек если другой
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      if (currentButton) currentButton.textContent = 'Слухати ▶ ';
    }

    // Переключение play/pause
    if (audio.paused) {
      audio.play();
      button.innerHTML = ' Пауза <img src="assets/img/pause.svg" alt="">';
      currentAudio = audio;
      currentButton = button;
    } else {
      audio.pause();
      // button.textContent = 'Слухати ▶';
      button.innerHTML = 'Слухати <img src="assets/img/video_fill.svg" alt="">';
      currentAudio = null;
      currentButton = null;
    }
  });

  // Сброс кнопки после окончания трека
  audio.addEventListener('ended', () => {
    button.textContent = 'Слухати ▶';
    if (currentAudio === audio) {
      currentAudio = null;
      currentButton = null;
    }
  });
});


// Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link a[data-goto]');
if(menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
		
			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}

// Active link
document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.menu__list a[data-goto]');
    const sections = [];

    menuLinks.forEach(link => {
        const selector = link.dataset.goto;
        const section = document.querySelector(selector);
        if (section) {
            sections.push({
                link: link,
                section: section
            });
        }
    });

    function onScroll() {
        let scrollY = window.scrollY;

        sections.forEach(({ link, section }) => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const isActive = scrollY >= sectionTop && scrollY < sectionTop + sectionHeight;

            link.classList.toggle('active', isActive);
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // вызов при загрузке
});

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = location.pathname.split('/').pop(); // получаем имя файла

    document.querySelectorAll('.menu__list a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
});
// ------- Section about прокрутка чисел ---------------------------------------
// document.addEventListener('DOMContentLoaded', () => {
//     const statsBlock = document.getElementById('stats');
//     const stats = document.querySelectorAll('.stat');
//     const observer = new IntersectionObserver(entries => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 stats.forEach(stat => {
//                     const line = stat.querySelector('.line');
//                     const number = stat.querySelector('.number');
//                     const target = +number.getAttribute('data-target');
//                     stat.classList.add('visible');
//                     line.classList.add('visible');
//                     scrollToTarget(number, target);
//                 });
//                 observer.disconnect();
//             }
//         });
//     }, { threshold: 0.5 });

//     observer.observe(statsBlock);

//     function scrollToTarget(element, target) {
//         let start = 0;
//         const increment = target / 100;
//         const duration = 2000;
//         const stepTime = duration / 100;
//         const timer = setInterval(() => {
//             start += increment;
//             element.textContent = Math.round(start);
//             if (start >= target) {
//                 clearInterval(timer);
//                 element.textContent = target;
//             }
//         }, stepTime);
//     }
// });

// if (isMobile.any()) {
//     document.body.classList.add('_touch');
	
// 			let menuArrows = document.querySelectorAll('.menu-item-has-children');
// 			if (menuArrows.length > 0) {
// 				for (let index = 0; index < menuArrows.length; index++) {
// 					const menuArrow = menuArrows[index];
// 					menuArrow.addEventListener("click", function (e) {
// 						menuArrow.parentElement.classList.toggle('_active');
// 					});
// 				}
// 			}

// } else {
//     document.body.classList.add('_pc');
// }


// Меню бурнер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.header__right');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

const headerRight = document.querySelector('.header__right');

const observer = new MutationObserver(() => {
  if (headerRight.classList.contains('_active')) {
    header.classList.add('dark-overlay');
  } else {
    header.classList.remove('dark-overlay');
  }
});

observer.observe(headerRight, {
  attributes: true,
  attributeFilter: ['class']
});

// -------- Accordion -----------------------------------------
// var acc = document.getElementsByClassName("accordion");
// var i;

//     for (i = 0; i < acc.length; i++) {
//     acc[i].addEventListener("click", function() {
//         this.classList.toggle("active");
//         var panel = this.nextElementSibling;
//         if (panel.style.maxHeight) {
//         panel.style.maxHeight = null;
//         } else {
//         panel.style.maxHeight = panel.scrollHeight + "px";
//         }
//     });
// }


// --------- header------------------------------------------------

window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {  
        header.style.top = '0px'; 
        header.style.backgroundColor = 'white'; 
    } else {
        header.style.top = '0px'; 
        header.style.backgroundColor = 'transparent'; 
    }
});





