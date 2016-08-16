    $(function() {
        $(document).on('change','.project_charge_button',function(){
            if ($(this).prop("checked")==1){
                var checked=1
            }else{
                var checked=0
            }
            // 送信
            $.ajax({
                url: "member_projects.json",
                type: "patch",
                data: {user_id: $(this).attr("user_id"),project_id: $(this).attr("project_id"),charge_project: checked},
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