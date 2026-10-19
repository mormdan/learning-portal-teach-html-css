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
