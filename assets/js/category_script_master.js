const renameCategoryButtons = document.querySelectorAll('.rename-category');
renameCategoryButtons.forEach(function(item){
    item.addEventListener('click',function(event){
        let categoryRenameForm = document.querySelector('.rename-category-form');
        let RenameFormCtrls = categoryRenameForm.elements;
        RenameFormCtrls['name'].value = item.parentElement.querySelector('.category-name').innerText;
        RenameFormCtrls['org'].value = item.parentElement.querySelector('.category-name').innerText;
    })
})