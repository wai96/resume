var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.isDeleting = false;
  this.surname = "";
  this.lastname = "";
  this.lastname2 = "";
  this.tick();
};

TxtType.prototype.tick = function () {
  var fullSurname = this.toRotate[0];
  var fullLastname = this.toRotate[1];
  var fullLastname2 = this.toRotate[2];
  var fullTxt = fullSurname + " " + fullLastname + " " + fullLastname2;

  if (this.isDeleting) {
    if (this.lastname2.length > 0) {
      this.lastname2 = fullLastname2.substring(0, this.lastname2.length - 1);
    } else if (this.lastname.length > 0) {
      this.lastname = fullLastname.substring(0, this.lastname.length - 1);
    } else {
      this.surname = fullSurname.substring(0, this.surname.length - 1);
    }
  } else {
    if (this.surname.length < fullSurname.length) {
      this.surname = fullSurname.substring(0, this.surname.length + 1);
    } else if (this.lastname.length < fullLastname.length) {
      this.lastname = fullLastname.substring(0, this.lastname.length + 1);
    } else {
      this.lastname2 = fullLastname2.substring(0, this.lastname2.length + 1);
    }
  }

  this.txt =
    this.surname +
    (this.lastname.length > 0 ? " " : "") +
    this.lastname +
    (this.lastname2.length > 0 ? " " : "") +
    this.lastname2;
  this.el.innerHTML =
    '<span class="name"><p><span class="surname">' +
    this.surname +
    '</span><span class="space">&nbsp;</span>' +
    this.lastname +
    '<span class="space">&nbsp;</span>' +
    this.lastname2 +
    "</p></span>";
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
};

let exp_skill = document.querySelector(".exp-skill-wrapper");
let skill_wrapper = document.querySelector(".skill-container");

let tt = document.querySelector(".texture");
let tape = document.querySelectorAll(".tape");
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
  bool = false;
  tape.forEach((_t) => {
    _t.style.opacity = 0;
  });
  infoUpdate();
});

function infoUpdate() {
  skill_wrapper.style.opacity = 1;
  skill_wrapper.style.top = 0;
  skill();
  tt.style.opacity = 0;
}

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

function back() {
  exp_skill.style.display = "none";
  skill_wrapper.style.opacity = 0;
  skill_wrapper.style.top = 200 + "px";
  tt.style.opacity = 0.8;
  tape.forEach((_t) => {
    _t.style.opacity = 1;
  });
}
