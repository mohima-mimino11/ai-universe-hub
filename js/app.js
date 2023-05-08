const loadTools = () =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res => res.json())
    .then(data => displayTools(data.data.tools ))
    .catch(error => console.log(error))
}


//arrow function  for displaying tools on card design
const displayTools = (tools ) =>{
    console.log(tools);
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.textContent = '';
    
    //display only 6 tools
    const showAll = document.getElementById('show-all');
    if(tools.length > 6 ){
        tools = tools.slice(0, 6);
        showAll.classList.remove('invisible')
    }else{
      
        if(tools === tools.length){
            showAll.classList.add('invisible')
        }
    
        
    }

    
    tools.forEach(tool =>{
        console.log(tool);
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
        <div class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img class="rounded-t-lg" src="${tool.image ? tool.image :  src  ='no image found'}" alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Features</h5>
                        </a>
                        <ol>
                            <li class="mb-3 font-normal text-gray-700 dark:text-gray-400" >1. ${tool.features[0] ? tool.features[0]  : 'not available now'}</li>
                            <li class="mb-3 font-normal text-gray-700 dark:text-gray-400" >2. ${tool.features[1] ? tool.features[1]  : 'not available now'}</li>
                            <li class="mb-3 font-normal text-gray-700 dark:text-gray-400" >3. ${tool.features[2] ? tool.features[2]  : 'not available now'}</li>
                            <li class="mb-3 font-normal text-gray-700 dark:text-gray-400" >4. ${tool.features[3] ? tool.features[3]  : 'not available now'}</li>
                        </ol>
                        <hr>
                        <h5 class="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Technology Name: ${tool.name ? tool.name : 'Not named yet'}</h5>
                         <ul class="mt-4 flex gap-x-2">
                            <li> <img  src="images/Vector.png"></li>
                            <li> <p class=" font-normal text-gray-700 dark:text-gray-400">${tool.published_in ?  tool.published_in : 'No Release date available'}</p> </li>
                         </ul>
                         <label  for="my-modal-5" class="block w-50 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4" type="button" onclick="loadToolsDetails('${tool.id}')">
                         See Details
                       </label>
                    </div>
                </div>
        `
        cardsContainer.appendChild(cardDiv)
    })
    // stop spinner
    toggleSpinner(false)
}





// showing all data by click event listener via api fetching
document.getElementById('btn-show-all').addEventListener('click', async() => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
   const response = await fetch(url);
   const data = await response.json();
   const tools = data.data.tools;
   const cardsContainer = document.getElementById('cards-container');
   cardsContainer.textContent = '';
   tools.forEach(tool =>{
    console.log(tool);
    const cardDiv = document.createElement('div');
    cardDiv.innerHTML = `
    <div class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img class="rounded-t-lg" src="${tool.image ? tool.image :  src  ='no image found'}" alt="" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Features</h5>
                    </a>
                    <ol>
                        <li class="mb-3 font-normal text-gray-700 dark:text-gray-400" >1. ${tool.features[0] ? tool.features[0]  : 'not available now'}</li>
                        <li class="mb-3 font-normal text-gray-700 dark:text-gray-400" >2. ${tool.features[1] ? tool.features[1]  : 'not available now'}</li>
                        <li class="mb-3 font-normal text-gray-700 dark:text-gray-400" >3. ${tool.features[2] ? tool.features[2]  : 'not available now'}</li>
                        <li class="mb-3 font-normal text-gray-700 dark:text-gray-400" >4. ${tool.features[3] ? tool.features[3]  : 'not available now'}</li>
                    </ol>
                    <hr>
                    <h5 class="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Technology Name: ${tool.name ? tool.name : 'Not named yet'}</h5>
                     <ul class="mt-4 flex gap-x-2">
                        <li> <img  src="images/Vector.png"></li>
                        <li> <p class=" font-normal text-gray-700 dark:text-gray-400">${tool.published_in ?  tool.published_in : 'No Release date available'}</p> </li>
                     </ul>
                     <label  for="my-modal-5" class="block w-50 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4" type="button" onclick="loadToolsDetails('${tool.id}')">
                     See Details
                   </label>
                     
                     

                     
                     
                   
                </div>
            </div>
    `
    cardsContainer.appendChild(cardDiv)
    })
     // stop spinner
     toggleSpinner(false)
})


// to show the spinner
const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('invisible')
    }else{
        loaderSection.classList.add('invisible')
    }

}
// start spinner
toggleSpinner(true)

// function for loading single tool detail
const loadToolsDetails =id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    
    fetch(url)
    .then(res => res.json())
    .then(data => displayToolDetails(data.data))
    
}

// function for displaying tool details on modal

const displayToolDetails = tool =>{
    console.log(tool.accuracy ? tool.accuracy.score*100 : 'no input found') ;
    const toolDetails = document.getElementById('modal-body');
    
    toolDetails.innerHTML = `
   
    <div class="modal-box w-11/12 max-w-5xl flex justify-center items-center gap-x-4">
    
                <div class="card w-96 bg-base-100 shadow-xl">
  <div class="card-body bg-red-200">
    <h2 class="card-title">${tool.description ? tool.description : 'no details found'}</h2>
    <div class="flex">
    <button class="mr-2 rounded-lg text-green-700 bg-gray-50">${tool.pricing[0] ? tool.pricing[0].price : 'Free of Cost' } <br> Basic</button>
    <button class="mr-2 rounded-lg text-green-700 bg-gray-50">${tool.pricing[1] ? tool.pricing[1].price : 'Free of Cost' } <br> Basic</button>
    <button class="mr-2 rounded-lg text-green-700 bg-gray-50 overflow-hidden">${tool.pricing[2] ? tool.pricing[2].price : 'Free of Cost' } <br> Basic</button>
    </div>
    <div class=" mt-4">
    <div>
    <h2 class="card-title">Features</h2>
    <p>${tool.features['1'] ? tool.features['1'].feature_name : 'not available now'}</p>
    <p>${tool.features['2'] ? tool.features['2'].feature_name : 'not available now'}</p>
    <p>${tool.features['3'] ? tool.features['3'].feature_name : 'not available now'}</p>
    </div>
    <h2 class="card-title">Integrations</h2>
    <p>${tool.integrations[0]   ? tool.integrations[0] : 'not available now'}</p>
    <p>${tool.integrations[1]   ? tool.integrations[1] : 'not available now'}</p>
    <p>${tool.integrations[2]   ? tool.integrations[2] : 'not available now'}</p>
    <div>

    </div>
    
    </div>
    
  </div>

  

</div>
<div class="card card-compact w-96 bg-base-100 shadow-xl">
    <p class=" bg-red-500 ml-8 text-white w-50 z-10">${tool.accuracy ? tool.accuracy.score*100 : 'no input found'} % accuracy</p>
  <figure><img src="${tool.image_link[0] ? tool.image_link[0] : 'not found'}" alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title">${tool.input_output_examples[0] ? tool.input_output_examples[0].input : 'no input found'}</h2>
    <p>${tool.input_output_examples[0] ? tool.input_output_examples[0].output : 'no input found'}</p>
    
  </div>
</div>

<div class="modal-action self-start">
<label for="my-modal-5" class="btn rounded-lg bg-red-600">close</label>
</div>
                
              

</div>
             
    `


    
  
    

}

loadTools()