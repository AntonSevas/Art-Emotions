// Анимация смены букв
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '♡';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 120);
      const end = start + Math.floor(Math.random() * 120);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += '<span class="dud-text">' + char + '</span>';
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}
// Цитаты
const phrases = [
  '"Я только тем и занимаюсь, что порчу свои картины. И потом говорю «сделал, что хотел»"\n C. Дали',
  '"К черту правила... рисуй то, что тебе нравится.\n" Д. Уоррен',
  '"Картина — стих, только без слов."\n Гораций',
  '"Любая картина — это замочная скважина, сквозь которую можно подглядеть душу художника."\n A. Квотион',
  '"Художник – тот, кто создаёт прекрасное." О. Уайлд',
  '"Какое чудо — восхищаться в живописи тем, чем в реальности не восхищаешься."\n Ф. Делакруа',
  '"Неважно, насколько плохо вы рисуете, до тех пор, пока вы рисуете плохо не так, как другие."\n Д. Мур',
];
const el = document.querySelector('.scramble-text');
const fx = new TextScramble(el);
let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 12000);
  });
  counter = (counter + 1) % phrases.length;
};
next();

// Скрытие меню при скролинге

let lastScroll = 0;
const defaultOffset = 200;
const header = document.querySelector('.nav');

const scrollPosition = () =>
  window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');

window.addEventListener('scroll', () => {
  if (
    scrollPosition() > lastScroll &&
    !containHide() &&
    scrollPosition() > defaultOffset
  ) {
    //scroll down
    header.classList.add('hide');
  } else if (scrollPosition() < lastScroll && containHide()) {
    //scroll up
    header.classList.remove('hide');
  }

  lastScroll = scrollPosition();
});
