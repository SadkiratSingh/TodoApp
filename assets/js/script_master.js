const allTaskChecks = document.querySelectorAll('.task-marker');
const allupdateButtons = document.querySelectorAll('.update-task-details');
const deleteButton = document.querySelector('.delete-task');
const updateForm = document.querySelector('.tasks-update-form');

allTaskChecks.forEach(function(item){
    item.addEventListener('click',function(event){
        item.parentElement.classList.toggle('selectToDelete');
    })
})

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
    })
})

function getSelectedItems(){
    let allTaskArray = Array.prototype.slice.call(allTaskChecks);
    let selectedItems = allTaskArray.filter((item)=>{
        return item.checked;
    })
    return selectedItems;
}

deleteButton.addEventListener('click',function(event){
    let selectedItems = getSelectedItems();
    deleteAction(selectedItems).then( // contruct the ajax call from here //
        (res)=>{
            console.log(res);
            for(item of selectedItems){
                item.parentElement.style.display='none';
            }
        },
        (err)=>console.log(err)
    )
});



async function deleteAction(itemsToDelete){
    try{
        let response = await (function(itemsTodelete){
            return new Promise(function(resolve,reject){
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
                httpObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                httpObj.send(data);
            })
        })();
        return response;
    }
    catch(e){
        throw e;
    } 
}



