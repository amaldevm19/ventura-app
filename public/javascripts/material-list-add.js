document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.modal');
    let instances = M.Modal.init(elems);
    M.textareaAutoResize($('#material_description'));
    $('select').formSelect();
    $( "#add_new" ).submit(function( event ) {
        event.preventDefault();
        let data = {};
        data.materialModal = $("#material_modal").val();
        $("#material_modal").val('');
        data.materialDescription = $("#material_description").val();
        $("#material_description").val('');
        data.materialCategory = $("#material_category").val();
        $("#material_category").val('');
        data.materialBrand = $("#material_brand").val(); 
        $("#material_brand").val(''); 
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/materials/material-list-add",
            data: data,
            success: function (){
                M.toast({html: 'Successfully added new material to database!!!', classes: ' red lighten-1 rounded', displayLength:1000, completeCallback: function(){
                    location.reload(true);
                }});
            }
           
            });
        
    });

});
