/*
 * SLIK LEGGER DU TIL SPONSORER
 *
 * 1. Legg logofilen i mappen assets/sponsorer/.
 * 2. Legg inn sponsoren i listen nedenfor.
 * 3. Velg nivå: "hoved", "stor", "medium" eller "standard".
 *
 * Eksempel med logo og nettside:
 * {
 *   name: "Bedriftsnavn",
 *   logo: "assets/sponsorer/bedriftsnavn.svg",
 *   url: "https://bedrift.no",
 *   level: "stor"
 * }
 *
 * Eksempel uten logo:
 * {
 *   name: "Bedriftsnavn",
 *   level: "standard"
 * }
 */

const sponsors = [
  // {
  //   name: "Eksempel hovedsponsor",
  //   logo: "assets/sponsorer/eksempel-hovedsponsor.svg",
  //   url: "https://eksempel.no",
  //   level: "hoved"
  // },
  // {
  //   name: "Eksempel samarbeidspartner",
  //   logo: "assets/sponsorer/eksempel-samarbeidspartner.png",
  //   url: "https://eksempel.no",
  //   level: "stor"
  // }
];

const allowedLevels = ["hoved", "stor", "medium", "standard"];
const sponsorList = document.querySelector("#sponsor-list");

function createSponsorName(name) {
  const text = document.createElement("span");
  text.className = "sponsor-name";
  text.textContent = name;
  return text;
}

function createSponsorCard(sponsor) {
  const hasValidUrl = typeof sponsor.url === "string" && sponsor.url.trim() !== "";
  const card = hasValidUrl ? document.createElement("a") : document.createElement("div");
  const level = allowedLevels.includes(sponsor.level) ? sponsor.level : "standard";

  card.className = `sponsor-card sponsor-${level}`;

  if (hasValidUrl) {
    card.href = sponsor.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.setAttribute("aria-label", `Besøk nettsiden til ${sponsor.name}`);
  }

  if (sponsor.logo) {
    const image = document.createElement("img");
    image.src = sponsor.logo;
    image.alt = sponsor.name;
    image.loading = "lazy";

    image.addEventListener("error", () => {
      image.replaceWith(createSponsorName(sponsor.name));
    });

    card.appendChild(image);
  } else {
    card.appendChild(createSponsorName(sponsor.name));
  }

  return card;
}

function renderSponsors() {
  sponsorList.replaceChildren();

  if (sponsors.length === 0) {
    const placeholder = document.createElement("div");
    placeholder.className = "sponsor-card sponsor-standard sponsor-placeholder";
    placeholder.textContent = "Sponsorene presenteres fortløpende";
    sponsorList.appendChild(placeholder);
    return;
  }

  sponsors.forEach((sponsor) => {
    sponsorList.appendChild(createSponsorCard(sponsor));
  });
}

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("click", (event) => {
  if (!navigation.contains(event.target) && !menuButton.contains(event.target)) {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

const vippsQr = document.querySelector("#vipps-qr");
const vippsPlaceholder = document.querySelector("#vipps-placeholder");

vippsQr.addEventListener("error", () => {
  vippsQr.hidden = true;
  vippsPlaceholder.hidden = false;
});

function showLogoPlaceholder(logo) {
    logo.hidden = true;
    document.getElementById(logo.dataset.logoPlaceholder).hidden = false;
}

document.querySelectorAll("[data-logo-placeholder]").forEach((logo) => {
  logo.addEventListener("error", () => showLogoPlaceholder(logo));

  if (logo.complete && logo.naturalWidth === 0) {
    showLogoPlaceholder(logo);
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();

renderSponsors();
