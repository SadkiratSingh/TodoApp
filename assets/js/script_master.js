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
    const selectedItem = allTaskArray.filter((item)=>{
        return item.checked;
    })
    console.log(selectedItem) // contruct the ajax call from here //
})
