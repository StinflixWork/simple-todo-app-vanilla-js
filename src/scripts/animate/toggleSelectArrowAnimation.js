export function toggleSelectArrowAnimation() {
  const selectElement = document.getElementById('filter-note');
  const icon = document.querySelector('.select__icon');

  selectElement.addEventListener('click', () => {
    icon.classList.toggle('rotated');
  });
}
