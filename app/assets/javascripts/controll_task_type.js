    function taskTypeListAdd(project_id,task_type,team_id,charge_task_type){
       //案件一覧初期化
       $('#' +project_id+ '_task_type').empty();
        //案件一覧表示
        $("#" +project_id).after('<div id=' +project_id+ '_task_type></div>');
        $('#' +project_id+ '_task_type').append('タスクタイプ一覧 <br><ul id=' +project_id+ '_task_type_ul>');
        $.each(task_type, function(i, item){
            console.log(item)
            console.log(charge_task_type)
            if ($.inArray(item.task_type_id,charge_task_type) == -1){
                $('#' +project_id+ '_task_type_ul').append(taskTypeChargeInacctive(item,$('#user_id').val()));
            }else{
                $('#' +project_id+ '_task_type_ul').append(taskTypeChargeAcctive(item,$('#user_id').val()));
            }
        });
                $('#' +project_id+ '_task_type').append("</ul>");
        //タスクタイプ追加ボタン表示
        $('#' +project_id+ '_task_type').append(taskTypeAddForm(project_id.split("_")[1],team_id));
    }
    $(function() {
        $(document).on('change','.task_type_charge_button',function(){
            if ($(this).prop("checked")==1){
                var checked=1
            }else{
                var checked=0
            }
            // 送信
            $.ajax({
                url: "member_task_types.json",
                type: "patch",
                data: {user_id: $(this).attr("user_id"),task_type_id: $(this).attr("task_type_id"),charge_task_type: checked},
                timeout: 10000,
                // 通信成功時の処理
                success: function(result, textStatus, xhr) {
                    //カレンダー再描画
                    var target_date = new Date();
                    weekDate=weekDateGet(target_date);
                    sendAjax(weekDate,target_date);
                }
            });
        });
    });