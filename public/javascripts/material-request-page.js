$(() => {   
    /*$('#deliveryModal').modal();
    $('#add_to_delivery').click((event)=>{
        let checkBoxArray = $("input[type=checkbox]");
        let addToExisting = 
        let checkStatus = [];
        checkBoxArray.each((index,item)=>{
            if(item.checked==true){
                 console.log(item.id);
            }  
        })    
    })*/


    $('#change_status').formSelect();
    $('#modal2').modal();
    let master_materail_request_number;
    let materail_request_number;
    $(".changeStatus").click((event)=>{
        master_materail_request_number = $("#material_request_number").text();
        materail_request_number = event.target.id;
        console.log(master_materail_request_number);
        console.log(materail_request_number);
    })

$("#submit_status").click((event)=>{
    event.preventDefault();
    console.log();
    let changed_status = $("#change_status option:selected").val();
   location.href=`/materials/material-request-change-status?reqNumber=${master_materail_request_number}&status=${changed_status}&req=${materail_request_number}`;
})
let materialStatus = $(".changeStatus");
materialStatus.each((item)=>{
    if(materialStatus[item].innerText == 'COMPLETED'){
        let classList = materialStatus[item].getAttribute('class');
        classList += " green";
        materialStatus[item].setAttribute('class',classList)
    }else if(materialStatus[item].innerText == 'PENDING'){
        let classList = materialStatus[item].getAttribute('class');
        classList += " yellow";
        materialStatus[item].setAttribute('class',classList)
    }else if(materialStatus[item].innerText == 'OPEN'){
        let classList = materialStatus[item].getAttribute('class');
        classList += " teal";
        materialStatus[item].setAttribute('class',classList)
    }else if(materialStatus[item].innerText == 'DELIVERY'){
        let classList = materialStatus[item].getAttribute('class');
        classList += " red";
        materialStatus[item].setAttribute('class',classList)
    }
})



    $('#modal1').modal();
    $(".deleteReq").click((event)=>{
        event.preventDefault();
       if(!confirm("Are you sure?")){
           console.log("Success")
       }else{
        
        let master_material_request_number = $("#material_request_number").text();
        let material_request_number = event.target.parentNode.parentNode.parentNode.firstElementChild.textContent;
        window.location.href=`/materials/material-request-delete?master=${master_material_request_number}&req=${material_request_number}`;
        }
    })
    $('.tooltipped').tooltip();
    $("#add_item").bind("click",(event)=>{
        event.preventDefault();
        $.getJSON("/materials/material-request-add/get-all-material").done((data)=>{

            let categoryOptions = "<option value=''>Choose Category</option>";
            data.forEach((item)=>{
                categoryOptions = categoryOptions +'<option value="'+item.material_category+'">'+item.material_category+'</option>';
            })
            $("#select_category").html(categoryOptions);
            $("#select_category").change(function(){
                let selected =  $("#select_category").val();
                let brandOptions = "<option value=''>Choose Brand</option>";
                let filteredBrandArray =  data.filter((item)=>{
                    return item.material_category == selected;
                });
                filteredBrandArray.forEach((item)=>{
                    brandOptions = brandOptions +'<option value="'+item.material_brand+'">'+item.material_brand+'</option>';
                });
                $("#select_brand").html(brandOptions);
                $("#select_brand").change(function(){
                    let selected =  $("#select_brand").val();
                    let modelOptions = "<option value=''>Choose Model</option>";
                    let filteredModelArray =  filteredBrandArray.filter((item)=>{
                        return item.material_brand == selected;
                    })
                    filteredModelArray.forEach((item)=>{
                        modelOptions = modelOptions +'<option value="'+item.material_model+'">'+item.material_model+'</option>';
                    });
                    $("#select_model").html(modelOptions);
                    let material_request_number = $("#material_request_number").text();
                    console.log(material_request_number);
                    $("#newRequestForm").attr('action', `/materials/material-request-edit/${material_request_number}`);
                });
            })
        })
    })
})