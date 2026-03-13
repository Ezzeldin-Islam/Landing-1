import "./style.css";
import Headroom from "headroom.js";

const header = document.querySelector("header.header");

const headroom = new Headroom(header);
headroom.init();

//* manage toggle menu btn
let toggleMenu = document.querySelector("header .toggle-menu");
let navLinks = document.querySelector("header #nav-links");

document.addEventListener("DOMContentLoaded", () => {
  toggleMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (toggleMenu.classList.contains("active")) {
      if (e.target != toggleMenu && !navLinks.contains(e.target)) {
        toggleMenu.classList.remove("active");
      }
    }
  });
});

let numOfPlans = 6;
let currentPlan = 1;
let plansContainer = document.getElementById("work-plans");

let plansContent = {
  1: {
    number: "01",
    title: "Consultation",
    description:
      "During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.",
  },
  2: {
    number: "02",
    title: "Research and Strategy Development",
    description:
      "During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.",
  },
  3: {
    number: "03",
    title: "Implementation",
    description:
      "During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.",
  },
  4: {
    number: "04",
    title: "Monitoring and Optimization",
    description:
      "During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.",
  },
  5: {
    number: "05",
    title: "Reporting and Communication",
    description:
      "During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.",
  },
  6: {
    number: "06",
    title: "Continual Improvement",
    description:
      "During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.",
  },
};

for (let i = 1; i <= numOfPlans; i++) {
  let plan = document.createElement("div");
  plan.classList.add("plan");
  i === 1 ? plan.classList.add("active") : null;

  let content = `
  <div
    class="row">
    <div class="stats flex items-center gap-5">
      <span class="number text-[60px]">${plansContent[i].number}</span>
      <span class="step text-[30px]">${plansContent[i].title}</span>
    </div>
    <span class="icon text-[40px] cursor-pointer"><i
        class="fa-solid fa-circle-${i === 1 ? "minus" : "plus"} border-black border"
        style="background-color: black; color: white; border-radius: 50%;"></i></span>
  </div>
  <p>${plansContent[i].description}</p>
  `;
  plan.innerHTML = content;
  plansContainer.append(plan);
}

let plans = document.querySelectorAll("#work-plans .plan");

if (plans) {
  plans.forEach((plan) => {
    plan.addEventListener("click", () => {
      if (plan.classList.contains("active")) {
        plan.classList.remove("active");
        plan
          .querySelector("i")
          .classList.replace("fa-circle-minus", "fa-circle-plus");
      } else {
        plans.forEach((plan) => {
          plan.classList.remove("active");
          plan
            .querySelector("i")
            .classList.replace("fa-circle-minus", "fa-circle-plus");
        });
        plan
          .querySelector("i")
          .classList.replace("fa-circle-plus", "fa-circle-minus");
        plan.classList.add("active");
      }
    });
  });
}

let messageContainer = document.querySelector("#testimonials .messages");

async function fetchData() {
  try {
    let res = await fetch("./data.json");
    let allData = await res.json();
    let testimonials = allData[0];

    let wrapper = document.createElement("div");
    wrapper.className = "wrapper flex items-center";
    messageContainer.prepend(wrapper);

    Object.values(testimonials).forEach((review) => {
      let message = document.createElement("div");
      message.className =
        "message transition-all duration-500 max-w-[55%] ml-auto mr-auto";
      message.dataset.id = review.id;

      let content = `
          <div
      class="description leading-[1.8] text-lg p-10 border-[#B9FF66] border rounded-4xl max-sm:px-5">
      <p>"${review.description}"</p>
    </div>
    <div class="person mt-10 ml-35 max-sm:ml-15">
      <h2
        class="font-medium tracking-[2px] text-lg text-[#b9ff66]">${review.personName}</h2>
      <p class="tracking-[2px]">${review.job}</p>
    </div>
        `;

      if (review.id == 1) {
        message.classList.add("active");
      }

      message.innerHTML = content;

      wrapper.append(message);
    });

    let messages = document.querySelectorAll("#testimonials .message");
    let controls = document.querySelector("#testimonials .controls");
    let arrowLeft = document.querySelector(
      "#testimonials .controls .fa-arrow-left",
    );
    let arrowRight = document.querySelector(
      "#testimonials .controls .fa-arrow-right",
    );

    // console.log(currentMessage);
  } catch (error) {
    console.log(error);
  }
}

fetchData();

function getNextMessage(messages) {
  let currentMessage = document.querySelector("#testimonials .message.active")
    .dataset.id;
  messages.forEach((message) => {
    message.classList.remove("active");
  });
  let nextMessage = document.querySelector(
    `#testimonials .message[data-id="${+currentMessage + 1}"]`,
  );
  nextMessage.classList.add("active");
}

function getPreviousMessage(messages) {
  let currentMessage = document.querySelector("#testimonials .message.active")
    .dataset.id;
  messages.forEach((message) => {
    message.classList.remove("active");
  });
  let previousMessage = document.querySelector(
    `#testimonials .message[data-id="${+currentMessage - 1}"]`,
  );
  previousMessage.classList.add("active");
}
