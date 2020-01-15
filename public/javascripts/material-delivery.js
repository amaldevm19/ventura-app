$(() => {
    $('#change_status').formSelect();
    $('#modal1').modal();
    if($('#isAdmin').val() == "false"){
    $('.check-admin').each((index, item)=>{
        item.setAttribute('disabled','disabled');
    })
    }
    let master_materail_request_number;
    $(".changeStatus").click((event)=>{
        master_materail_request_number = event.target.id;
    })

    $("#submit_status").click((event)=>{
        event.preventDefault();
        console.log();
        let changed_status = $("#change_status option:selected").val();
       location.href=`/materials/material-request-edit-delivery?reqNumber=${master_materail_request_number}&status=${changed_status}`;
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
            materialStatus[item].setAttribute('disabled','disabled')
            classList += " red";
            materialStatus[item].setAttribute('class',classList)
        }
    })
 })