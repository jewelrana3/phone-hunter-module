const phoneLoad = async(inputFluidString) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputFluidString}`
    const res = await fetch(url);
    const data = await res.json();
    displayLoad(data.data)

}

const displayLoad = phones =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText='';

    // display show only
    phones = phones.slice(0,5);

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
            </div>
      </div>
        `;
        phoneContainer.appendChild(phoneDiv)
    });
    toggleSpiner(false);
}
// handle search button 
document.getElementById('btn-click').addEventListener('click',function(){
    // start loder
    toggleSpiner(true);
    const inputFluid = document.getElementById('input-fluid');
    const inputFluidString = inputFluid.value;
    phoneLoad(inputFluidString)
})
const toggleSpiner = isLoading =>{
    const loderSection = document.getElementById('loder');
    if(isLoading){
        loderSection.classList.remove('d-none')
    }else{
        loderSection.classList.add('d-none')
    }
}
phoneLoad();