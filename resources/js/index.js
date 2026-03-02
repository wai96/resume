var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML =
    '<span class="name">' + "<p>" + this.txt + "</p>" + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("name-wrapper");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // // INJECT CSS
  // var css = document.createElement("style");
  // css.type = "text/css";
  // css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  // document.body.appendChild(css);
};

let exp_skill = document.querySelector(".exp-skill-wrapper");
// let exp_wrapper = document.querySelector(".experience-container");
let skill_wrapper = document.querySelector(".skill-container");
// let skill_btn = document.getElementById("skill-set");
// let exp_btn = document.getElementById("experience");
// let bool = false;

let tt = document.querySelector(".texture");
let skill_lvl = document.querySelectorAll(".mask");
let skill_icon = document.querySelectorAll(".skill-set-icon-wrapper");
let percentage = [75, 50, 70, 40, 60, 30, 50, 50];
let num_percentage = document.querySelectorAll(".percentage");
let _software = document.querySelectorAll(".software");

function skillReset() {
  _software.forEach((obj) => {
    obj.style.opacity = 0;
  });
  skill_icon.forEach((obj, arr) => {
    skill_lvl[arr].style.height = 0 + "%";
    skill_lvl[arr].style.transition = "all 0s 0s ease";
    obj.style.opacity = 0;
    obj.style.transform = "scale(0)";
  });
}

function skill() {
  num_percentage.forEach((num, index) => {
    let target = percentage[index];
    let current = 0;
    let increment = target / 50;
    function updateNumber() {
      current += increment;
      if (current < target) {
        num.innerHTML = Math.floor(current) + "%";
        // setTimeout(updateNumber, 20); // Adjust interval here
        requestAnimationFrame(updateNumber);
      } else {
        num.innerHTML = target + "%"; // Ensure final number is exact
      }
    }
    updateNumber();
  });

  _software.forEach((obj, arr) => {
    setTimeout(() => {
      obj.style.opacity = 1;
      obj.classList.add("active");
      setTimeout(() => {
        obj.classList.remove("active");
      }, 600);
    }, arr * 150);
  });

  skill_icon.forEach((obj, arr) => {
    setTimeout(() => {
      skill_lvl[arr].style.transition = "all 2s .6s ease";
      skill_lvl[arr].style.height = percentage[arr] + "%";
      obj.style.opacity = 1;
      obj.style.transform = "scale(1)";
    }, arr * 100);
  });
}

document.getElementById("experience-skills").addEventListener("click", () => {
  exp_skill.style.display = "block";
  //   bool = false;
  infoUpdate();
});

function infoUpdate() {
  //   if (!bool) {
  //     exp_wrapper.style.opacity = 1;
  //     exp_wrapper.style.top = 0;
  //     skill_wrapper.style.opacity = 0;
  //     skill_wrapper.style.top = 200 + "px";
  //     skillReset();
  //     document.getElementById("back").style.backgroundColor = "#5f5f5f";
  //     // document.getElementById("back").style.border = "2px solid black";
  //     document.getElementById("back").style.color = "white";
  //     // skill_btn.classList.remove("active");
  //     // exp_btn.classList.add("active");
  //     tt.style.opacity = 1;
  //   } else {
  skill_wrapper.style.opacity = 1;
  skill_wrapper.style.top = 0;
  // exp_wrapper.style.opacity = 0;
  // exp_wrapper.style.top = 200 + "px";
  skill();
  // document.getElementById("back").style.backgroundColor = "var(--second-color)";
  // document.getElementById("back").style.color = "black";
  // skill_btn.classList.add("active");
  // exp_btn.classList.remove("active");
  tt.style.opacity = 0;
  //   }
}

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// skill_btn.addEventListener("click", () => {
//   bool = true;
//   infoUpdate();
// });

// exp_btn.addEventListener("click", () => {
//   bool = false;
//   infoUpdate();
// });

function back() {
  exp_skill.style.display = "none";
  // exp_wrapper.style.opacity = 0;
  // exp_wrapper.style.top = 200 + "px";
  skill_wrapper.style.opacity = 0;
  skill_wrapper.style.top = 200 + "px";
}
