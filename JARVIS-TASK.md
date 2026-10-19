# now create a web based learning portal that teach html and css with interactive…

> now create a web based learning portal that teach html and css with interactive way and labs

I built this as a static site: no build step, no backend, and no dependencies beyond a browser. It goes in a project folder named `html-css-learning-lab`, with a matching GitHub repo and a GitHub Pages deploy workflow.

**Limits of this session:** I can't create folders, read `utilities\mygithub.txt`, or create the GitHub repo from here. The files below are ready to save, and the setup steps show how to create the repo. I haven't run this code in a browser, so please test it before relying on it.

**Project layout** (root: `Requests Projects\html-css-learning-lab\`)

```
html-css-learning-lab/
├── index.html
├── css/style.css
├── js/lessons.js        <- all course content (add lessons here)
├── js/checker.js        <- lab checker
├── js/app.js            <- router, editor, quizzes, progress
├── scripts/create-repo.ps1
├── .github/workflows/pages.yml
└── README.md
```

File: index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML &amp; CSS Lab: Learn by Doing</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="topbar">
    <a href="#/" class="brand">&lt;/&gt; HTML &amp; CSS Lab</a>
    <nav>
      <a href="#/">Course</a>
      <a href="#/playground">Playground</a>
      <button id="reset-progress" class="link-btn" type="button">Reset progress</button>
    </nav>
  </header>

  <main id="app"></main>

  <footer class="footer">Progress is saved in this browser only (localStorage).</footer>

  <script src="js/lessons.js"></script>
  <script src="js/checker.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
```

File: css/style.css
```css
:root {
  --bg: #0f172a;
  --panel: #111c33;
  --line: #22314f;
  --text: #e2e8f0;
  --muted: #94a3b8;
  --accent: #38bdf8;
  --ok: #22c55e;
  --bad: #f43f5e;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  line-height: 1.6;
  background: var(--bg);
  color: var(--text);
}

a { color: var(--accent); }

.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background: #0b1224;
  border-bottom: 1px solid var(--line);
}
.brand {
  font-family: ui-monospace, Consolas, monospace;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
}
.topbar nav { display: flex; gap: 16px; align-items: center; }
.topbar nav a { text-decoration: none; }
.link-btn { background: none; border: 0; color: var(--muted); cursor: pointer; font: inherit; }

main {
  flex: 1;
  width: min(1100px, 100% - 32px);
  margin: 24px auto;
}

.footer { text-align: center; color: var(--muted); font-size: 13px; padding: 16px; }
.muted { color: var(--muted); }

.progress {
  height: 10px;
  background: var(--line);
  border-radius: 99px;
  overflow: hidden;
  margin: 12px 0 4px;
}
.progress > div {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--ok));
  transition: width 0.4s;
}

.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  margin-top: 24px;
}
.card-link {
  display: block;
  padding: 18px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 12px;
  color: inherit;
  text-decoration: none;
  transition: transform 0.15s, border-color 0.15s;
}
.card-link:hover { transform: translateY(-3px); border-color: var(--accent); }
.card-link h3 { margin: 8px 0; }
.card-link p { margin: 0 0 8px; font-size: 14px; color: var(--muted); }
.badge { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); }
.status { font-size: 13px; color: var(--muted); }

.panel {
  margin-bottom: 20px;
  padding: 20px 24px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 12px;
}
.panel h2 { margin-top: 0; font-size: 20px; }
.crumb { color: var(--muted); font-size: 14px; }

pre {
  padding: 12px;
  overflow: auto;
  background: #0b1224;
  border: 1px solid var(--line);
  border-radius: 8px;
}
code { font-family: ui-monospace, Consolas, monospace; font-size: 0.92em; color: #7dd3fc; }
pre code { color: var(--text); }

.editor { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.editor textarea {
  width: 100%;
  min-height: 280px;
  padding: 12px;
  font-family: ui-monospace, Consolas, monospace;
  font-size: 14px;
  color: var(--text);
  background: #0b1224;
  border: 1px solid var(--line);
  border-radius: 8px;
  resize: vertical;
}
.editor iframe {
  width: 100%;
  min-height: 280px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 8px;
}

.toolbar { display: flex; gap: 8px; margin: 8px 0; }
button {
  padding: 8px 14px;
  font-weight: 600;
  color: #06121f;
  background: var(--accent);
  border: 0;
  border-radius: 8px;
  cursor: pointer;
}
button:disabled { opacity: 0.6; cursor: wait; }
button.secondary { color: var(--text); background: var(--line); }

.quiz {
  margin: 0 0 12px;
  padding: 12px 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
}
.quiz legend { padding: 0 6px; font-weight: 600; }
.quiz label { display: block; padding: 4px 0; cursor: pointer; }
.result { margin-top: 12px; }
.result p { margin: 6px 0; }

.ok { color: var(--ok); }
.bad { color: var(--bad); }
.task { padding: 6px 0; }

.banner {
  margin-top: 12px;
  padding: 12px 16px;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid var(--ok);
  border-radius: 8px;
}

.pager { display: flex; justify-content: space-between; margin: 8px 0 32px; }

@media (max-width: 760px) {
  .editor { grid-template-columns: 1fr; }
  .topbar { flex-direction: column; gap: 8px; }
}
```

File: js/lessons.js
```javascript
// Course content. Each lesson has:
//   concepts : trusted HTML shown in "Learn"
//   example  : starter code for "Try it"
//   quiz     : multiple-choice questions (answer = index of correct option)
//   lab      : starter code + tasks; each task.test(doc, win) returns true/false
(function () {
  'use strict';

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const pre = s => `<pre><code>${esc(s)}</code></pre>`;

  window.LESSONS = [
    {
      id: 'html-structure',
      module: 'HTML',
      title: 'Page structure and text',
      summary: 'Doctype, head, body, headings and paragraphs.',
      concepts: `
        <p>HTML is built from <strong>elements</strong>. Most elements have an opening tag, content, and a closing tag. Every page shares the same skeleton:</p>
        ${pre(`<!DOCTYPE html>
<html lang="en">
  <head>   <!-- invisible settings, such as the title -->
  <body>   <!-- everything visible on the page -->
</html>`)}
        <ul>
          <li><code>&lt;!DOCTYPE html&gt;</code> tells the browser this is an HTML5 document.</li>
          <li><code>&lt;head&gt;</code> holds metadata, including the <code>&lt;title&gt;</code> shown in the browser tab.</li>
          <li><code>&lt;body&gt;</code> holds the visible content.</li>
        </ul>
        <p>Headings run from <code>&lt;h1&gt;</code> (most important) to <code>&lt;h6&gt;</code>. Use one <code>&lt;h1&gt;</code> per page. Paragraphs use <code>&lt;p&gt;</code>.</p>`,
      example: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Page</title>
</head>
<body>
  <h1>Hello, world!</h1>
  <p>This is a paragraph. Change the text and watch the preview.</p>
</body>
</html>`,
      quiz: [
        {
          q: 'Which element holds the visible content of the page?',
          options: ['<head>', '<body>', '<meta>', '<title>'],
          answer: 1,
          why: '<body> holds everything the visitor sees. <head> holds invisible metadata.'
        },
        {
          q: 'What does <!DOCTYPE html> do?',
          options: ['Makes text bold', 'Tells the browser this is an HTML5 document', 'Links a stylesheet', 'Sets the page title'],
          answer: 1,
          why: 'The doctype selects standards mode and identifies the document as HTML5.'
        }
      ],
      lab: {
        title: 'Build a page from scratch',
        brief: 'Write a complete page that has: a doctype, a <code>lang</code> attribute on <code>&lt;html&gt;</code>, an <code>&lt;h1&gt;</code> whose text is exactly <code>My First Page</code>, and at least two <code>&lt;p&gt;</code> paragraphs.',
        starter: `<!-- Build your page here. Start with the doctype. -->
`,
        tasks: [
          { text: 'Starts with <!DOCTYPE html>', test: doc => !!doc.doctype && doc.doctype.name === 'html' },
          { text: '<html> has a lang attribute', test: doc => doc.documentElement.hasAttribute('lang') && doc.documentElement.lang.trim() !== '' },
          { text: 'An <h1> reads exactly "My First Page"', test: doc => { const h = doc.querySelector('h1'); return !!h && h.textContent.trim() === 'My First Page'; } },
          { text: 'At least two <p> paragraphs', test: doc => doc.querySelectorAll('p').length >= 2 }
        ]
      }
    },

    {
      id: 'html-links-images',
      module: 'HTML',
      title: 'Links and images',
      summary: 'Connect pages with <a> and show pictures with <img>.',
      concepts: `
        <p>A link is an <code>&lt;a&gt;</code> element. Its <code>href</code> attribute is the destination:</p>
        ${pre('<a href="https://example.com">Visit example</a>')}
        <p>An image is an <code>&lt;img&gt;</code> element. It has no closing tag. <code>src</code> is the file or URL, and <code>alt</code> describes the image for screen readers and for when the image fails to load:</p>
        ${pre('<img src="photo.jpg" alt="A cat asleep on a sofa">')}
        <p>Links that open in a new tab should use <code>target="_blank" rel="noopener"</code>. The <code>rel</code> part stops the new page from controlling your page.</p>`,
      example: `<h1>Find me online</h1>
<p>Read the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener">MDN HTML guide</a>.</p>
<img src="https://placehold.co/300x120" alt="A grey placeholder box">`,
      quiz: [
        {
          q: 'Which attribute sets where a link goes?',
          options: ['src', 'href', 'link', 'url'],
          answer: 1,
          why: 'href is the hypertext reference. src is used by images, scripts and media.'
        },
        {
          q: 'Why should every meaningful image have alt text?',
          options: ['It makes the image bigger', 'Screen readers and fallback text can describe it', 'PNG files require it', 'It adds a caption under the image'],
          answer: 1,
          why: 'alt text is read aloud by assistive technology and shown if the image cannot load.'
        }
      ],
      lab: {
        title: 'Links and an image',
        brief: 'Add a link to an <code>https://</code> address with visible text, an image with a non-empty <code>alt</code>, and one link that opens in a new tab with <code>rel="noopener"</code>.',
        starter: `<!-- Add your link and image below. -->
`,
        tasks: [
          { text: 'A link whose href starts with https:// and has visible text', test: doc => [...doc.querySelectorAll('a[href^="https://"]')].some(a => a.textContent.trim() !== '') },
          { text: 'An <img> with a src and a non-empty alt', test: doc => [...doc.querySelectorAll('img[src]')].some(i => (i.getAttribute('alt') || '').trim() !== '') },
          { text: 'A link with target="_blank" and rel="noopener"', test: doc => !!doc.querySelector('a[target="_blank"][rel~="noopener"]') }
        ]
      }
    },

    {
      id: 'html-lists-tables',
      module: 'HTML',
      title: 'Lists and tables',
      summary: 'Unordered and ordered lists, plus tables with headers.',
      concepts: `
        <p>Use <code>&lt;ul&gt;</code> for a bulleted list and <code>&lt;ol&gt;</code> for a numbered one. Each item is an <code>&lt;li&gt;</code>:</p>
        ${pre(`<ul>
  <li>Eggs</li>
  <li>Milk</li>
</ul>`)}
        <p>Tables show data in rows and columns. <code>&lt;tr&gt;</code> is a row, <code>&lt;th&gt;</code> is a header cell, and <code>&lt;td&gt;</code> is a data cell:</p>
        ${pre(`<table>
  <thead>
    <tr><th>Day</th><th>Hours</th></tr>
  </thead>
  <tbody>
    <tr><td>Mon</td><td>2</td></tr>
  </tbody>
</table>`)}`,
      example: `<h2>Shopping list</h2>
<ul>
  <li>Eggs</li>
  <li>Milk</li>
</ul>

<h2>Top scores</h2>
<ol>
  <li>Ana: 980</li>
  <li>Ben: 870</li>
</ol>

<table>
  <caption>Week 1</caption>
  <thead><tr><th>Day</th><th>Hours</th></tr></thead>
  <tbody>
    <tr><td>Mon</td><td>2</td></tr>
    <tr><td>Tue</td><td>3</td></tr>
  </tbody>
</table>`,
      quiz: [
        {
          q: 'Which tag creates one item in a list?',
          options: ['<item>', '<li>', '<list>', '<ul-item>'],
          answer: 1,
          why: 'li stands for list item. It goes inside ul or ol.'
        },
        {
          q: 'Which element groups the header row of a table?',
          options: ['<thead>', '<tfoot>', '<caption>', '<header>'],
          answer: 0,
          why: 'thead groups header rows. tfoot is for footer rows and caption gives the table a title.'
        }
      ],
      lab: {
        title: 'A timetable',
        brief: 'Create an unordered list with at least 3 items, an ordered list with at least 2 items, and a table with a <code>thead</code> containing at least 3 <code>th</code> cells and at least 2 data rows in <code>tbody</code>.',
        starter: `<!-- Build your lists and table below. -->
`,
        tasks: [
          { text: 'A <ul> with at least 3 <li> items', test: doc => doc.querySelectorAll('ul > li').length >= 3 },
          { text: 'An <ol> with at least 2 <li> items', test: doc => doc.querySelectorAll('ol > li').length >= 2 },
          { text: 'A table <thead> with at least 3 <th> cells', test: doc => doc.querySelectorAll('table thead th').length >= 3 },
          { text: 'At least 2 data rows in <tbody>', test: doc => doc.querySelectorAll('table tbody tr').length >= 2 }
        ]
      }
    },

    {
      id: 'html-forms',
      module: 'HTML',
      title: 'Forms',
      summary: 'Inputs, labels, dropdowns and buttons that collect data.',
      concepts: `
        <p>A <code>&lt;form&gt;</code> groups inputs. Each input should have a <code>&lt;label&gt;</code>. Connect them with matching <code>for</code> and <code>id</code> values, so clicking the label focuses the input:</p>
        ${pre(`<form action="/signup" method="post">
  <label for="email">Email</label>
  <input id="email" type="email" name="email" required>
  <button type="submit">Sign up</button>
</form>`)}
        <ul>
          <li><code>type="email"</code> checks the format. <code>required</code> blocks empty submissions.</li>
          <li><code>&lt;select&gt;</code> with <code>&lt;option&gt;</code> children makes a dropdown.</li>
          <li><code>type="submit"</code> sends the form.</li>
        </ul>`,
      example: `<form action="#" method="post">
  <label for="name">Name</label>
  <input id="name" type="text" name="name" required>

  <label for="email">Email</label>
  <input id="email" type="email" name="email" required>

  <label for="plan">Plan</label>
  <select id="plan" name="plan">
    <option value="free">Free</option>
    <option value="pro">Pro</option>
  </select>

  <button type="submit">Sign up</button>
</form>`,
      quiz: [
        {
          q: 'Why connect <label for="x"> to an input with id="x"?',
          options: [
            'Clicking the label focuses the input, and screen readers announce it',
            'It changes the input color',
            'It is required before the form can be submitted',
            'It hides the input'
          ],
          answer: 0,
          why: 'Labels improve usability and accessibility. The for/id pair links them.'
        },
        {
          q: 'Which input type checks for a valid email format?',
          options: ['type="text"', 'type="email"', 'type="mail"', 'type="address"'],
          answer: 1,
          why: 'type="email" is a real HTML input type and validates the format in the browser.'
        }
      ],
      lab: {
        title: 'A contact form',
        brief: 'Build a form with an <code>action</code>, a required email input, a labelled input (the label must use <code>for</code> to point at the input), a select with at least 2 options, and a submit button.',
        starter: `<!-- Build your contact form below. -->
`,
        tasks: [
          { text: 'A <form> with an action attribute', test: doc => !!doc.querySelector('form[action]') },
          { text: 'A required input of type="email"', test: doc => !!doc.querySelector('input[type="email"][required]') },
          { text: 'A <label for="..."> that points at a real form control', test: doc => [...doc.querySelectorAll('label[for]')].some(l => { const t = doc.getElementById(l.htmlFor); return !!t && /^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName); }) },
          { text: 'A <select> with at least 2 <option> elements', test: doc => doc.querySelectorAll('select option').length >= 2 },
          { text: 'A submit button inside the form', test: doc => !!doc.querySelector('form button[type="submit"], form input[type="submit"]') }
        ]
      }
    },

    {
      id: 'css-basics',
      module: 'CSS',
      title: 'Selectors, colors and text',
      summary: 'Target elements with selectors and style them with properties.',
      concepts: `
        <p>CSS is a list of <strong>rules</strong>. Each rule has a selector (what to style) and declarations (how to style it):</p>
        ${pre(`selector {
  property: value;
}

h1 { color: #1e6fd9; }`)}
        <ul>
          <li><code>h1</code> selects by element name.</li>
          <li><code>.card</code> selects by class. Reuse it on many elements.</li>
          <li><code>#intro</code> selects by id. Each id should appear once per page.</li>
        </ul>
        <p>Common properties: <code>color</code> (text), <code>background-color</code>, <code>font-size</code>, <code>font-family</code>, <code>line-height</code>. Put CSS inside a <code>&lt;style&gt;</code> element in the head.</p>`,
      example: `<style>
  body { font-family: Arial, sans-serif; background: #f4f6f8; }
  h1 { color: #1e6fd9; }
  #intro { font-size: 20px; }
  .card { background: white; border: 1px solid #ccc; padding: 16px; border-radius: 8px; }
</style>
<h1>Hello CSS</h1>
<p id="intro">This paragraph uses an id selector.</p>
<div class="card">This is a card, styled with a class.</div>`,
      quiz: [
        {
          q: 'Which selector targets <p id="intro">?',
          options: ['.intro', '#intro', 'intro', '*intro'],
          answer: 1,
          why: 'The hash symbol selects by id. A dot selects by class.'
        },
        {
          q: 'Which property changes text color?',
          options: ['background', 'color', 'font-style', 'text-indent'],
          answer: 1,
          why: 'color sets the text color. background-color sets the background.'
        }
      ],
      lab: {
        title: 'Style the page',
        brief: 'Using the <code>&lt;style&gt;</code> block, give the <code>h1</code> a color other than black, give <code>.card</code> a background color, and set <code>#intro</code> to <code>font-size: 20px</code>.',
        starter: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Basics</title>
  <style>
    /* Write your CSS here */
  </style>
</head>
<body>
  <h1>Style me</h1>
  <p id="intro">An intro paragraph.</p>
  <div class="card">I am a card.</div>
</body>
</html>`,
        tasks: [
          { text: 'The h1 color is not the default black', test: (doc, win) => { const h = doc.querySelector('h1'); return !!h && win.getComputedStyle(h).color !== 'rgb(0, 0, 0)'; } },
          { text: '.card has a background color', test: (doc, win) => { const c = doc.querySelector('.card'); return !!c && win.getComputedStyle(c).backgroundColor !== 'rgba(0, 0, 0, 0)'; } },
          { text: '#intro has font-size 20px', test: (doc, win) => { const p = doc.querySelector('#intro'); return !!p && win.getComputedStyle(p).fontSize === '20px'; } }
        ]
      }
    },

    {
      id: 'css-box-flex',
      module: 'CSS',
      title: 'Box model and Flexbox',
      summary: 'Padding, margin, borders, and laying items out in a row.',
      concepts: `
        <p>Every element is a box: <strong>content</strong>, then <strong>padding</strong> (space inside the border), then <strong>border</strong>, then <strong>margin</strong> (space outside the border).</p>
        ${pre(`.box {
  padding: 16px;          /* inside the border */
  border: 2px solid blue;
  margin: 8px;            /* outside the border */
}`)}
        <p>Flexbox arranges children in a row or column. Set <code>display: flex</code> on the parent, then use <code>justify-content</code> to spread the items horizontally:</p>
        ${pre(`.row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}`)}`,
      example: `<style>
  .row { display: flex; justify-content: space-between; gap: 12px; }
  .box { padding: 16px; margin: 8px; border: 2px solid #1e6fd9; border-radius: 6px; background: #eaf2ff; }
</style>
<div class="row">
  <div class="box">One</div>
  <div class="box">Two</div>
  <div class="box">Three</div>
</div>`,
      quiz: [
        {
          q: 'Which property adds space inside an element\'s border?',
          options: ['margin', 'padding', 'border-spacing', 'gap'],
          answer: 1,
          why: 'padding is inside the border. margin is outside it.'
        },
        {
          q: 'Which declaration spreads flex items apart with the first at the start and the last at the end?',
          options: ['justify-content: space-between', 'align-items: stretch', 'flex-wrap: wrap', 'display: block'],
          answer: 0,
          why: 'justify-content controls spacing along the main axis (a row, by default).'
        }
      ],
      lab: {
        title: 'Lay out a row of cards',
        brief: 'Make <code>.row</code> a flex container with <code>justify-content: space-between</code>. Give every <code>.box</code> <code>padding: 16px</code>.',
        starter: `<style>
  /* Style .row and .box here */
</style>
<div class="row">
  <div class="box">One</div>
  <div class="box">Two</div>
  <div class="box">Three</div>
</div>`,
        tasks: [
          { text: '.row uses display: flex', test: (doc, win) => { const r = doc.querySelector('.row'); return !!r && win.getComputedStyle(r).display === 'flex'; } },
          { text: '.row uses justify-content: space-between', test: (doc, win) => { const r = doc.querySelector('.row'); return !!r && win.getComputedStyle(r).justifyContent === 'space-between'; } },
          { text: 'Every .box has 16px padding on all four sides', test: (doc, win) => { const boxes = [...doc.querySelectorAll('.box')]; return boxes.length > 0 && boxes.every(b => { const s = win.getComputedStyle(b); return ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'].every(p => s[p] === '16px'); }); } }
        ]
      }
    }
  ];
})();
```

File: js/checker.js
```javascript
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
```

File: js/app.js
```javascript
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
```

File: .github/workflows/pages.yml
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - id: deployment
        uses: actions/deploy-pages@v4
```

File: scripts/create-repo.ps1
```powershell
# Creates the GitHub repo for this project, pushes the code, and lets GitHub Pages deploy it.
# Usage (from the project root):
#   .\scripts\create-repo.ps1 -Owner <your-github-username>
# Requires: git and the GitHub CLI (gh), with "gh auth login" already done.
param(
  [Parameter(Mandatory = $true)] [string] $Owner,
  [string] $RepoName = 'html-css-learning-lab',
  [switch] $Private
)

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $Root

gh auth status
if ($LASTEXITCODE -ne 0) { throw 'Run "gh auth login" first.' }

if (-not (Test-Path -LiteralPath '.git')) {
  git init -b main
  if ($LASTEXITCODE -ne 0) { throw 'git init failed.' }
}

git add -A
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
  git commit -m 'Initial commit: HTML and CSS learning lab'
  if ($LASTEXITCODE -ne 0) { throw 'git commit failed. Check git user.name and user.email.' }
}

$visibility = if ($Private) { '--private' } else { '--public' }
gh repo create "$Owner/$RepoName" $visibility --source . --remote origin --push
if ($LASTEXITCODE -ne 0) { throw 'gh repo create failed. The repo may already exist.' }

Write-Host "Pushed to https://github.com/$Owner/$RepoName"
Write-Host 'Next: Settings > Pages > Build and deployment > Source: GitHub Actions.'
```

File: README.md
```markdown
# HTML & CSS Lab

A browser-based course that teaches HTML and CSS through short lessons, a live
"Try it" editor, quizzes, and labs. Labs are checked automatically against the
DOM and computed styles.

## Run locally
Open `index.html` in a browser, or run a local server:

    python -m http.server 8000

Then visit http://localhost:8000.

## Deploy
1. Create the repo and push: `.\scripts\create-repo.ps1 -Owner <github-username>`
2. On GitHub: Settings > Pages > Source: **GitHub Actions**.
3. Each push to `main` redeploys the site via `.github/workflows/pages.yml`.

## Add a lesson
Add an object to `window.LESSONS` in `js/lessons.js` with `id`, `module`, `title`,
`summary`, `concepts` (HTML), `example`, `quiz`, and `lab` (`title`, `brief`,
`starter`, `tasks` where each task has `text` and `test(doc, win)`).

## Notes
- Learner code runs in a preview with scripts disabled, so it can't run JavaScript.
- Progress is stored in localStorage, per browser.
- The lab preview loads `https://placehold.co` for the image example. Replace it if that is blocked.
```

## Setup steps
1. Create `Requests Projects\html-css-learning-lab\` and save each file above at its relative path.
2. Open PowerShell in that folder and run `.\scripts\create-repo.ps1 -Owner <username>`. Use the username from `utilities\mygithub.txt`. I haven't read that file, so check that the username is correct.
3. In GitHub, set Pages to deploy from GitHub Actions.

## Untested and assumed
- **Not run:** I haven't opened this in a browser or executed the checker. Test each lab once before you rely on it.
- **Lab tests:** the checks use DOM queries and `getComputedStyle`. Learners who write equivalent code in a different form (for example, `padding: 16px` set through a different selector) should still pass, but I haven't verified every edge case.
- **Progress:** a passed lab stays marked as passed even if a later check fails.
- **Repo and folder:** I haven't confirmed the absolute path of `Requests Projects`, and I haven't created the folder or repo.

Sources: none. The implementation uses standard HTML, CSS, and browser APIs (iframe `sandbox`, `srcdoc`, `getComputedStyle`, `setRangeText`) and the GitHub Actions Pages actions (`configure-pages@v5`, `upload-pages-artifact@v3`, `deploy-pages@v4`) as I know them. I did not check them against current docs in this session.
