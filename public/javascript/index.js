const button = document.querySelector('.copy')
const copyText = document.getElementById('shortUrl');

button.addEventListener('click', () => {
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  document.execCommand('copy');
  copyText.title = 'Copied!';
})