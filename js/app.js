'use strict';
//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
    for (let index = 0; index < sliders.length; index++) {
        let slider = sliders[index];
        if (!slider.classList.contains('swiper-bild')) {
            let slider_items = slider.children;
            if (slider_items) {
                for (let index = 0; index < slider_items.length; index++) {
                    let el = slider_items[index];
                    el.classList.add('swiper-slide');
                }
            }
            let slider_content = slider.innerHTML;
            let slider_wrapper = document.createElement('div');
            slider_wrapper.classList.add('swiper-wrapper');
            slider_wrapper.innerHTML = slider_content;
            slider.innerHTML = '';
            slider.appendChild(slider_wrapper);
            slider.classList.add('swiper-bild');

            if (slider.classList.contains('_swiper_scroll')) {
                let sliderScroll = document.createElement('div');
                sliderScroll.classList.add('swiper-scrollbar');
                slider.appendChild(sliderScroll);
            }
        }
    }
}

if (document.querySelector('.slider-coffees__body')) {
    new Swiper('.slider-coffees__body', {
        observer: true,
        observeParents: true,
        speed: 800,
        spaceBetween: 20,
        // Arrows
        navigation: {
            nextEl: '.slider-coffees .slider-arrow_next',
            prevEl: '.slider-coffees .slider-arrow_prev',
        },
        breakpoints: {
            280: {
                slidesPerColumn: 1,
                slidesPerView: 1.1,
            },
            480: {
                slidesPerView: 2,
            },
            992: {
                spaceBetween: 30,
                slidesPerView: 2,
                slidesPerColumn: 2,
            },
        },
    });
}

if (document.querySelector('.slider-combo__body')) {
    new Swiper('.slider-combo__body', {
        observer: true,
        observeParents: true,
        speed: 800,
        watchOverflow: true,
        // Arrows
        navigation: {
            nextEl: '.slider-combo .slider-arrow_next',
            prevEl: '.slider-combo .slider-arrow_prev',
        },
        breakpoints: {
            280: {
                slidesPerView: 1.1,
                spaceBetween: 15,
            },
            600: {
                slidesPerView: 2,
            },
            992: {
                spaceBetween: 30,
                slidesPerView: 3,
            },
        },
    });
}
// *Эта функция проверяет поддерживается ли браузером формат изображения webp и если поддерживается, то эта функция добавляет из css-документа внутрь html-документа класс с изобажением формата webp
function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
})



let unlock = true;

// *iconMenu
let menuBody = document.querySelector('.menu__body');
let iconMenu = document.querySelector('.icon-menu');
if (iconMenu) {
    iconMenu.addEventListener('click', function () {
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
        document.body.classList.toggle('_lock');
    })
}

// *Tabs
let tabs = document.querySelectorAll("._tabs");
for (let index = 0; index < tabs.length; index++) {
    let tab = tabs[index];
    let tabs_items = tab.querySelectorAll("._tabs-item");
    let tabs_blocks = tab.querySelectorAll("._tabs-block");
    for (let index = 0; index < tabs_items.length; index++) {
        let tabs_item = tabs_items[index];
        tabs_item.addEventListener("click", function (e) {
            for (let index = 0; index < tabs_items.length; index++) {
                let tabs_item = tabs_items[index];
                tabs_item.classList.remove('_active');
                tabs_blocks[index].classList.remove('_active');
            }
            tabs_item.classList.add('_active');
            tabs_blocks[index].classList.add('_active');
            e.preventDefault();
        });
    }
}

document.addEventListener('click', function (e) {
    const targetElement = e.target;
    if (targetElement.classList.contains('_buy__btn')) {
        const productId = targetElement.closest('._buy').dataset.pid;
        addToCard(targetElement, productId);
        e.preventDefault();
    }
    if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
        if (document.querySelector('.cart-header__list').children.length > 0) {
            document.querySelector('.cart-header').classList.toggle('_active')
        }
        e.preventDefault();
    } else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('_buy__btn')) {
        document.querySelector('.cart-header').classList.remove('_active')
    }

    if (targetElement.classList.contains('cart-list__delete')) {
        const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
        updateCard(targetElement, productId, false)
        e.preventDefault();
    }

});

