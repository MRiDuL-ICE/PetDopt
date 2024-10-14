console.log("mridul");
let allPets = [];

// fetch catagory
const loadCatagories = () => {
  fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((err) => console.log("error is here", err));
};

const displayCatagories = (categories) => {
  console.log(categories);
  const petContainer = document.getElementById("category-btn");
  petContainer.classList =
    "md:flex mt-6 justify-center md:gap-20 grid grid-cols-2 mx-auto w-10/12 gap-4 ";
  categories.forEach((item) => {
    const button = document.createElement("button");
    console.log(item.category);
    button.setAttribute("id", `${item.category}`)
    button.className =
      "btn md:w-52 md:h-20 flex md:gap-6 md:rounded-3xl bg-white";

    button.innerHTML = `<img src=${item.category_icon} class="w-4/12 items-center align-middle justify-center"/> ${item.category}`;

    petContainer.appendChild(button);

    button.addEventListener("click", (e) => {
      loadPetsCategory(e.target.id);
      
      categories.forEach((cat) => {
        const otherButton = document.getElementById(cat.category);
        otherButton.classList.remove('bg-[#0E7A811A]', 'border-[#0E7A81]');
      });

      e.target.classList.add('bg-[#0E7A811A]', 'border-[#0E7A81]');
    });

  });
};

// fetch all pets on a cards

const loadPets = () => {
  console.log("Load Pets");
  fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((res) => res.json())
    .then((data) =>{
      allPets = data.pets;
      displayPets(allPets);
    })
    .catch((err) => console.log(err));
};

const displayPets = (pets) => {
  console.log(pets);
  const shopContainer = document.getElementById("shop");
  shopContainer.innerHTML = "";
  shopContainer.innerHTML = `<div class="loading loading-bars loading-lg relative my-auto mx-auto"></div>`;

  setTimeout(() => {
    shopContainer.innerHTML= "";
    pets.forEach((item) => {
      const petCard = `
          <div class="card card-compact bg-base-100 w-full shadow-xl ">
          <img
        src=${item.image}
        alt="pets" class="m-4 rounded-xl"/>
    <div class="card-body">
      <h2 class="card-title">${item.pet_name}</h2>
      <h2 class="flex gap-2 text-slate-500 font-bold"><img width="16" height="12" src="https://img.icons8.com/ios/50/diversity.png" alt="diversity"/>Breed: ${
        item.breed == undefined ? "Not Available" : `${item.breed}`
      }</h2>
      <h2 class="flex gap-2 text-slate-500 font-bold"><img width="16" height="12" src="https://img.icons8.com/pulsar-line/50/birth-date.png" alt="birth-date"/>Birth: ${
        item.date_of_birth == null ? "Not Available" : `${item.date_of_birth}`
      }</h2>
      <h2 class="flex gap-2 text-slate-500 font-bold"><img width="16" height="12" src="https://img.icons8.com/cotton/50/gender.png" alt="gender"/>Gender: ${
        item.gender == undefined ? "Not Available" : `${item.gender}`
      }</h2>
      <h2 class="flex gap-2 text-slate-500 font-bold"><img width="16" height="12" src="https://img.icons8.com/dotty/80/price-tag-usd.png" alt="price-tag-usd"/>Price: ${
        item.price == null ? "Not Available" : `${item.price}$`
      }</h2>
      <div class="card-actions justify-between">
        <button onclick="likedPets('${item.image}')" class="btn btn-primary bg-white font-bold text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white border-slate-300"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
</svg>
</button>
        <button id="adopt" onclick="modal()" class="btn btn-primary bg-white font-bold text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white border-slate-300">Adopt</button>
        <button id="${item.petId}" class="btn btn-primary bg-white font-bold text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white border-slate-300">Details</button>
      </div>
    </div>
    </div>
          `
          shopContainer.innerHTML += petCard;

        

      // document.getElementById(`details-${item.petId}`).addEventListener('click', (e) => {
      //   console.log(e.target.id);
      });
      pets.forEach((item) => {
        const detailsButton = document.getElementById(`${item.petId}`);
        if (detailsButton) {
          detailsButton.addEventListener('click', (e) => {
            loadDetails(e.target.id);
          });
        }
    });
    
  }, 2000);

  

  document.getElementById("my_modal_1")
};

