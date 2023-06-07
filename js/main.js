(function () {
  'use strict';

  AOS.init({
    disable: (() => document.documentElement.clientWidth < 1220)()
  });

  // Post Date
  const months=['january','february','march','april','may','june','july','august','september','october','november','december'],monthMin = ['','','','','','','','','','','',''],days = ['sunday','monday','tuesday ','wednesday','thursday','friday ','saturday'],daysMin = ['','','','','','',''],seasons = ['winter','spring','summer','autumn'];function postDate(daysName, daysMinName, monthsName, monthsMinName, seasonsName) {const _counterLength = 60;for (let counter = 0; counter < _counterLength; counter++) {innerDate(counter, 'date-');innerDate(counter, 'date')} function innerDate(counter, dateType) {let newCounter;dateType === 'date-' ? newCounter = -counter : newCounter = counter; const _msInDay = 86400000, _localDate = new Date(Date.now() + (newCounter * _msInDay)), _day = _localDate.getDate(), _month = _localDate.getMonth() + 1, _year = _localDate.getFullYear(); const dayDefault = addZero(_day), monthDefault = addZero(_month), defaultDate = dayDefault + '.' + monthDefault + '.' + _year; const dateClass = dateType + counter, nodeList = document.querySelectorAll('.' + dateClass); for (let i = 0; i < nodeList.length; i++) {const dateFormat = nodeList[i].dataset.format;dateFormat !== undefined && dateFormat !== ''? nodeList[i].innerHTML = String(changeFormat(dayDefault, _month, _year, dateFormat, newCounter)): nodeList[i].innerHTML = defaultDate} } function changeFormat(_day, _month, _year, format, counter) { let innerFormat = format; const testFormat = ["dd","mm","yyyy","monthFull","year"], dateFormat = { dd: _day, mm: addZero(_month), yyyy: _year, monthFull: getMonthName(_month, monthsName, true), year: getYearWithCounter(_year, counter), }; for (let i = 0; i < testFormat.length; i++) { let string = testFormat[i]; let regExp = new RegExp(string); innerFormat = innerFormat.replace(regExp, dateFormat[string]); } return innerFormat.split(' ').join(' ') } function getMonthName(_month, monthsName, bigFirstLetter, counter) { const monthCounter = !!counter ? counter : 0; let month; _month + monthCounter > 12 ? month = monthCounter - (12 - _month) : month = _month + monthCounter; _month + monthCounter <= 0 ? month = 12 + monthCounter + 1 : month = _month + monthCounter; return changeFirstLetter(bigFirstLetter, monthsName[month - 1]) } function getYearWithCounter(year, counter) {return year + counter} function addZero(numb){return numb<10?'0'+numb:numb} function changeFirstLetter(isBig,str){return isBig&&str&&str.length>0?str[0].toUpperCase()+str.slice(1):str} }if (document.body.classList.contains('ev-date')) {document.addEventListener("DOMContentLoaded", function () {postDate(days, daysMin, months, monthMin, seasons)});}

  function main() {
    scrollSmooth();
  } 
  
  // Smooth Scroll
  let scrollSmooth = (function () {
    $(document).on("click", "a[href^=\"#\"]", function (event) {
      event.preventDefault();
      $("html, body").animate({
        scrollTop: $($.attr(this, "href")).offset().top
      }, 500);
    });
  });

  // Burger Menu
  if(document.documentElement.clientWidth < 768) {
    let burgerBtn = document.querySelector('.nav__toggle'),
      navList = document.querySelector('.nav__list');

    burgerBtn.addEventListener('click', function () {
      toggleActive(burgerBtn);
      toggleActive(navList);
      document.querySelector('html').classList.toggle('hidden')
    }); 

    navList.addEventListener('click', function() {
      toggleActive(burgerBtn);
      toggleActive(navList);
      document.querySelector('html').classList.toggle('hidden')
    });
  }


  // Central popup
  const popup = document.querySelector('.popup')
  const popupBtns = document.querySelectorAll('.popup-btn');
  const closeBtn = document.querySelector('.popup__close');

  for(let btn of popupBtns) {
    btn.addEventListener('click', function() {
      popup.classList.add('show')
    })
  }
  closeBtn.addEventListener('click', function() {
    popup.classList.remove('show')
  });

  document.body.addEventListener('mouseleave', function() {
    popup.classList.add('show')
  }, {once: true})

  // Structure Carousel
  $('.structure__list').slick({
    mobileFirst: true,
    responsive: [{
      breakpoint: 767,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    }]
  }); 
  
  // Show/Hide Structure Text
  let structureItems = document.querySelectorAll('.structure__list-item');

  for (let i = 0; i < structureItems.length; ++i) {
    structureItems[i].addEventListener('mouseenter', function () {
      if (!this.classList.contains('active')) {
        for (let j = 0; j < structureItems.length; ++j) {
          structureItems[j].classList.remove('active');
        }

        this.classList.add('active');
      }
    });
  } 
  
  // Reviews Carousel
  $('.reviews__list').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }]
  }); 
  
  // Show/Hide Reviews Text
  let reviewsBtns = document.querySelectorAll('.reviews__list-btn'),
      reviewsText = document.querySelectorAll('.reviews__list-text'),
      slideBtns = document.querySelectorAll('.reviews .slick-arrow');

  for (let i = 0; i < reviewsBtns.length; ++i) {
    reviewsBtns[i].addEventListener('click', function () {
      toggleActive(this.previousElementSibling);
      checkSymbol(this);
    });
  }
  
  // Hide Text after slide
  for (let i = 0; i < slideBtns.length; ++i) {
    slideBtns[i].addEventListener('click', function() {
      for(let j = 0; j < reviewsBtns.length; ++j) {
        if (reviewsBtns[j].previousElementSibling.classList.contains('active')) {
          toggleActive(reviewsBtns[j].previousElementSibling);
          checkSymbol(reviewsBtns[j]);
        }
      }

    });
  }
  
  // Toggle Active
  function toggleActive(elem) {
    if (elem.classList.contains('active')) {
      elem.classList.remove('active');
    } else {
      elem.classList.add('active');
    }
  } 
  
  // Check Symbol
  function checkSymbol(elem) {
    if (elem.innerHTML == '+') {
      elem.innerHTML = '-';
    } else {
      elem.innerHTML = '+';
    }
  } 
  
  // Lazy Loading
  if (document.documentElement.clientWidth < 480) {
    window.addEventListener('scroll', function () {
      return setTimeout(main, 1000);
    }, {
      once: true
    });
  } else {
    main();
  }

}());