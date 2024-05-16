const getIphone= async function (page) {  
 const skip = (page-1)*10; 
 const data = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`); 
 const result =  await data.json();   
return result; 
}

const displayProducts= async (page=1)=>{
    const result = await getIphone(page);
    const products =  result.products; 
    console.log(products);
      const numberofPages= result.total/result.limit; 
    
     const finalResulet=   products.map(produc=>
      `<div class="col-lg-3 col-md-4 col-sm-6" >
       <div class="card" style="width: 18rem;">
       <img src="${produc.thumbnail}"class="card-img-top" alt="...">
       <div class="card-body">
       <h5 class="card-title">${produc.title}</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
       </div>
       </div>
      ` );
      let paginationNumber= " "; 
      if (page==1){
        paginationNumbers= `
        <li class="page-item"><button class="page-link disabled">Previous</button></li>
        `;
      
      }else {
     paginationNumbers= `
      <li class="page-item"><button class="page-link" onclick=displayProducts(${page-1})>Previous</button></li>
      `;}
      for (let i=1; i<=numberofPages; i++){
        if (i ==page) {
    paginationNumbers += `<li class="page-item"><button class="page-link active" href="#" onclick=displayProducts(${i})>${i}</button></li>`;
        } else {
          paginationNumbers += `<li class="page-item"><button class="page-link" href="#" onclick=displayProducts(${i})>${i}</button></li>`;


        }   
  
  }
      if (page==numberofPages){
    paginationNumbers +=`<li class="page-item"><button class="page-link disabled">Next</button></li>`;
      }else {
        paginationNumbers +=`<li class="page-item"><button class="page-link" onclick=displayProducts(${page+1})>Next</button></li>`;


      }
      document.querySelector(".row").innerHTML = finalResulet.join(' ');
      document.querySelector(".pagination").innerHTML = paginationNumbers;


}
displayProducts();

