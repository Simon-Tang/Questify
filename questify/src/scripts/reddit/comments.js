// Add info icon to sidebar
const linkInfo = document.querySelector('.linkinfo');
if (linkInfo) {
  linkInfo.prepend(createElement({ classList: ['info-icon'] }));
}
