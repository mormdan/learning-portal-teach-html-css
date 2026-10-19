// Lab checker. Renders the learner's code in a sandboxed, script-free iframe,
// then runs each task's test against the live DOM and computed styles.
(function () {
  'use strict';

  function loadInFrame(code) {
    return new Promise((resolve, reject) => {
      const frame = document.createElement('iframe');
      // allow-same-origin lets us read the DOM. No allow-scripts, so learner code never runs.
      frame.setAttribute('sandbox', 'allow-same-origin');
      frame.setAttribute('aria-hidden', 'true');
      frame.style.cssText = 'position:absolute;left:-10000px;top:0;width:900px;height:700px;border:0;';

      const cleanup = () => { clearTimeout(timer); frame.remove(); };
      const timer = setTimeout(() => { cleanup(); reject(new Error('Preview timed out')); }, 5000);

      frame.onload = () => {
        clearTimeout(timer);
        resolve({ doc: frame.contentDocument, win: frame.contentWindow, cleanup });
      };
      document.body.appendChild(frame);
      frame.srcdoc = code;
    });
  }

  async function runChecks(code, tasks) {
    const env = await loadInFrame(code);
    try {
      return tasks.map(task => {
        let passed = false;
        try {
          passed = Boolean(task.test(env.doc, env.win));
        } catch (err) {
          passed = false; // a broken test or missing element counts as a failed task
        }
        return { text: task.text, passed };
      });
    } finally {
      env.cleanup();
    }
  }

  window.LabChecker = { runChecks };
})();
