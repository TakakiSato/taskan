$(function() {
    //タスクカードがクリックされたとき
    $(document).on('click','.task_cade_info',function(){
        //タスク名隠す
        $('div#'+$(this).attr('id')).css( 'display', 'none');
        $('#upd_' + $(this).attr('id'))
        .css( 'display', '')
        .focus();
        //タスク名コピー
        $('#upd_task_name_' + $(this).attr('id'))
        .val( $( '#task_name_' + $(this).attr('id')).text())
        //選択されている案件
        taskTypeSearch($("#project_choice_"+ $(this).attr('id').split('_')[1]).find("input[name='project_id']:checked").val(),$(this).attr('id').split('_')[1])
    });
    $('.upd_task_data').blur(function() {
        $('.upd_task_data').css( 'display', 'none');
        $('task_doing')
        .css( 'display', '');
    });
    //タスクカードの完了ボタンがクリックされたとき
    $(document).on('click','a.task-done-start',function(){
        //タスクカード非表示
        $('div#'+$(this).parent().attr('id')).css( 'display', 'none');
        //タスク更新フォーム非表示
        $('#upd_' + $(this).attr('id')).css( 'display', 'none');
        $('#task_done_' + $(this).parent().attr('id'))
        .css( 'display', '')
        .focus();
        return false;
    });
    $('.upd_task_data').blur(function() {
        $('.upd_task_data').css( 'display', 'none');
        $('task_doing')
        .css( 'display', '');
    });
});

function taskTypeSearch(checked_project,task_id){
    console.log("aaaaaaa")
    console.log(checked_project)
    console.log(task_id)
    if (checked_project){
        // 送信
        $.ajax({
            url: "task_types.json",
            type: "get",
            data: {project_id: checked_project,task_id: task_id,user_id: $('#user_id').val()},
            timeout: 10000,
            // 通信成功時の処理
            success: function(result, textStatus, xhr) {
                console.log("aaaaaaaa")
                console.log(result)
                $('#task_type_choice_' +result.task.task_id).empty();
                $('#project_choice_' +result.task.task_id).after(taskTypeChoiceBotton(result.task_type_list,result.task,result.charge_task_type));
                console.log(taskTypeChoiceBotton(result.task_type_list,result.task))
            }
        });

    }
}

$(document).on('change','.project_choice_button',function(){

    taskTypeSearch($("#project_choice_"+ $(this).attr('task_id')).find("input[name='project_id']:checked").val(),$(this).attr('task_id'))
});

