$(document).ready(function(){
let navBtn = document.getElementsByClassName('header__nav')[0];
	navBtn.addEventListener('click', () => {
		navBtn.classList.toggle('active');
	});


		$(".header__nav").click(function(){
		$('.header__content').toggle('active');
	});




   let nxtBtn = document.getElementById("btn-next");
   let btnPrev = document.getElementById("btn-prev");
   
   nxtBtn.addEventListener("click",onShowNextBtnClick);
   btnPrev.addEventListener("click",onShowPrevBtnClick);
   
   var slides = document.getElementsByClassName('slide');
   for(var i=0; i<slides.length; i++) {
      slides[i].style.zIndex = slides.length - i;
   }
   function onShowPrevBtnClick(){
       var activeEl = document.querySelector('.active');
       if(activeEl.previousElementSibling) {
          activeEl.previousElementSibling.style.left = "0%";
          activeEl.classList.remove('active');
          activeEl.previousElementSibling.classList.add('active');
       }
   }
   function onShowNextBtnClick(){
       let activeEl = document.querySelector('.active');
       if(activeEl.nextElementSibling) {
          activeEl.style.left = "-100%";
          activeEl.classList.remove('active');
          activeEl.nextElementSibling.classList.add('active');
       }
   }

   $(".touch__btn").hover(
      function(){
      $(this).addClass('touch__btn--hover');
      $(this).removeClass('touch__btn'); 
   },
      function(){ 
         $(this).removeClass('touch__btn--hover');
         $(this).addClass('touch__btn'); 
      }
  );


      
    
});

