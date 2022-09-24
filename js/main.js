let form = $(".form__section"),
  namazTime = $a(".time"),
  cards = $(".cards"),
  city = $(".cityLoc"),
  today = $(".today"),
  loce = $(".loce"),
  body = $("body"),
  select = $(".select"),
  btn = $(".message"),
  weekTr = $("#week"),
  tr = $a(".tr"),
  months = $("#month");

// HAFTALIK MINTAQALARNING MA'LUMOTINI OLISH
async function regionSelectWeek(resultWeek) {
  const weekRegions = await fetch(
    `https://islomapi.uz/api/present/week?region=${resultWeek}`
  );

  const month = await fetch(
    `https://islomapi.uz/api/monthly?region=${resultWeek}&month=${
      new Date().getMonth() + 1
    }`
  );

  let monthResultJson = await month.json();
  let monthResultObj = JSON.stringify(monthResultJson);
  localStorage.setItem("month", monthResultObj);
  monthly(monthResultJson);
  
  // Hafta
  let resultW = await weekRegions.json();

  let tt = JSON.stringify(resultW);

  localStorage.setItem("weekDate", tt);
  const resdata = localStorage.getItem("weekDate");
  const dataW = JSON.parse(resdata);

  weekTr.innerHTML = "";

  dataW.forEach((el, i) => {
    const { tong_saharlik, quyosh, peshin, asr, shom_iftor, hufton } =
      dataW[i].times;
    const d = new Date();
    let day = d.getDay();
    createEl(
      "tr",
      "tr",
      `
                            <th scope="row">${el.region}</th>
                            <td>${el.date.substring(0, 10)}</td>
                            <td>${tong_saharlik}</td>
                            <td>${quyosh}</td>
                            <td>${peshin}</td>
                            <td>${asr}</td>
                            <td>${shom_iftor}</td>
                            <td>${hufton}</td>
                            `,
      weekTr
    );
  });
}

// Oylik taqvim
function monthly(ret) {
  const monthLoc = localStorage.getItem("month");
  const monthObjResult = JSON.parse(monthLoc);
console.log(ret);
  months.innerHTML = "";

  monthObjResult.forEach((item, i) => {
    createEl(
      "tr",
      "monthTr",
      `
                            <th scope="row">${item.region}</th>
                            <td>${item.date.substring(0, 10)}</td>
                            <td>${item.times.tong_saharlik}</td>
                            <td>${item.times.quyosh}</td>
                            <td>${item.times.peshin}</td>
                            <td>${item.times.asr}</td>
                            <td>${item.times.shom_iftor}</td>
                            <td>${item.times.hufton}</td>
                            `,
      months
    );
    console.log(item);
  });
  
}
monthly();

// MINTAQALARNING MA'LUMOTINI OLISH
async function regionSelect(result) {
  const regions = await fetch(
    `https://islomapi.uz/api/present/day?region=${result}`
  );
  const resultCity = await regions.json();
  Object.values(resultCity.times).forEach((item, i) => {
    namazTime[i].innerHTML = `<span class = "time">${item}</span>`;
  });
}

// MINTAQANI TANLASH
function change() {
  form.addEventListener("change", (e) => {
    let mintaqa = e.target.value;
    switch (mintaqa) {
      case "Toshkent":
        test = "Toshkent";
        break;
      case "Farg'ona":
        test = "Qo'qon";
        break;
      case "Samarqand":
        test = "Samarqand";
        break;
      case "Xorazm":
        test = "Xiva";
        break;
      case "Navoiy":
        test = "Navoiy";
        break;
      case "Qashqadaryo":
        test = "Qarshi";
        break;
      case "Surxandaryo":
        test = "Termiz";
        break;
      case "Andijon":
        test = "Andijon";
        break;
      case "Namangan":
        test = "Namangan";
        break;
      case "Jizzax":
        test = "Jizzax";
        break;
      case "Buxoro":
        test = "Buxoro";
        break;
      case "Sirdaryo":
        test = "Guliston";
        break;
    }

    localStorage.setItem("user", test);
    city.textContent = test;

    regionSelect(test);
    regionSelectWeek(test);
  });
}
change();
regionSelect();
regionSelectWeek();
monthly()

function loadPage() {
  let user = localStorage.getItem("user");
  select.textContent = user;
  city.textContent = localStorage.getItem("user");
  const weekResult = localStorage.getItem("week");
  regionSelectWeek(weekResult);
  regionSelect(user);
}
loadPage();

// SELECTOR
let renderRegions = () => {
  provencie.forEach((item) => {
    createEl(
      "option",
      "sectionOption",
      `<option value="${item}">${item}</option>`,
      form
    );
  });
};
renderRegions();

// Data
function data() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  today.innerHTML = `${d.getDate()}-${
    monthNames[d.getMonth()]
  }  ${d.getFullYear()}-yil  <span class="timeNow">${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}</span> `;
}
setInterval(() => {
  data();
}, 500);

// Theme dark //
const toggle = document.querySelector(".checkbox");
const theme = window.localStorage.getItem("theme");

if (theme === "dark") {
  document.body.classList.add("dark");
  $(".container").classList.toggle("dark");
  $(".loce").classList.toggle("dark");
}
// event listener stops when the change theme button is clicked
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  $(".container").classList.toggle("dark");
  $(".loce").classList.toggle("dark");
  if (theme === "dark") {
    window.localStorage.setItem("theme", "light");
  } else window.localStorage.setItem("theme", "dark");
});
