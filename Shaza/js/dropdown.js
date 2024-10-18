const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector('.select');
  const caret = dropdown.querySelector('.caret');
  const menu = dropdown.querySelector('.menu');
  const options = dropdown.querySelectorAll('.menu li');
  const selected = dropdown.querySelector('.selected');

  select.addEventListener('click', () => {
    menu.classList.toggle('menu-open'); // Toggle the menu-open class to expand or collapse the menu
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      selected.innerText = option.innerText;
      menu.classList.remove('menu-open'); // Close the menu after selecting an option
      select.classList.remove('select-clicked');
      caret.classList.remove('caret-rotate');

      options.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
    });
  });
});
