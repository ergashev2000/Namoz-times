let form = $('.form__section'),
    namazTime = $a('.time'),
    cards = $('.cards'),
    city = $('.cityLoc'),
    today = $('.today'),
    loce = $('.loce')
    ;


// MINTAQALARNING MA'LUMOTINI OLISH 
async function regionSelect(result = "Toshkent") {
    const regions = await fetch(`https://islomapi.uz/api/present/day?region=${result}`);
    const resultCity = await regions.json();

    Object.values(resultCity.times).forEach((item, i) => {
        namazTime[i].innerHTML = `<span class = "time">${item}</span>`;
    });
};
regionSelect()


// MINTAQANI TANLASH
function change() {
    form.addEventListener('change', (e) => {
        let mintaqa = e.target.value
        switch (mintaqa) {
            case 'Toshkent':
                test = "Toshkent"
                break;
            case "Farg'ona":
                test = "Qo'qon"
                break;
            case 'Samarqand':
                test = "Samarqand"
                break;
            case "Xorazm":
                test = "Xiva"
                break;
            case 'Navoiy':
                test = "Navoiy"
                break;
            case "Qashqadaryo":
                test = "Qarshi"
                break;
            case 'Surxandaryo':
                test = "Termiz"
                break;
            case "Andijon":
                test = "Andijon"
                break;
            case 'Namangan':
                test = "Namangan"
                break;
            case "Jizzax":
                test = "Jizzax"
                break;
            case 'Buxoro':
                test = "Buxoro"
                break;
            case "Sirdaryo":
                test = "Guliston"
                break;
        }
        regionSelect(test)
        city.textContent = mintaqa;
    })
}
change()


// SELECTOR
let renderRegions = () => {
    provencie.forEach((item) => {
        createEl('option', 'sectionOption', `<option value="${item}">${item}</option>`, form)
    });
}
renderRegions()


// Data
function data() {
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    const d = new Date();
    today.innerHTML = `${d.getDate()}-${monthNames[d.getMonth()]}  ${d.getFullYear()}-yil  <span class="timeNow">${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}</span> `
}
setInterval(() => {
    data()
}, 500);