document.getElementById("sortBtn").addEventListener("click", () => {
  const sortedPets = [...allPets].sort((a, b) => (b.price || 0) - (a.price || 0));
  displayPets(sortedPets); 
});


allCatePets = [];


const loadPetsCategory = (searchCate) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${searchCate}`)
  .then((res) => res.json())
  .then((data) => {
    allCatePets = data.data;
    displayPetCategories(allCatePets);
  })
  .catch((err) => console.log(err))
}


const displayPetCategories = (petCate) => {
  console.log(petCate);
  const shopContainer = document.getElementById("shop");
 if(petCate.length === 0){
  shopContainer.innerHTML = ""
  shopContainer.innerHTML = `<span class="loading loading-bars loading-lg relative my-auto mx-auto"></span>`
  setTimeout(() => {
    shopContainer.innerHTML =""
    shopContainer.innerHTML += `
  <div class="md:w-[58vw] w-11/12 h-4/12 md:h-[58vh] mx-auto">
  <div class="border-4 bg-base-200 w-full h-full relative my-auto mx-auto">
  <div class="hero-content text-center my-auto h-full">
    <div class="w-full md:p-36 h-full">
      <h1 class="text-5xl font-bold mx-auto pb-8"><img width="100" height="100" class="mx-auto" src="https://img.icons8.com/water-color/100/fine-print.png" alt="fine-print"/></h1>
      <h1 class="text-4xl font-extrabold pb-8">No Information Available</h1>
      <p>there is no data for the Bird category from the API response.</p>
    </div>
  </div>
</div>
  
  </div>
  
  `;
  return;
  }, 2000);
 }
 else{
  shopContainer.innerHTML = ""
  shopContainer.innerHTML = `<div class="loading loading-bars loading-lg  relative my-auto mx-auto"></div>`

  setTimeout(() => {
    shopContainer.innerHTML= ""
    Object.values(petCate).forEach((element) => {
      shopContainer.innerHTML += `
          <div class="card card-compact bg-base-100 w-full shadow-xl ">
          <img
        src=${element.image}
        alt="pets" class="m-4 rounded-xl"/>
    <div class="card-body">
      <h2 class="card-title">${element.pet_name}</h2>
      <h2 class="flex gap-2 text-slate-500 font-bold"><img width="16" height="12" src="https://img.icons8.com/ios/50/diversity.png" alt="diversity"/>Breed: ${
        element.breed == undefined ? "Not Available" : `${element.breed}`
      }</h2>
      <h2 class="flex gap-2 text-slate-500 font-bold"><img width="16" height="12" src="https://img.icons8.com/pulsar-line/50/birth-date.png" alt="birth-date"/>Birth: ${
        element.date_of_birth == null ? "Not Available" : `${element.date_of_birth}`
      }</h2>
      <h2 class="flex gap-2 text-slate-500 font-bold"><img width="16" height="12" src="https://img.icons8.com/cotton/50/gender.png" alt="gender"/>Gender: ${
        element.gender == undefined ? "Not Available" : `${element.gender}`
      }</h2>
      <h2 class="flex gap-2 text-slate-500 font-bold"><img width="16" height="12" src="https://img.icons8.com/dotty/80/price-tag-usd.png" alt="price-tag-usd"/>Price: ${
        element.price == null ? "Not Available" : `${element.price}$`
      }</h2>
      <div class="card-actions justify-between">
        <button onclick="likedPets('${element.image}')" class="btn btn-primary bg-white font-bold text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white border-slate-300"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
</svg>
</button>
        <button id="adopt" onclick="modal()" class="btn btn-primary bg-white font-bold text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white border-slate-300">Adopt</button>
        <button id="${element.petId}" class="btn btn-primary bg-white font-bold text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white border-slate-300">Details</button>
      </div>
    </div>
    </div>
          `
      // document.getElementById(`${element.petId}`).addEventListener('click', (e) => {
      //   console.log(e.target.id);
      });
      petCate.forEach((element) => {
        const detailsButton = document.getElementById(`${element.petId}`);
        if (detailsButton) {
          detailsButton.addEventListener('click', (e) => {
            loadDetails(e.target.id); 
          });
        }
    });

    
  }, 2000);

}

document.getElementById("sortBtn").addEventListener("click", () => {
  const sortedPets = [...allCatePets].sort((a, b) => (b.price || 0) - (a.price || 0)); // Sort without modifying the original array
  displayPets(sortedPets);
});

}





const loadDetails = (detailsId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${detailsId}`)
  .then((res) => res.json())
  .then((data) => displayDetails(data))
  .catch((err) => console.log(err))
}

