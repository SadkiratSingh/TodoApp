const renameCategoryButtons = document.querySelectorAll('.rename-category');
const createCategory = document.querySelector('.create-category');
const createCategoryForm = document.querySelector('.create-category-form-wrapper');
const renameCategoryForm = document.querySelector('.rename-category-form-wrapper');

renameCategoryButtons.forEach(function(item){
    item.addEventListener('click',function(event){
        let categoryRenameForm = document.querySelector('.rename-category-form');
        let RenameFormCtrls = categoryRenameForm.elements;
        RenameFormCtrls['name'].value = item.parentElement.parentElement.querySelector('.category-name').innerText;
        RenameFormCtrls['org'].value = item.parentElement.parentElement.querySelector('.category-name').innerText;
        renameCategoryForm.classList.toggle('form-visible');
    })
})

createCategory.addEventListener('click',function(event){
    createCategoryForm.classList.toggle('form-visible');
})