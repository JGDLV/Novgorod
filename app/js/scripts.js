let headerHeight = $('.header').innerHeight();

$(document).ready(function () {

	$('form').each(function () {
		const form = $(this);
		const privacyLabel = $(this).find('label[class*="privacy"]');
		const privacyInput = privacyLabel.find('input');
		const radioLabels = $(this).find('label[class*="radio"]');
		const radioInputs = radioLabels.find('input');

		privacyLabel.on('click', function () {
			if (privacyInput.attr('type') == 'checkbox') {
				privacyInput.is(':checked')
					? privacyLabel.addClass('active')
					: privacyLabel.removeClass('active');
			} else if (privacyInput.attr('type') == 'radio') {
				privacyInput.is(':checked')
					? (privacyLabel.siblings().removeClass('active'), privacyLabel.addClass('active'))
					: privacyLabel.removeClass('active');
			}
		});

		radioLabels.on('click', function () {
			radioInputs.is(':checked')
				? (radioLabels.removeClass('active'), $(this).addClass('active'))
				: $(this).removeClass('active');
		});

		form.on('submit', function () {
			privacyLabel.removeClass('active');
		});
	});

	$('.menu-toggle .icon-toggle').click(function () {
		$(this).toggleClass('active');
		$('.header-menu').slideToggle(100);
		$('.header-menu .scroll-pane').jScrollPane({ scrollbarWidth: 18, showArrows: true, verticalDragMaxHeight: 26, verticalGutter: 0, verticalArrowPositions: 'after' });
		return false;
	});

	$('.dropdown').each(function () {
		const dropdownBlock = $(this);
		const dropdownCurrent = dropdownBlock.find('div[class*="__current"]');
		const dropdownLayout = dropdownBlock.find('div[class*="__layout"]');
		const dropdownItems = dropdownBlock.find('ul');
		const dropdownItem = dropdownBlock.find('li');
		const inputVal = dropdownBlock.find('input');

		dropdownBlock.on('click', function () {
			dropdownBlock.toggleClass('active');
			dropdownItems.fadeToggle(0);
			$('.scroll-pane').jScrollPane({ scrollbarWidth: 18, showArrows: true, verticalDragMaxHeight: 26, verticalGutter: 20, verticalArrowPositions: 'after' });
		});

		dropdownBlock.on('click', 'dropdownLayout', function () {
			dropdownBlock.removeClass('active');
			dropdownItems.hide()
		});

		dropdownItem.on('click', function () {
			const html = $(this).html();
			const text = $(this).text();
			dropdownCurrent.addClass('changed').html(html);
			inputVal.val(text);
		});
	});

	$('.call-modal').magnificPopup({
		type: 'inline',
		removalDelay: 300,
		mainClass: 'mfp-fade',
	});

	$('.accordion').each(function () {
		const $this = $(this);
		const head = $this.find('*[class*="head"]');
		const body = $this.find('*[class*="body"]');

		head.on('click', function () {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$(this).next(body).slideUp(200);
			} else {
				head.removeClass('active');
				body.slideUp(200);
				$(this).addClass('active');
				$(this).next(body).slideDown(200);
			}
		});
	});

	$('.scroll-pane').jScrollPane({ scrollbarWidth: 18, showArrows: false, verticalDragMaxHeight: 26 });

	$('.guide__type').on('click', function () {
		$(this).addClass('active')
		$(this).siblings().removeClass('active')
	})

	$(".tabs").each(function () {
		let tabs = $(this);
		let tabsControls = tabs.find('.tabs__control');
		let tabsContents = tabs.find('.tabs__content');
		$(tabsContents).not(tabsContents[0]).css('display', 'none');
		$(tabsControls[0]).addClass('active');
		$(tabsControls).click(function (event) {
			event.preventDefault();
			tabsControls.removeClass('active');
			$(this).addClass('active');
			let index = $(this).index();
			tabsContents.css('display', 'none');
			tabsContents.eq(index).fadeIn(400);
		});
	});

	$('.buy__item-quantity').each(function () {
		const buttonPlus = $(this).find('.buy__item-quantity-form__plus')
		const buttonMinus = $(this).find('.buy__item-quantity-form__minus')
		const input = $(this).find('.buy__item-quantity-form__input')

		buttonPlus.on('click', function () {
			input.val(parseInt(input.val()) + 1)
		})

		buttonMinus.on('click', function () {
			if (parseInt(input.val()) > 0) {
				input.val(parseInt(input.val()) - 1)
			}
		})
	});

	// Слайдеры

	let partnersSlider = new Swiper("#partnersSwiper", {
		slidesPerView: 6,
		spaceBetween: 36,
		navigation: {
			nextEl: ".partners-slider .slider-button-next",
			prevEl: ".partners-slider .slider-button-prev",
		},
	});

	let citiesSlider = new Swiper("#citiesSwiper", {
		slidesPerView: 6,
		spaceBetween: 28,
		navigation: {
			nextEl: ".cities-slider .slider-button-next",
			prevEl: ".cities-slider .slider-button-prev",
		},
		freeMode: true,
		breakpoints: {
			310: {
				slidesPerView: 2.19,
				spaceBetween: 10,
			},
			576: {
				slidesPerView: 6,
				spaceBetween: 28,
			},
		},
	});

	let eventsSlider = new Swiper("#eventsSwiper", {
		slidesPerView: 2.3,
		spaceBetween: 9,
		freeMode: true,
	});

	let routesSlider = new Swiper("#routesSwiper", {
		slidesPerView: 1.5,
		spaceBetween: 19,
		freeMode: true,
	});

	let travelSlider = new Swiper("#travelSwiper", {
		slidesPerView: 1.5,
		spaceBetween: 24,
		freeMode: true,
	});

	let cardSlider = new Swiper("#cardSwiper", {
		autoplay: true,
		loop: true,
		autoHeight: true,
		effect: "fade"
	});

	$('#cardSwiper').on('mouseenter', function (e) {
		cardSlider.autoplay.stop();
	})
	$('#cardSwiper').on('mouseleave', function (e) {
		cardSlider.autoplay.start();
	})

	// Если разрешение меньше 576 пикселей

	$(window).on('load resize', function () {
		if ($(window).width() <= 576) {
			$('.how-to-get__item-toggler').on('click', function () {
				$(this).parents().siblings('.how-to-get__item-content').slideToggle(100)
			})

			if (partnersSlider) {
				partnersSlider.disable();
			}

			if (eventsSlider) {
				eventsSlider.enable();
				$('#eventsSwiper .swiper-wrapper').removeClass('disabled')
			}

			if (routesSlider) {
				routesSlider.enable();
				$('#routesSwiper .swiper-wrapper').removeClass('disabled')
			}

			if (travelSlider) {
				travelSlider.enable();
				$('#travelSwiper .swiper-wrapper').removeClass('disabled')
			}

		} else {
			if (partnersSlider) {
				partnersSlider.enable();
			}

			if (eventsSlider) {
				eventsSlider.disable();
				$('#eventsSwiper .swiper-wrapper').addClass('disabled')
			}

			if (routesSlider) {
				routesSlider.disable();
				$('#routesSwiper .swiper-wrapper').addClass('disabled')
			}

			if (travelSlider) {
				travelSlider.disable();
				$('#travelSwiper .swiper-wrapper').addClass('disabled')
			}
		}
	});

	// Календарь https://github.com/ThomasDev-de/jquery-bs-calendar

	$.bsCalendar.setDefaults({
		locale: 'ru',
		showPopover: false
	})

	$('#calendar').bsCalendar();

});