const displayDetails = (dataPet) => {
  console.log(dataPet);
  const modalContainer = document.getElementById('detailsModal');
  const detailsContainer = document.getElementById('details');
  
  Object.values(dataPet).forEach((details )=> {
    detailsContainer.innerHTML = "";
    console.log(details);
    const containerDetails = `
    
    <div class="card bg-base-100 w-full">
  <figure>
    <img
      src=${details.image}
      alt="pets" class="w-full"/>
  </figure>
  <div class="card-body w-full">
    <h2 class="card-title w-full">${details.pet_name}</h2>
    <div class="flex justify-between">
    <div>
    <h2 class="flex gap-2 text-slate-500 font-bold"><img width="16" height="12" src="https://img.icons8.com/ios/50/diversity.png" alt="diversity"/>Breed: ${
        details.breed == undefined ? "Not Available" : `${details.breed}`
      }</h2>
      <h2 class="flex gap-2 text-slate-500 font-bold"><img width="16" height="12" src="https://img.icons8.com/cotton/50/gender.png" alt="gender"/>Gender: ${
        details.gender == undefined ? "Not Available" : `${details.gender}`
      }</h2>
      <h2 class="flex gap-2 text-slate-500 font-bold"><img width="16" height="12" src="https://img.icons8.com/pulsar-line/50/birth-date.png" alt="birth-date"/>Vaccinated Status: ${
        details.vaccinated_status == null ? "Not Available" : `${details.vaccinated_status}`
      }</h2>
      
    </div>
    <div>
    <h2 class="flex gap-2 text-slate-500 font-bold"><img width="16" height="12" src="https://img.icons8.com/pulsar-line/50/birth-date.png" alt="birth-date"/>Birth: ${
        details.date_of_birth == null ? "Not Available" : `${details.date_of_birth}`
      }</h2>
      <h2 class="flex gap-2 text-slate-500 font-bold"><img width="16" height="12" src="https://img.icons8.com/dotty/80/price-tag-usd.png" alt="price-tag-usd"/>Price: ${
        details.price == null ? "Not Available" : `${details.price}$`
      }</h2>
    </div>
    </div>
    <div>
    <h1 class="text-3xl font-bold mt-4 mb-2">Detail Information</h1>
    <p>${details.pet_details}</p>
    </div>
  </div>
</div>

    ` 
   
    
    detailsContainer.innerHTML += containerDetails;
    modalContainer.showModal();

  });
  
}

const modal = () => {
  const adoptModalContainer = document.getElementById("adoptModal");
  const adoptContainer = document.getElementById("adoptCard");
  adoptContainer.innerHTML = ""
  const div = document.createElement("div")
  div.className = "card bg-base-100 w-full mx-auto"
  div.innerHTML = `
  <span class="mx-auto mb-4"><img width="48" height="48" src="https://img.icons8.com/color-glass/48/handshake--v1.png" alt="handshake--v1"/></span>
  <h1 class="text-5xl font-extrabold text-center mb-4">Congratss!</h1>
  <h3 class="text-slate-500 font-bold text-xl text-center ">Adoption Process is Start For Your Pet</h3>
  <h1 id="countdown" class="text-5xl font-extrabold text-center mt-4">3</h1> 
  `

 
  adoptContainer.appendChild(div);
  let count = 3;
  const countdownElement = document.getElementById("countdown");

  const interval = setInterval(() => {
    if (count > 0) {
      count--;
      countdownElement.textContent = count;
    }
    
    if (count === 0) {
      clearInterval(interval);
      adoptModalContainer.close();
    }
  }, 1000);

adoptModalContainer.showModal();
}


const likedPets = (dataId) => {
  console.log(dataId);
  const likedContainer = document.getElementById('liked');
  const div = document.createElement("div")
  div.className = "m-2 rounded-lg"
  div.innerHTML = `
  <img src='${dataId}' alt="pets" class="w-full rounded-lg"/>
  `
  likedContainer.appendChild(div)
}




// document.getElementById("likebtn").addEventListener("click", () => {
//     const likedPic = document.getElementById("liked")
// })

loadCatagories();
loadPets();
