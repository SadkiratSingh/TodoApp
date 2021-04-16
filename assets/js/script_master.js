alert("hello World!")



const allTaskChecks = document.querySelectorAll('.task-marker');

allTaskChecks.forEach(function(item){
    item.addEventListener('click',function(event){
        item.parentElement.classList.toggle('selectToDelete');
    })
})

const deleteButton = document.querySelector('.delete-task');
deleteButton.addEventListener('click',function(event){
    let allTaskArray = Array.prototype.slice.call(allTaskChecks);
    const selectedItems = allTaskArray.filter((item)=>{
        return item.checked;
    })
    deleteAction(selectedItems) // contruct the ajax call from here //
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
        console.log(response);
    }
    catch(e){
        throw e;
    } 
}