// Cart fixed
const cartElement = document.querySelector('.aside-full__header');
	const callback = function (entries, observer) {
		if (entries[0].isIntersecting) {
			cartElement.classList.remove('_scroll');
		} else {
			cartElement.classList.add('_scroll');
		}
	};

	const cartObserver = new IntersectionObserver(callback);
	cartObserver.observe(cartElement);

// addToCard
function addToCard(productButton, productId) {
    if (!productButton.classList.contains('_hold')) {
        productButton.classList.add('_hold')
        productButton.classList.add('_fly')

        const cart = document.querySelector('.cart-header__icon')
        const product = document.querySelector(`[data-pid = "${productId}"]`)
        const productImage = product.querySelector('._buy__image');

        const productImageFly = productImage.cloneNode(true);

        const productImageFlyWidth = productImage.offsetWidth;
        const productImageFlyHeight = productImage.offsetHeight;
        const productImageFlyTop = productImage.getBoundingClientRect().top;
        const productImageFlyLeft = productImage.getBoundingClientRect().left;
        // Создаём атрибут class со значениями _flyImage и _ibg
        // productImageFly.setAttribute('class', '_flyImage _ibg');
        productImageFly.className = '_flyImage _ibg';


        productImageFly.style.cssText =
            `
        width: ${productImageFlyWidth}px;
        height: ${productImageFlyHeight}px;
        left: ${productImageFlyLeft}px;
        top: ${productImageFlyTop}px;
        `;
        document.body.append(productImageFly)

        const cartLeft = cart.getBoundingClientRect().left;
        const cartTop = cart.getBoundingClientRect().top;

        productImageFly.style.cssText =
            `
        left: ${cartLeft}px;
        top: ${cartTop}px;
        width: 0;
        height: 0;
        opacity: 0;
        `

        productImageFly.addEventListener('transitionend', function () {
            if (productButton.classList.contains('_fly')) {
                productImageFly.remove();
                updateCard(productButton, productId)
                productButton.classList.remove('_fly')
            }
        });
    }
}
// updateCard
function updateCard(productButton, productId, productAdd = true) {
    const cart = document.querySelector('.cart-header');
    const cartIcon = cart.querySelector('.cart-header__icon');
    const cartQuantity = cartIcon.querySelector('span');
    const cartProduct = document.querySelector(`[data-cart-pid = "${productId}"]`)
    const cartList = document.querySelector('.cart-list');
    if (productAdd) {
        if (cartQuantity) {
            cartQuantity.innerHTML = ++cartQuantity.innerHTML;
        } else {
            cartIcon.insertAdjacentHTML('beforeend', '<span>1</span>');
        }

        if (!cartProduct) {
            const product = document.querySelector(`[data-pid = "${productId}"]`)
            const productImage = product.querySelector('._buy__image').innerHTML;
            const productTitle = product.querySelector('._buy__title').innerHTML;
            const cardProductContent = `
            <a href="" class="cart-list__image _ibg">${productImage}</a>
            <div class="cart-list__body">
                <a href="" class="cart-list__title">${productTitle}</a>
                <div class="cart-list__quantity">Quantity: <span>1</span></div>
                <a href="" class="cart-list__delete">Delete</a>
            </div>
            `;
            cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="cart-list__item">${cardProductContent}</li>`);
        } else {
            const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
            cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML
        }

        productButton.classList.remove('_hold')
    } else {
        const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
        cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
        if (!parseInt(cartProductQuantity.innerHTML)) {
            cartProduct.remove();
        }

        const cartQuantityValue = --cartQuantity.innerHTML;
        if (!cartQuantityValue) {
            cartQuantity.remove();
            cart.classList.remove('_active');
        }
    }
}



// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();