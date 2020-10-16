// const menuBtn = document.querySelector('.menu-btn');
// const hamburger = document.querySelector('.menu-btn-burger');
// const nav = document.querySelector('.nav');
// const menuNav = document.querySelector('.menu-nav');
// const navItems = document.querySelectorAll('.menu-nav-item');


$(document).ready(()=>{



// Set Session Item firstVisit for once so you can control popup to only happen once

		// EXIT INTENT POPUP //
// sessionStorage.setItem('firstVisit', '1');


console.log('hello');


		// EXIT INTENT POPUP //
// document.addEventListener('mouseout', function(e){
// 	if((!e.toElement && !e.relatedTarget)&&(sessionStorage.getItem('firstVisit')==='1')){
// 		setTimeout(function(){
// 			document.getElementById("home-overlay").style.display = 'block';
// 			sessionStorage.setItem('firstVisit', '2');
// 		},1000)
// 	}
// })

	





$(document).click(function(e){
	if(($('#home-overlay').css('display') == 'block') && ($('#home-overlay').is(e.target))){
		$('#home-overlay').css('display', 'none');
	}
});


$('#closeOverlay').on('click', ()=>{
	document.getElementById('home-overlay').style.display = 'none';
})



})