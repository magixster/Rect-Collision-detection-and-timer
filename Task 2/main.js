// Rectangle class to create and detect collision between rectangles
class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  get cx() {
    return this.x + this.w * 0.5;
  }
  get cy() {
    return this.y + this.h * 0.5;
  }

  collideRectangle(rect) {
    let dx = rect.cx - this.cx;
    let dy = rect.cy - this.cy;
    let aw = (rect.w + this.w) * 0.5;
    let ah = (rect.h + this.h) * 0.5;

    if (Math.abs(dx) > aw || Math.abs(dy) > ah) return false;

    if (Math.abs(dx / this.w) > Math.abs(dy / this.h)) {
      if (dx < 0) rect.x = this.x - rect.w;
      else rect.x = this.x + this.w;
    } else {
      if (dy < 0) rect.y = this.y - rect.h;
      else rect.y = this.y + this.h;
    }
    return true;
  }
}

let context = document.querySelector("canvas").getContext("2d");
let p = document.querySelector("p");
context.canvas.tabIndex = 1000;

let screen_h = document.documentElement.clientHeight;
let screen_w = document.documentElement.clientWidth;

let r1 = new Rectangle(100 ,100 ,100 ,100);
let r2 = new Rectangle(100, 100, 100, 100);
let activeRect = r2;

let pointer = {
  x: 50,
  y: 50,
};

function loop() {
  window.requestAnimationFrame(loop);
  screen_h = 600;
  screen_w = 600;

  context.canvas.height = screen_h;
  context.canvas.width = screen_w;

  context.fillStyle = "#202830";
  context.fillRect(0, 0, screen_w, screen_h);

  r1.x = screen_w * 0.5 - r1.w * 0.5;
  r1.y = screen_h * 0.5 - r1.h * 0.5;

  activeRect.x = pointer.x - activeRect.w * 0.5;
  activeRect.y = pointer.y - activeRect.h * 0.5;

  context.fillStyle = "#ffffff";
  context.fillRect(r1.x, r1.y, r1.w, r1.h);

  let collision = false;
  if (r1.collideRectangle(activeRect)) collision = true;

  context.fillStyle = "#ff0000";
  context.fillRect(activeRect.x, activeRect.y, activeRect.w, activeRect.h);

  if (collision) {
    alert('Collision Detected')
  }
}

loop();

window.addEventListener("mousemove", function (event) {
  let rect = context.canvas.getBoundingClientRect();

  pointer.x = event.clientX - rect.left;
  pointer.y = event.clientY - rect.top;
});

// context.canvas.addEventListener("onkeydown", function (e) {
//   let rect = context.canvas.getBoundingClientRect();
//   debugger;
//   if (e.keyCode == 37) {
//     debugger;
//     pointer.x = pointer.x - rect.left - 1;
//     pointer.y = pointer.y - rect.top;
//   } else if (e.keyCode == 39) {
//     pointer.x = pointer.x - rect.left + 1;
//     pointer.y = pointer.y - rect.top;
//   } else if (e.keyCode == 38) {
//     pointer.x = pointer.x - rect.left;
//     pointer.y = pointer.y - rect.top + 1;
//   } else if (e.keyCode == 40) {
//     pointer.x = pointer.x - rect.left;
//     pointer.y = pointer.y - rect.top - 1;
//   }
// });
