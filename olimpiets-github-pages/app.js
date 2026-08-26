const plans = {
  1: { title: '1-комнатные', range: '41,47–46,19 м²', areas: ['41,47','42,44','43,95','44,07','44,58','46,19'], image: './images/plans/plan-5.jpg' },
  2: { title: '2-комнатные', range: '60,01–62,29 м²', areas: ['60,01','60,33','61,80','62,29'], image: './images/plans/plan-6.jpg' },
  3: { title: '3-комнатные', range: '65,26–88,99 м²', areas: ['65,26','68,81','77,19','78,30','79,30','80,50','88,99'], image: './images/plans/plan-7.jpg' }
};

document.querySelectorAll('[data-scene-button]').forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.sceneButton;
    document.querySelectorAll('[data-scene]').forEach((image) => image.classList.toggle('isVisible', image.dataset.scene === selected));
    document.querySelectorAll('[data-scene-button]').forEach((item) => item.setAttribute('aria-selected', String(item === button)));
  });
});

let angle = 0;
const angleCards = [...document.querySelectorAll('[data-angle]')];
const angleCount = document.querySelector('[data-angle-count]');
function showAngle(next) {
  angle = (next + angleCards.length) % angleCards.length;
  angleCards.forEach((card, index) => {
    card.style.setProperty('--offset', index - angle);
    card.classList.toggle('active', index === angle);
  });
  angleCount.textContent = `0${angle + 1} / 0${angleCards.length}`;
}
document.querySelector('[data-angle-prev]').addEventListener('click', () => showAngle(angle - 1));
document.querySelector('[data-angle-next]').addEventListener('click', () => showAngle(angle + 1));
const angleStage = document.querySelector('.angleStage');
angleStage.addEventListener('pointermove', (event) => {
  const rect = angleStage.getBoundingClientRect();
  angleStage.style.setProperty('--rx', `${((event.clientY - rect.top) / rect.height - .5) * -5}deg`);
  angleStage.style.setProperty('--ry', `${((event.clientX - rect.left) / rect.width - .5) * 7}deg`);
});
angleStage.addEventListener('pointerleave', () => { angleStage.style.setProperty('--rx', '0deg'); angleStage.style.setProperty('--ry', '0deg'); });

let currentPlan = plans[1];
const title = document.querySelector('[data-plan-title]');
const range = document.querySelector('[data-plan-range]');
const areas = document.querySelector('[data-plan-areas]');
const planImage = document.querySelector('[data-plan-image]');
const modal = document.querySelector('[data-modal]');
const modalImage = document.querySelector('[data-modal-image]');
function renderPlan(roomCount) {
  currentPlan = plans[roomCount];
  title.textContent = currentPlan.title;
  range.textContent = currentPlan.range;
  areas.innerHTML = currentPlan.areas.map((area) => `<span>${area} м²</span>`).join('');
  planImage.src = currentPlan.image;
  modalImage.src = currentPlan.image;
  document.querySelectorAll('[data-rooms]').forEach((tab) => tab.setAttribute('aria-selected', String(tab.dataset.rooms === String(roomCount))));
}
document.querySelectorAll('[data-rooms]').forEach((tab) => tab.addEventListener('click', () => renderPlan(tab.dataset.rooms)));
document.querySelectorAll('[data-plan-open]').forEach((button) => button.addEventListener('click', () => { modal.hidden = false; document.body.style.overflow = 'hidden'; }));
function closeModal() { modal.hidden = true; document.body.style.overflow = ''; }
document.querySelector('[data-modal-close]').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !modal.hidden) closeModal(); });

const form = document.querySelector('[data-contact-form]');
const success = document.querySelector('[data-success]');
form.addEventListener('submit', (event) => { event.preventDefault(); form.hidden = true; success.hidden = false; });
document.querySelector('[data-form-reset]').addEventListener('click', () => { form.reset(); form.hidden = false; success.hidden = true; });
renderPlan(1);
