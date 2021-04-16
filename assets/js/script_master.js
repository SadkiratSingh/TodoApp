const allTaskChecks = document.querySelectorAll('.task-marker');
const allupdateButtons = document.querySelectorAll('update-task-details');
const deleteButton = document.querySelector('.delete-task');

allTaskChecks.forEach(function(item){
    item.addEventListener('click',function(event){
        item.parentElement.classList.toggle('selectToDelete');
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



