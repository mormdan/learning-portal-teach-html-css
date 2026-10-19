(function () {
  'use strict';

  const STORE_KEY = 'htmlcss-lab-progress-v1';
  const app = document.getElementById('app');
  const esc = s => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  // ---------- progress ----------
  let progress = load();
  function load() {
    try {
      return Object.assign({ quizzes: {}, labs: {} }, JSON.parse(localStorage.getItem(STORE_KEY)));
    } catch (e) {
      return { quizzes: {}, labs: {} };
    }
  }
  function save() { localStorage.setItem(STORE_KEY, JSON.stringify(progress)); }
  function statusOf(id) {
    if (progress.labs[id]) return '✔ Lab passed';
    if (progress.quizzes[id]) return 'Quiz done';
    return 'Not started';
  }

  // ---------- routing ----------
  function route() {
    const [page, id] = location.hash.replace(/^#\/?/, '').split('/');
    if (page === 'lesson') renderLesson(id);
    else if (page === 'playground') renderPlayground();
    else renderHome();
    window.scrollTo(0, 0);
  }

  // ---------- pages ----------
  function renderHome() {
    const done = LESSONS.filter(l => progress.labs[l.id]).length;
    const pct = Math.round((done / LESSONS.length) * 100);
    app.innerHTML = `
      <section class="panel">
        <h1>Learn HTML &amp; CSS by building things</h1>
        <p class="muted">Read a short idea, experiment with live code, answer a quick quiz, then pass a lab that checks your work.</p>
        <div class="progress"><div style="width:${pct}%"></div></div>
        <p class="muted">${done} of ${LESSONS.length} labs passed</p>
      </section>
      <section class="grid-cards">
        ${LESSONS.map((l, i) => `
          <a class="card-link" href="#/lesson/${l.id}">
            <span class="badge">${esc(l.module)}</span>
            <h3>${i + 1}. ${esc(l.title)}</h3>
            <p>${esc(l.summary)}</p>
            <span class="status">${statusOf(l.id)}</span>
          </a>`).join('')}
      </section>`;
  }

  function renderLesson(id) {
    const idx = LESSONS.findIndex(l => l.id === id);
    if (idx === -1) return renderHome();
    const lesson = LESSONS[idx];
    const lab = lesson.lab;
    const prev = LESSONS[idx - 1];
    const next = LESSONS[idx + 1];

    app.innerHTML = `
      <article class="lesson">
        <p class="crumb"><a href="#/">Course</a> · ${esc(lesson.module)} · Lesson ${idx + 1} of ${LESSONS.length}</p>
        <h1>${esc(lesson.title)}</h1>

        <section class="panel">
          <h2>1 · Learn</h2>
          ${lesson.concepts}
        </section>

        <section class="panel">
          <h2>2 · Try it</h2>
          <p class="muted">Change the code. The preview updates as you type. Tab inserts two spaces.</p>
          ${editorHTML('try', lesson.example)}
        </section>

        <section class="panel">
          <h2>3 · Quick quiz</h2>
          ${quizHTML(lesson)}
        </section>

        <section class="panel">
          <h2>4 · Lab: ${esc(lab.title)}</h2>
          <p>${lab.brief}</p>
          ${editorHTML('lab', lab.starter)}
          <div class="toolbar"><button id="check-lab" type="button">Check my work</button></div>
          <div id="lab-tasks">${lab.tasks.map(t => taskHTML(t.text, null)).join('')}</div>
          <div id="lab-banner"></div>
        </section>

        <nav class="pager">
          ${prev ? `<a href="#/lesson/${prev.id}">← ${esc(prev.title)}</a>` : '<span></span>'}
          ${next ? `<a href="#/lesson/${next.id}">${esc(next.title)} →</a>` : '<span></span>'}
        </nav>
      </article>`;

    bindEditor('try', lesson.example);
    bindEditor('lab', lab.starter);
    bindQuiz(lesson);
    bindLab(lesson);
  }

  function renderPlayground() {
    const starter = `<!-- Experiment freely. Nothing here is graded. -->
<h2>Playground</h2>
<p style="color: teal;">Change this text or add new elements.</p>`;
    app.innerHTML = `
      <section class="panel">
        <h2>Playground</h2>
        <p class="muted">Free-form HTML and CSS. Scripts are disabled in the preview for safety.</p>
        ${editorHTML('pg', starter)}
      </section>`;
    bindEditor('pg', starter);
  }

  // ---------- editor ----------
  function editorHTML(prefix, code) {
    return `
      <div class="toolbar">
        <button type="button" class="secondary" data-reset="${prefix}">Reset code</button>
      </div>
      <div class="editor">
        <textarea id="${prefix}-code" spellcheck="false" aria-label="Code editor">${esc(code)}</textarea>
        <iframe id="${prefix}-preview" sandbox="allow-same-origin" title="Live preview"></iframe>
      </div>`;
  }

  function bindEditor(prefix, original) {
    const ta = document.getElementById(prefix + '-code');
    const frame = document.getElementById(prefix + '-preview');
    let timer = null;
    const render = () => { frame.srcdoc = ta.value; };

    ta.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(render, 250);
    });
    ta.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      e.preventDefault();
      ta.setRangeText('  ', ta.selectionStart, ta.selectionEnd, 'end');
      ta.dispatchEvent(new Event('input'));
    });
    document.querySelector(`[data-reset="${prefix}"]`).addEventListener('click', () => {
      ta.value = original;
      render();
    });
    render();
  }

  // ---------- quiz ----------
  function quizHTML(lesson) {
    return `
      ${lesson.quiz.map((q, qi) => `
        <fieldset class="quiz">
          <legend>${esc(q.q)}</legend>
          ${q.options.map((o, oi) => `
            <label><input type="radio" name="${lesson.id}-q${qi}" value="${oi}"> ${esc(o)}</label>`).join('')}
        </fieldset>`).join('')}
      <button type="button" id="check-quiz">Check answers</button>
      <div id="quiz-result" class="result"></div>`;
  }

  function bindQuiz(lesson) {
    document.getElementById('check-quiz').addEventListener('click', () => {
      let correct = 0;
      const lines = lesson.quiz.map((q, qi) => {
        const picked = document.querySelector(`input[name="${lesson.id}-q${qi}"]:checked`);
        const ok = !!picked && Number(picked.value) === q.answer;
        if (ok) correct++;
        const msg = !picked ? 'Not answered' : ok ? 'Correct' : 'Not quite';
        return `<p class="${ok ? 'ok' : 'bad'}"><strong>${msg}.</strong> ${esc(q.why)}</p>`;
      });
      document.getElementById('quiz-result').innerHTML =
        `<p><strong>${correct} / ${lesson.quiz.length} correct</strong></p>` + lines.join('');
      if (correct === lesson.quiz.length) {
        progress.quizzes[lesson.id] = true;
        save();
      }
    });
  }

  // ---------- lab ----------
  function taskHTML(text, passed) {
    const mark = passed === null ? '○' : passed ? '<span class="ok">✔</span>' : '<span class="bad">✖</span>';
    return `<div class="task">${mark} ${esc(text)}</div>`;
  }

  function bindLab(lesson) {
    const btn = document.getElementById('check-lab');
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      btn.textContent = 'Checking…';
      try {
        const code = document.getElementById('lab-code').value;
        const results = await LabChecker.runChecks(code, lesson.lab.tasks);
        document.getElementById('lab-tasks').innerHTML =
          results.map(r => taskHTML(r.text, r.passed)).join('');

        if (results.every(r => r.passed)) {
          progress.labs[lesson.id] = true;
          save();
          const next = LESSONS[LESSONS.indexOf(lesson) + 1];
          document.getElementById('lab-banner').innerHTML = `
            <div class="banner"><strong>Lab passed!</strong>
              ${next ? `<a href="#/lesson/${next.id}">Continue: ${esc(next.title)} →</a>` : 'You finished the course.'}
            </div>`;
        }
      } catch (err) {
        document.getElementById('lab-banner').innerHTML =
          `<div class="banner bad">The checker could not run: ${esc(err.message)}</div>`;
      } finally {
        btn.disabled = false;
        btn.textContent = 'Check my work';
      }
    });
  }

  // ---------- global ----------
  document.getElementById('reset-progress').addEventListener('click', () => {
    if (!confirm('Reset all quiz and lab progress in this browser?')) return;
    progress = { quizzes: {}, labs: {} };
    save();
    route();
  });

  window.addEventListener('hashchange', route);
  route();
})();