document.addEventListener("DOMContentLoaded", (event) => {
	GreenAudioPlayer.init({
		selector: '.audio-player',
		stopOthersOnPlay: true
	});
});


let sbProgressPage = {
	progressBar: function () {
		let progressWrap = document.querySelector('.progress-wrap');
		if (progressWrap != null) {
			let progressPath = document.querySelector('.progress-wrap path');
			let pathLength = progressPath.getTotalLength();
			let offset = 50;
			progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
			progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
			progressPath.style.strokeDashoffset = pathLength;
			progressPath.getBoundingClientRect();
			progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 200ms ease';
			['load', 'scroll'].forEach(function (event) {
				// window.addEventListener(e, mouseMoveHandler);
				window.addEventListener(event, function (event) {
					let scroll = document.body.scrollTop || document.documentElement.scrollTop;
					let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
					let progress = pathLength - (scroll * pathLength / height);
					progressPath.style.strokeDashoffset = progress;
					let scrollElementPos = document.body.scrollTop || document.documentElement.scrollTop;
					if (scrollElementPos >= offset) {
						progressWrap.classList.add("active-progress")
					} else {
						progressWrap.classList.remove("active-progress")
					}
				});
			});

			progressWrap.addEventListener('click', function (e) {
				$('body, html').animate({ scrollTop: 0 }, 500);
			});
		}
	}
}
sbProgressPage.progressBar();

var swiper = new Swiper("#menu-swiper", {
	slidesPerView: 1.5,
	spaceBetween: 34,
	freeMode: true,
	breakpoints: {
		310: {
			slidesPerView: 1.2,
			spaceBetween: 34,
		},
		375: {
			slidesPerView: 1.5,
			spaceBetween: 34,
		},
		480: {
			slidesPerView: 2.3,
			spaceBetween: 34,
		},
		768: {
			slidesPerView: 3,
			spaceBetween: 34,
		},
		992: {
			slidesPerView: 4,
			spaceBetween: 34,
		},
	},
});

var swiper = new Swiper("#news-swiper", {
	slidesPerView: 1.5,
	spaceBetween: 34,
	freeMode: true,
	breakpoints: {
		310: {
			slidesPerView: 1.2,
			spaceBetween: 34,
		},
		375: {
			slidesPerView: 1.5,
			spaceBetween: 34,
		},
		480: {
			slidesPerView: 2.3,
			spaceBetween: 34,
		},
		768: {
			slidesPerView: 3,
			spaceBetween: 34,
		},
		992: {
			slidesPerView: 4,
			spaceBetween: 34,
		},
	},
});


$(window).on('load resize', function () {
	if ($('#news-swiper2').length) {
		if ($(window).width() <= 993) {


			$('.news-page .news-grid').css('column-gap', '0')
			var asdasdasdas = new Swiper("#news-swiper2", {
				slidesPerView: 1.5,
				spaceBetween: 34,
				freeMode: true,
				breakpoints: {
					310: {
						slidesPerView: 1.2,
						spaceBetween: 34,
					},
					375: {
						slidesPerView: 1.5,
						spaceBetween: 34,
					},
					480: {
						slidesPerView: 2.3,
						spaceBetween: 34,
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 34,
					},
					992: {
						slidesPerView: 4,
						spaceBetween: 34,
					},
				},
			});
		} else {
			if (asdasdasdas.data('swiper')) {
				asdasdasdas.data('swiper').destroy();
			}
		}
	}
});

var swiper = new Swiper("#slider", {
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});