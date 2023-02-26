const phoneLoad = async(inputFluidString,dataLimited) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputFluidString}`
    const res = await fetch(url);
    const data = await res.json();
    displayLoad(data.data,dataLimited)

}

const displayLoad = (phones,dataLimited) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText='';

    // display show only
    const showAll = document.getElementById('show-all')
   if(dataLimited && phones.length > 10){
    phones = phones.slice(0,10)
    showAll.classList.remove('d-none')
   }else{
    showAll.classList.add('d-none')
   }

    // display all phone
    const noPhone = document.getElementById('phone-found');
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }else{
        noPhone.classList.add('d-none')
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML=`
        <div class="card p-5">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="detailsButton('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetails">Details</button>
            </div>
      </div>
        `;
        phoneContainer.appendChild(phoneDiv)
    });
    toggleSpiner(false);
}
const processSearch = (dataLimited) =>{
    toggleSpiner(true);
    const inputFluid = document.getElementById('input-fluid');
    const inputFluidString = inputFluid.value;
    phoneLoad(inputFluidString,dataLimited)
}

// handle search button 
document.getElementById('btn-click').addEventListener('click',function(){
    processSearch(10)
})
// button search handler enter
document.getElementById('input-fluid').addEventListener('keypress', function (e) {
    console.log(e.key)
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

const toggleSpiner = isLoading =>{
    const loderSection = document.getElementById('loder');
    if(isLoading){
        loderSection.classList.remove('d-none')
    }else{
        loderSection.classList.add('d-none')
    }
}

// do not way load show all
document.getElementById('btn-show-all').addEventListener('click',function(){
     processSearch();
});

const detailsButton = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data)
}

const displayDetails = phone =>{
    console.log(phone);
    const phoneDetailsLabel = document.getElementById('phoneDetailsLabel');
    phoneDetailsLabel.innerText = phone.name;

    const releaseDate = document.getElementById('bodyDetails');
    releaseDate.innerHTML = `
    <p>Release Date : ${phone.releaseDate ? phone.releaseDate : 'not a release date'}</p>
    <p>Other : ${phone.mainFeatures.storage}</p>
    `;
}


phoneLoad('apple');