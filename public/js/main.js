document.addEventListener('DOMContentLoaded', () => {
    //SELECTORS
    const modalResponse = document.querySelector('.modal.modal-response');
    const modalLoading = document.querySelector('.modal-loading');
    const modalTitle = document.querySelector('.modal-title');
    const modalFirstParagraph = document.querySelector('.modal-first-paragraph');
    const modalsecondParagraph = document.querySelector('.modal-second-paragraph');
    const modalButtons = document.querySelector('.modal.modal-response .modal-buttons');
    const modalInfo = document.querySelector('.modal.modal-info');
    const scrollSmooth = document.querySelectorAll('.scroll-smooth');
    const sideNav = document.querySelector(".sidenav");
    const carousel = document.querySelectorAll('.carousel');
    const collapsible = document.querySelectorAll('.collapsible');
    const seeMoreBtn = document.querySelector('.seemore-btn');
    const form = document.querySelector("form");
    const role = document.querySelectorAll('.role');
    const name = document.querySelector('#name');
    const establishment = document.querySelector('#establishment');
    const email = document.querySelector('#email');
    const phone = document.querySelector('#phone');
    const comment = document.querySelector('#comment');
    const bottomPage = document.querySelector('#bottom-page');
    const bottomMore = document.querySelectorAll('.large.material-icons');

    //REGEX
    const regexName = /[^a-zA-Z ]/;
    const regexEstablishment = /[^a-zA-Z0-9-. ]/;
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regexPhone = /[^0-9]/;

    //INITIALIZE MODAL, HAMBURGER MENU, CAROUSEL AND COLLAPSIBLE
    const modalResponseInstance = M.Modal.init(modalResponse, { dismissible: false });
    const modalInfoInstance = M.Modal.init(modalInfo, { dismissible: false });
    const hamburgerMenuInstance = M.Sidenav.init(sideNav, {});
    M.Carousel.init(carousel, { fullWidth: true, duration: 150, indicators: true });
    M.Collapsible.init(collapsible, { accordion: true });

    //AUTOPLAY SLIDER
    setInterval(() => M.Carousel.getInstance(carousel[0]).next(), 4500);

    //CUSTOM FUNCTIONS
    const rotateXArrow = (classList, target) => target && classList[2] ? classList.remove('change') : classList.add('change');

    const scrollSmoothTo = event => {
        event.preventDefault();
        hamburgerMenuInstance.isOpen && hamburgerMenuInstance.close();
        const elementToScroll = document.querySelector(event.target.dataset.target);
        elementToScroll.scrollIntoView({ block: 'start', behavior: 'smooth', alignToTop: true });
    }

    const setHeightCarousel = () => {
        const carouselItemActive = document.querySelector('.carousel-item.active');
        const totalPercentaje = 100;
        const maxWidthCarousel = parseFloat(getComputedStyle(carousel[0], null).maxWidth.replace("px", ""));
        const maxHeightCarousel = parseFloat(getComputedStyle(carousel[0], null).maxHeight.replace("px", ""));
        const widthCarouselItemActive = parseFloat(getComputedStyle(carouselItemActive, null).width.replace("px", ""));
        const heightCarousel = widthCarouselItemActive * totalPercentaje / maxWidthCarousel / totalPercentaje * maxHeightCarousel;
        carousel[0].style.height = `${ heightCarousel }px`;
    }

    const resetValues = () => {
        role.forEach(e => e.checked = e.value === 'Directivo');
        name.value = '';
        establishment.value = '';
        email.value = '';
        phone.value = '';
        comment.value = '';
    }

    const setClassField = (target, minLength, type, regex) => {
        const evaluateWay = type === 'email' ? regex.test(target.value.trim()) : !(target.value.length < minLength);
        const className = type === 'textarea' ? 'wrong-textarea' : 'wrong-input';

        !evaluateWay ? target.classList.add(className) : target.classList.remove(className);
    }

    const validateButton = () => {
        const wrongInput = !!form.querySelector('.wrong-input, .wrong-textarea');
        const emptyInput = !!Object.values(form.querySelectorAll('input, textarea')).find(e => !e.value);
        const disabledButton = wrongInput || emptyInput;
        const classes = ['disabled-button', 'hvr-shrink'];

        bottomPage.disabled = disabledButton;
        disabledButton ? bottomPage.classList.add(classes[0]) : bottomPage.classList.remove(classes[0]);
        disabledButton ? bottomPage.classList.remove(classes[1]) : bottomPage.classList.add(classes[1]);
    }

    const checkField = (event, regex) => {
        const { target } = event;
        const { minLength, type, value } = target;

        if (regex && type !== 'email') target.value = value.replace(regex, '');
        if (!target.value.trim().length) return target.value = '';

        setClassField(target, minLength, type, regex);
        validateButton();
    }

    const trimField = (event, regex) => {
        const { target } = event;
        const { minLength, type, value } = target;

        target.value = value.trim();
        setClassField(target, minLength, type, regex);
        validateButton();
    }

    const sendForm = event => {
        event.preventDefault();

        const upperCaseFirstLetterFirstWord = value => value.charAt(0).toUpperCase() + value.slice(1);
        const upperCaseFirstLetterAllWords = value => value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

        const setModalElements = (newValues, title, firstParagraph, secondParagraph) => {
            const dNone = 'd-none';
            modalTitle.textContent = title;
            modalFirstParagraph.textContent = firstParagraph;
            modalsecondParagraph.textContent = secondParagraph;
            newValues ? modalLoading.classList.add(dNone) : modalLoading.classList.remove(dNone);
            newValues ? modalTitle.classList.remove(dNone) : modalTitle.classList.add(dNone);
            newValues ? modalFirstParagraph.classList.remove(dNone) : modalFirstParagraph.classList.add(dNone);
            newValues ? modalsecondParagraph.classList.remove(dNone) : modalsecondParagraph.classList.add(dNone);
            newValues ? modalButtons.classList.remove(dNone) : modalButtons.classList.add(dNone);
        }

        const responseActions = (responseOk, newValues) => {
            const title = responseOk ? 'Enhorabuena!!' : 'Ups!!';
            const firstParagraph = responseOk ? 'Tu solicitud ha sido enviada correctamente.' : 'Parece que tenemos problemas en nuestros servidores.';
            const secondParagraph = responseOk ? 'Muchas gracias por preferir nuestros servicios.' : 'Podrías intentarlo nuevamente.';
            setModalElements(newValues, title, firstParagraph, secondParagraph);
            responseOk && resetValues();
            responseOk && validateButton();
        }

        setModalElements(false, '', '', '');
        modalResponseInstance.open();

        const fields = {
            role: Object.values(role).find(e => e.checked).value,
            name: upperCaseFirstLetterAllWords(name.value),
            establishment: upperCaseFirstLetterAllWords(establishment.value),
            email: email.value,
            phone: phone.value,
            comment: upperCaseFirstLetterFirstWord(comment.value)
        };

        const { action, method } = event.target;

        const options = { 
            method,
            body: JSON.stringify(fields),
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(action, options)
            .then(response => response.json())
            .then(data => responseActions(data.emailSent, true))
            .catch(() => responseActions(false, true));
    }

    //CALL CUSTOM FUNCTIONS
    resetValues();
    setHeightCarousel();

    //EVENTS
    window.onresize = () => window.innerWidth >= 993 && hamburgerMenuInstance.isOpen && hamburgerMenuInstance.close();

    bottomMore.forEach(element => element.parentNode.onclick = event => rotateXArrow(element.classList, event.target));

    scrollSmooth.forEach(element => element.onclick = scrollSmoothTo);

    seeMoreBtn.onclick = () => modalInfoInstance.open();

    form.onsubmit = sendForm;

    name.oninput = event => checkField(event, regexName);
    name.onblur = trimField;

    establishment.oninput = event => checkField(event, regexEstablishment);
    establishment.onblur = trimField;

    email.oninput = event => checkField(event, regexEmail);
    email.onblur = event => trimField(event, regexEmail);

    phone.oninput = event => checkField(event, regexPhone);
    phone.onblur = trimField;

    comment.oninput = checkField;
    comment.onblur = trimField;
});