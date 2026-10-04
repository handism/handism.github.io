import { formatProjectCount } from '../utils/format';

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
  if (motionToggle) motionToggle.disabled = motionQuery.matches;
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
    if (result) result.textContent = formatProjectCount(count);
  }),
);

let opener: HTMLElement | null = null;
const dialogFor = (id: string | undefined) => {
  const dialog = id && document.getElementById(`detail-${id}`);
  return dialog instanceof HTMLDialogElement ? dialog : null;
};
// Each open project gets its own URL hash (e.g. #sauna-simulator) for sharing.
const openProject = (id: string | undefined, from: HTMLElement | null) => {
  const dialog = dialogFor(id);
  if (!dialog || dialog.open) return;
  document
    .querySelectorAll<HTMLDialogElement>('.project-dialog[open]')
    .forEach((other) => other.close());
  opener = from;
  dialog.showModal();
  history.replaceState(null, '', `#${id}`);
};
document.querySelectorAll<HTMLElement>('[data-project]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    // Title and "Explore" are mouse shortcuts; focus returns to the card's visual button.
    const focusTarget =
      trigger instanceof HTMLButtonElement && trigger.tabIndex >= 0
        ? trigger
        : trigger
            .closest('.project')
            ?.querySelector<HTMLElement>('.project-visual');
    openProject(trigger.dataset.project, focusTarget ?? null);
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
      if (location.hash === `#${dialog.id.replace(/^detail-/, '')}`) {
        history.replaceState(null, '', location.pathname + location.search);
      }
      opener?.focus({ preventScroll: true });
      opener = null;
    });
  });
const openFromHash = () => openProject(location.hash.slice(1), null);
window.addEventListener('hashchange', openFromHash);
openFromHash();
