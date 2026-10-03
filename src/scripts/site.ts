export {};

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionToggle =
  document.querySelector<HTMLButtonElement>('.motion-toggle');
let manualPause = false;
const syncMotion = () => {
  const paused = manualPause || motionQuery.matches;
  document.body.classList.toggle('motion-paused', paused);
  motionToggle?.setAttribute('aria-pressed', String(paused));
  motionToggle?.setAttribute(
    'aria-label',
    paused
      ? motionQuery.matches
        ? '端末設定により動きを停止中'
        : '動きを再開'
      : '動きを停止',
  );
  if (motionToggle) {
    motionToggle.textContent = paused ? '▷' : 'Ⅱ';
    motionToggle.disabled = motionQuery.matches;
  }
};
motionToggle?.addEventListener('click', () => {
  manualPause = !manualPause;
  syncMotion();
});
motionQuery.addEventListener('change', syncMotion);
syncMotion();

if ('IntersectionObserver' in window) {
  document.body.classList.add('js-motion');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  document
    .querySelectorAll('.reveal')
    .forEach((element) => observer.observe(element));
}

const projects = [...document.querySelectorAll<HTMLElement>('.project')];
const filters = [
  ...document.querySelectorAll<HTMLButtonElement>('[data-filter]'),
];
filters.forEach((button) =>
  button.addEventListener('click', () => {
    filters.forEach((filter) =>
      filter.setAttribute('aria-pressed', String(filter === button)),
    );
    let count = 0;
    projects.forEach((project) => {
      const show =
        button.dataset.filter === 'All' ||
        project.dataset.category === button.dataset.filter;
      project.hidden = !show;
      if (show) {
        count++;
        project.classList.add('visible');
      }
    });
    const result = document.querySelector('.result-count');
    if (result)
      result.textContent = `${count} PROJECT${count === 1 ? '' : 'S'}`;
  }),
);

let opener: HTMLElement | null = null;
document
  .querySelectorAll<HTMLButtonElement>('[data-project]')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const dialog = document.getElementById(
        `detail-${button.dataset.project}`,
      );
      if (dialog instanceof HTMLDialogElement) {
        opener = button;
        dialog.showModal();
      }
    });
  });
document
  .querySelectorAll<HTMLDialogElement>('.project-dialog')
  .forEach((dialog) => {
    dialog
      .querySelector('.dialog-close')
      ?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => {
      opener?.focus({ preventScroll: true });
      opener = null;
    });
  });
