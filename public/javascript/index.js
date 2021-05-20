function click() {
  let copyText = document.getElementById("shortUrl");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  document.execCommand("copy");

  /* Alert the copied text */
  copyText.title = 'Copied!';
}