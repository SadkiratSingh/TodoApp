const allTaskChecks = document.querySelectorAll('.task-marker');
const allupdateButtons = document.querySelectorAll('.update-task-details');
const deleteButton = document.querySelector('.delete-task');
const updateForm = document.querySelector('.tasks-update-form');
const createButton = document.querySelector('.create-task');
const divCreateForm = document.querySelector('.create-task-form-wrapper');
const divUpdateForm = document.querySelector('.update-task-form-wrapper');
const alertButtons = document.querySelectorAll('.alert-icon');
const navLinks = document.querySelector('.nav-links');
const navigate = document.querySelector('.navigate');


allupdateButtons.forEach(function(item){
    item.addEventListener('click',function(event){
        let name = item.parentElement.querySelector('.task-name').innerText;
        let time = item.parentElement.querySelector('.task-time').innerText;
        let date = item.parentElement.querySelector('.task-date').innerText;
        let category = item.parentElement.querySelector('.task-category').innerText;
        let dateTimeObj = new Date(date.concat(",",time));
        let updateFormCtrls = updateForm.elements;
        updateFormCtrls['name'].value = name;
        updateFormCtrls['category'].value = category;
        updateFormCtrls['id'].value = item.parentElement.id;
        divUpdateForm.classList.toggle('form-visible');
    })
})

function getSelectedItems(){
    let allTaskArray = Array.prototype.slice.call(allTaskChecks);

    //filter method does not work on NodeList.
    let selectedItems = allTaskArray.filter((item)=>{
        return item.checked;
    })
    return selectedItems;
}

deleteButton.addEventListener('click',function(event){
    let selectedItems = getSelectedItems();

    // call to async function returns a promise
    deleteAction(selectedItems).then( 
        (res)=>{
            if(res.changes === 0){
                alert(res.message);
            }
            else{
                for(item of selectedItems){ //selectedItems accessible bcoz of closure
                    item.parentElement.style.display='none';
                }
            }
        },
        (err)=>console.log(err)
    )
});

createButton.addEventListener('click',function(event){
    divCreateForm.classList.toggle('form-visible');
})

navigate.addEventListener('click',function(){
    navLinks.classList.toggle('nav-visible');
})

alertButtons.forEach(function(item){
    item.addEventListener('click',function(event){
        alert(item.nextElementSibling.innerText);
    })
})


async function deleteAction(itemsToDelete){
    try{
        let response = await new Promise(function(resolve,reject){
            
                let httpObj = new XMLHttpRequest();
                httpObj.onreadystatechange = function(){
                    try{
                        if(this.readyState == 4 && this.status == 200){
                            resolve(JSON.parse(this.responseText));
                        }
                    }
                    catch(e){
                        reject(e.message); //message prop of error instance
                    }
                }

                httpObj.open('POST','delete/',true);

                let data = new URLSearchParams(); //generating the query string.
                for (let item of itemsToDelete){
                    data.append(item.name , item.parentElement.id);
                }

                // necessary step otherwise data wont be parsed by the express middleware
                httpObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

                httpObj.send(data);
            });
        return response;
    }
    catch(e){
        throw e;
    } 
}
