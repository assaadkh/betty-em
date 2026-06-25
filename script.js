const projects = {
  "itc-mixer": {
    category: "Mixing systems",
    title: "ITC Mixer",
    description:
      "Tank-mounted mixer system for production and dosing work. The project combines mechanical mixing hardware with electro-mechanical control for controlled operation on site.",
    images: [
      "sample of products/ITC Mixer/6ba4d309-cedd-4802-8313-b58b00057329.png",
      "sample of products/ITC Mixer/a5f6f79c-6541-4f4e-a69b-75e92d0bec0d.png",
    ],
  },
  "belt-conveyor": {
    category: "Material handling",
    title: "Belt Conveyor",
    description:
      "Inclined belt conveyor used to move bags and production material through a factory workflow. Built for practical handling, steady movement, and simple operator use.",
    images: [
      "sample of products/Belt Convoyor/2ea0b155-3908-4ad0-a5b0-e48b38e64b82.png",
      "sample of products/Belt Convoyor/497ac5de-3fe6-4abd-91fa-52e1db30cb25.png",
    ],
  },
  "chain-conveyor": {
    category: "Material handling",
    title: "Chain Conveyor",
    description:
      "Chain conveyor equipment for heavier industrial movement where stronger mechanical transfer is needed. Suitable for production lines and material transport.",
    images: [
      "sample of products/Chain Convoyor/e9f48030-730c-4724-a2d8-ee0367d316c2.png",
      "sample of products/Chain Convoyor/fdcae965-9b6f-4ba4-bcbe-7b6a99b52513.png",
    ],
  },
  "dust-bag-collector": {
    category: "Filtration",
    title: "Dust Bag Collector",
    description:
      "Dust collection system with multiple filter bags for cleaner industrial operation. Designed to support production areas where dust control and maintenance access matter.",
    images: [
      "sample of products/dust bag collector/ffc1c26e-dbb4-40c5-98e5-bfd7b4ad288d.png",
      "sample of products/dust bag collector/f53f96ab-9988-4145-a139-0838e127d1fa.png",
      "sample of products/dust bag collector/261fec49-f20c-48e5-b309-55a151d337a7.png",
    ],
  },
  tanks: {
    category: "Tank control",
    title: "Tanks & Pressure Monitoring",
    description:
      "Tank control system with measuring, pressure monitoring, and filling-machine integration. The panels support clear tank selection and controlled machine operation.",
    images: [
      "sample of products/tanks/387f1846-4e38-491b-8585-3c9fe64cb062.png",
      "sample of products/tanks/01d6681a-9b33-4f45-a48b-f57b7b93f0a9.png",
    ],
  },
  "water-control-gate": {
    category: "Water systems",
    title: "Water Control Gate",
    description:
      "Water gate system for controlled flow in outdoor water channels. The project combines mechanical gate structure with electro-mechanical control for reliable operation.",
    images: [
      "sample of products/water control gate/370b9430-be28-44bb-9465-a42d21eccda6.png",
      "sample of products/water control gate/423b7e0d-a878-4e94-b8c0-108f8abd10b9.png",
      "sample of products/water control gate/711e7843-1712-4d9f-8f4d-4907752fc278.png",
    ],
  },
  "asphalt-concrete-mixer": {
    category: "Construction equipment",
    title: "Asphalt & Concrete Mixer",
    description:
      "Heavy-duty asphalt and concrete mixer system with motors, structure, and electro-mechanical controls. Built for site mixing work where reliable machine operation and practical maintenance access matter.",
    images: [
      "sample of products/Asphalt and Concrete mixer/181fadfc-509d-4592-9fe7-c29b2b3b46ec.png",
      "sample of products/Asphalt and Concrete mixer/ce760a3b-8bfc-4377-91da-69ad8e9b4657.png",
      "sample of products/Asphalt and Concrete mixer/dfcf534b-64ba-4db8-a4ed-a53ed61e8f7e.png",
    ],
  },
};

const modal = document.querySelector("#project-modal");
const modalImage = document.querySelector("#project-modal-image");
const modalCategory = document.querySelector("#project-modal-category");
const modalTitle = document.querySelector("#project-modal-title");
const modalDescription = document.querySelector("#project-modal-description");
const thumbs = document.querySelector(".project-thumbs");
const closeButton = document.querySelector(".modal-close");
const prevButton = document.querySelector(".gallery-prev");
const nextButton = document.querySelector(".gallery-next");
const modalContactLink = document.querySelector(".modal-contact-link");

let activeProject = null;
let activeImageIndex = 0;

function renderImage(index) {
  activeImageIndex = index;
  const image = activeProject.images[activeImageIndex];
  modalImage.src = image;
  modalImage.alt = `${activeProject.title} picture ${activeImageIndex + 1}`;

  thumbs.querySelectorAll(".project-thumb").forEach((thumb, thumbIndex) => {
    thumb.classList.toggle("is-active", thumbIndex === activeImageIndex);
  });
}

function openProject(projectId) {
  if (modal.classList.contains("is-open")) return;
  activeProject = projects[projectId];
  if (!activeProject) return;

  modalCategory.textContent = activeProject.category;
  modalTitle.textContent = activeProject.title;
  modalDescription.textContent = activeProject.description;
  thumbs.innerHTML = "";

  activeProject.images.forEach((image, index) => {
    const button = document.createElement("button");
    button.className = "project-thumb";
    button.type = "button";
    button.innerHTML = `<img src="${image}" alt="${activeProject.title} thumbnail ${index + 1}">`;
    button.addEventListener("click", () => renderImage(index));
    thumbs.appendChild(button);
  });

  renderImage(0);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  closeButton.focus();
}

function closeProject() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function stepImage(direction) {
  if (!activeProject) return;
  const nextIndex =
    (activeImageIndex + direction + activeProject.images.length) %
    activeProject.images.length;
  renderImage(nextIndex);
}

document.querySelectorAll(".product-card[data-project]").forEach((card) => {
  card.addEventListener("click", () => openProject(card.dataset.project));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(card.dataset.project);
    }
  });
});

document.querySelector(".project-dialog").addEventListener("click", (event) => {
  event.stopPropagation();
});

closeButton.addEventListener("click", (event) => {
  event.stopPropagation();
  closeProject();
});
document.querySelector("[data-close-modal]").addEventListener("click", closeProject);
prevButton.addEventListener("click", (event) => {
  event.stopPropagation();
  stepImage(-1);
});
nextButton.addEventListener("click", (event) => {
  event.stopPropagation();
  stepImage(1);
});
modalContactLink.addEventListener("click", () => {
  closeProject();
});

document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("is-open")) return;
  if (event.key === "Escape") closeProject();
  if (event.key === "ArrowLeft") stepImage(-1);
  if (event.key === "ArrowRight") stepImage(1);
});

const params = new URLSearchParams(window.location.search);
if (params.get("success") === "true") {
  const successMessage = document.querySelector("#form-success");
  if (successMessage) {
    successMessage.hidden = false;
  }
}
