// const menuBtn = document.querySelector('.menu-btn');
// const hamburger = document.querySelector('.menu-btn-burger');
// const nav = document.querySelector('.nav');
// const menuNav = document.querySelector('.menu-nav');
// const navItems = document.querySelectorAll('.menu-nav-item');


console.log('hello');
document.addEventListener('mouseout', function(e){
	if(!e.toElement && !e.relatedTarget){
		console.log('where are you going?')
	}
})