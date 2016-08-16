    function projectListAdd(team_id,projects,member_select_project_list){
        //案件一覧初期化
        $('#team_' +team_id+ '_project').empty();
        //案件一覧表示
        $('#team_' +team_id+ '_member').after("<div id=team_"+team_id+"_project></div>");
        $('#team_' +team_id+ '_project').append('案件一覧 <br><ul id=team_' +team_id+ '_project_ul>');
        $.each(projects, function(i, item){
            if ($.inArray(item.project_id,member_select_project_list) == -1){
                $('#team_' +team_id+ '_project_ul').append(projectChargeInacctive($('#user_id').val(),item.project_id,item.project_name,team_id));
            }else{
                $('#team_' +team_id+ '_project_ul').append(projectChargeAcctive($('#user_id').val(),item.project_id,item.project_name,team_id));
            }
        });
        $('#team_' +team_id+ '_project').append("</ul>");
        //プロジェクト追加ボタン表示
        $('#team_' +team_id+ '_project').append(projectAddForm(team_id));
        //チーム詳細チュートリアルリンク表示
        $('#team_' +team_id+ '_project').append(teamDetailTutorial());
    }

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