// const menuBtn = document.querySelector('.menu-btn');
// const hamburger = document.querySelector('.menu-btn-burger');
// const nav = document.querySelector('.nav');
// const menuNav = document.querySelector('.menu-nav');
// const navItems = document.querySelectorAll('.menu-nav-item');


$(document).ready(()=>{

// Set Session Item firstVisit for once so you can control popup to only happen once
sessionStorage.setItem('firstVisit', '1');


console.log('hello');
document.addEventListener('mouseout', function(e){
	if((!e.toElement && !e.relatedTarget)&&(sessionStorage.getItem('firstVisit')==='1')){
		document.getElementById("home-overlay").style.display = 'block';
		sessionStorage.setItem('firstVisit', '2');
	}
})




$('#closeOverlay').on('click', ()=>{
	document.getElementById('home-overlay').style.display = 'none';
})


})