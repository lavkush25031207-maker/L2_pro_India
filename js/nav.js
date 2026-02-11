
document.getElementById('con-menu').addEventListener('click', function() {
    const contentBar = document.querySelector('.content-bar');
    const introVideo = document.querySelector('.intro-video');
    const content = document.querySelector('.content');
    
    contentBar.classList.toggle('collapsed');
    introVideo.classList.toggle('collapsed');

});



