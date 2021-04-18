const renameCategoryButtons = document.querySelectorAll('.rename-category');
const manageCategory = document.querySelector('.manage-category');
const manageCategoryForms = document.querySelector('.manage-category-forms');

renameCategoryButtons.forEach(function(item){
    item.addEventListener('click',function(event){
        let categoryRenameForm = document.querySelector('.rename-category-form');
        let RenameFormCtrls = categoryRenameForm.elements;
        RenameFormCtrls['name'].value = item.parentElement.parentElement.querySelector('.category-name').innerText;
        RenameFormCtrls['org'].value = item.parentElement.parentElement.querySelector('.category-name').innerText;
    })
})

manageCategory.addEventListener('click',function(event){
    manageCategoryForms.classList.toggle('manage-category-forms-appear');
})