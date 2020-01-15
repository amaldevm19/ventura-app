$(() => {
    $('#filter_category').formSelect();
    $('#filter_model').formSelect();
    $('#modal1').modal();
    $('#modal2').modal();
    $("#filter_category_button").unbind().bind("click", (e) => {
        let elems = document.querySelectorAll('#modal1');
        let instances = M.Modal.init(elems, {onCloseEnd: ()=>{
            let filter_cat_name = document.getElementById('filter_category');
            let filter_cat = filter_cat_name.value.trim();
            window.location.href = `/materials/material-list?filter_cat=${filter_cat}&filter_name=material_category`;
        }});
    });
    $("#filter_model_button").unbind().bind("click", (e) => {
        let elems = document.querySelectorAll('#modal2');
        let instances = M.Modal.init(elems, {onCloseEnd: ()=>{
            let filter_cat_name = document.getElementById('filter_model');
            let filter_cat = filter_cat_name.value.trim();
            window.location.href = `/materials/material-list?filter_cat=${filter_cat}&filter_name=material_model`;
        }});
    });
    console.log($("#hidden_for_disabled_button").val());
    if($("#hidden_for_disabled_button").val()=="false"){
      console.log()
      $(".delete-button").attr("disabled","disabled")
    }
  });