// Project filter: show cards whose data-cat matches the pressed button.
const buttons = document.querySelectorAll('.filters button');
const items = document.querySelectorAll('.work [data-cat]');

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    items.forEach((el) => {
      const cat = el.dataset.cat;
      el.classList.toggle('hide', f !== 'all' && cat !== f && cat !== 'all');
    });
  });
});
