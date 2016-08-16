//部品
    //完了登録用フォーム
    function taskDoneForm(task){
        return '<div id="task_done_task_' +task.task_id+'" style="display:none;">\
        <form action="/tasks/'+task.task_id+'.json" method="patch" class="js-submit" >\
        <input name="task_id" type="hidden" value="' + task.task_id + '">\
        <input name="complete_flag" type="hidden" value=1><br>作業時間実績:<br>\
        ' + taskResultTimeButton() +'\
        <input class="btn btn-primary" name="commit" type="submit" value="送信">\
        </form>\
        </div>'
    }

    //タスク修正フォーム
    function modifyTask(task,user_id,date,charge_project){
        console.log("task.task_memo")
        console.log(task.task_memo)
        return '<div id="upd_task_'+task.task_id+'"style="display:none;">\
        <form action="/tasks/'+task.task_id+'.json" method="patch" class="js-submit" >\
        タスク名:<br><input id="upd_task_name_'+task.task_id+'" name="task_name" type="text" value="' + task.task_name + '">\
        <br>予定作業時間:<br>\
        ' + taskPlanTimeButton() +'\
        期限：<br><input type="date" name="dead_line" value=' + task.dead_line+ '>\
        ' + projectChoiceBotton(charge_project,task) +'\
        <br><input class="btn btn-primary" name="commit" type="submit" value="送信">\
        <br>メモ：<br><textarea name="task_memo" rows="3">'+ task.task_memo + '</textarea>\
        </form>\
        </div>'
    }

    //タスク追加フォーム
    function createTaskForm(user_id,date,charge_project){
        return '<td><div class="add-task js-form">\
        <form action="/tasks.json" method="post" class="js-submit none" id=add-task-form">\
        タスク名:<br><input id="task-input" name="task_name" type="text">\
        <input name="user_id" type="hidden" value="' + user_id + '">\
        <input name="date" type="hidden" value="' + date + '">\
        <br>予定作業時間:<br>\
        ' + taskPlanTimeButton() +'\
        期限：<br><input type="date" name="dead_line">\
        ' + projectChoiceBotton(charge_project,{task_id:date}) +'\
        <br><input class="btn btn-primary add-task-child" name="commit" type="submit" value="送信">\
        <br>メモ：<br><textarea name="task_memo" rows="3"></textarea>\
        </form>'
    }


    //アクティブタスク
    function activeTask(task){
        return '<div id="'+ task.task_id +'" class="task_cade task_doing task_doing_collor" draggable="true" ondragstart="onDragStart( event );">\
        <div id="task_'+ task.task_id +'" class= "task_cade_info">\
        <strong id=task_name_'+task.task_id+'>' + task.task_name + '</strong>\
        <br>予定:<span class="plan_time">' +task.plan_time + '</span>h 実績:<br>'

    }

    //完了ボタン
    function doneBotton(){
        return '<a class="task-done-start btn btn-default">完了</a>'
    }

    function taskAddBotton(j,k){
        return '<div class="add-task-tmp"><a class="add-task-child btn btn-default ' + j + k +'" >タスクを追加</a></div></div></td>'
    }

    //案件追加フォーム
    function projectAddForm(team_id){
        return '\
        <div data-intro="「案件を作成する」を押すと案件名入力フォームが表示されます。<br>案件名を入力して作成ボタンを押してください<br><strong>※作成ボタンを押してもフォームのクリアはされませんが処理はされています。</strong><br>案件作成後、「担当案件」を選択してください。<br>選択された担当案件が、タスク作成時に選択できるようになります。" data-step="7">\
        <div class="btn btn-default project_add_form_toggle" id="' + team_id +'" >\
        <p class="fa fa-tasks"> 案件を作成する</p>\
        </div>\
        <div id="make_project_'+ team_id +'"style="display:none;">\
        <form action="/projects.json" class="js-submit" method="post">\
        <input id="team_id" name="team_id" type="hidden" value="'+team_id+'" />\
        案件名:\
        <input id="project_name" name="project_name" type="text" />\
        <input class="btn btn-primary " name="commit" type="submit" value="作成" />\
        </form>\
        </div>\
        </div>'
    }

    //担当案件追加ボタン
    function projectChargeAcctive(user_id,project_id,project_name,team_id){
        return '\
        <li>' + project_name + '\
        <div class="check-group clearfix">\
        <div>\
        <div data-intro="自分が担当している案件の「担当案件」を選択してください。<br>選択された担当案件が、タスク作成時に選択できるようになります。" data-step="8">\
        <input id="project_charge_'+ user_id +'_' + project_id+'" class="project_charge_button" user_id='+ user_id +' project_id=' + project_id+' type="checkbox" name="check[]" value="1" checked/>\
        <label for="project_charge_'+ user_id +'_' + project_id+'">担当案件</label>\
        </div>\
        '+taskTypeListForm(project_id,user_id,team_id)+'\
        </li>'
    }

    //担当案件解除ボタン
    function projectChargeInacctive(user_id,project_id,project_name,team_id){
        return '\
        <li>' + project_name + '\
        <div class="check-group clearfix">\
        <div>\
        <input id="project_charge_'+ user_id +'_' + project_id+'" class="project_charge_button" user_id='+ user_id +' project_id=' + project_id+' type="checkbox" name="check[]" value="1" />\
        <label for="project_charge_'+ user_id +'_' + project_id+'">担当案件</label>\
        </div>\
        </div>\
        '+taskTypeListForm(project_id,user_id,team_id)+'\
        </li>'
    }

    //担当案件追加ボタン
    function taskTypeChargeAcctive(task_type,user_id){
        return '\
        <li>' + task_type.type_name + '\
        <div class="check-group clearfix">\
        <div>\
        <input id="task_type_charge_'+ user_id +'_' + task_type.task_type_id+'" class="task_type_charge_button" user_id='+ user_id +' task_type_id=' + task_type.task_type_id+' type="checkbox" name="check[]" value="1" checked/>\
        <label for="task_type_charge_'+ user_id +'_' + task_type.task_type_id+'">担当</label>\
        </div>\
        </div>\
        </li>'
    }

    //担当案件解除ボタン
    function taskTypeChargeInacctive(task_type,user_id){
        return '\
        <li>' + task_type.type_name + '\
        <div class="check-group clearfix">\
        <div>\
        <input id="task_type_charge_'+ user_id +'_' + task_type.task_type_id+'" class="task_type_charge_button" user_id='+ user_id +' task_type_id=' + task_type.task_type_id+' type="checkbox" name="check[]" value="1" />\
        <label for="task_type_charge_'+ user_id +'_' + task_type.task_type_id+'">担当</label>\
        </div>\
        </div>\
        </li>'
    }



    //タスクタイプ一覧表示フォーム
    function taskTypeListForm(project_id,user_id,team_id){
        return '<form action="/task_types.json" class="js-submit" id= "project_' + project_id + '" method="get">\
        <input id="project_id" name="project_id" type="hidden" value="' + project_id + '" />\
        <input name="user_id" type="hidden" value=' + user_id+'>\
        <input name="team_id" type="hidden" value=' + team_id+'>\
        <div data-intro="案件の設定と同様に、「タスクタイプ表示」を押してタスクタイプの設定をしてください。<br>案件とタスクタイプが分析時の集計軸になります。<br>タスクタイプの例：「外出」、「レビュー」" data-step="9">\
        <input class="btn btn-default btn-team-size" name="commit" type="submit" value="タスクタイプ表示" />\
        </div>\
        </form>'
    }

    //タスクタイプ追加フォーム
    function taskTypeAddForm(project_id,team_id){
        return '<div class="btn btn-default task_type_add_form_toggle" id="' + project_id +'" >\
        <p class="fa fa-tasks"> タスクタイプを追加する</p>\
        </div>\
        <div id="make_task_type_'+ project_id +'"style="display:none;">\
        <form action="/task_types.json" class="js-submit" method="post">\
        <input id="team_id" name="team_id" type="hidden" value="'+team_id+'" />\
        <input id="project_id" name="project_id" type="hidden" value="'+project_id+'" />\
        タスクタイプ名:\
        <input id="type_name" name="type_name" type="text" />\
        <input class="btn btn-primary " name="commit" type="submit" value="作成" />\
        </form>\
        </div>'
    }

    //作業時間入力ボタン
    function taskPlanTimeButton(){
        return '<div class="btn-group" data-toggle="buttons" name="plan_time"><label class="btn btn-default task_time_button">\
        <input type="radio" autocomplete="off" value="0.5" name="plan_time">0.5</label><label class="btn btn-default task_time_button">\
        <input type="radio" autocomplete="off" value=1 name="plan_time">1</label><label class="btn btn-default task_time_button">\
        <input type="radio" autocomplete="off" value=1.5 name="plan_time">1.5</label><label class="btn btn-default task_time_button">\
        <input type="radio" autocomplete="off" value=2 name="plan_time">2</label><label class="btn btn-default task_time_button">\
        <input type="radio" autocomplete="off" value=2.5 name="plan_time">2.5</label><label class="btn btn-default task_time_button">\
        <input type="radio" autocomplete="off" value=3 name="plan_time">3</label><label class="btn btn-default task_time_button">\
        <input type="radio" autocomplete="off" value=3.5 name="plan_time">3.5</label><label class="btn btn-default task_time_button">\
        <input type="radio" autocomplete="off" value=4 name="plan_time">4</label>\
        </div>'
    }

    //作業時間入力ボタン
    function taskResultTimeButton(){
        return '<div class="btn-group" data-toggle="buttons" name="result_time"><label class="btn btn-default task_time_button">\
        <input type="radio" autocomplete="off" value="0.5" name="result_time">0.5</label><label class="btn btn-default task_time_button">\
        <input type="radio" autocomplete="off" value=1 name="result_time">1</label><label class="btn btn-default task_time_button">\
        <input type="radio" autocomplete="off" value=1.5 name="result_time">1.5</label><label class="btn btn-default task_time_button">\
        <input type="radio" autocomplete="off" value=2 name="result_time">2</label><label class="btn btn-default task_time_button">\
        <input type="radio" autocomplete="off" value=2.5 name="result_time">2.5</label><label class="btn btn-default task_time_button">\
        <input type="radio" autocomplete="off" value=3 name="result_time">3</label><label class="btn btn-default task_time_button">\
        <input type="radio" autocomplete="off" value=3.5 name="result_time">3.5</label><label class="btn btn-default task_time_button">\
        <input type="radio" autocomplete="off" value=4 name="result_time">4</label>\
        </div>'
    }


    //案件選択ボタン
    function projectChoiceBotton(charge_project_array,task){
        var button ='<br>案件選択:<br><div class="btn-group" data-toggle="buttons" name="project_choice" id=project_choice_' + task.task_id +'>'
        $.each(charge_project_array, function(i,charge_project){
            if (task.project_id == charge_project.project_id){
                button = button + '<label class="btn btn-default project_choice_button active" task_id='+ task.task_id+'><input type="radio" autocomplete="off" value="'+charge_project.project_id+'" name="project_id" checked>'+charge_project.project_name+ '</label>'
            }else{
                button = button + '<label class="btn btn-default project_choice_button" task_id='+ task.task_id+'><input type="radio" autocomplete="off" value="'+charge_project.project_id+'" name="project_id" task_id='+ task.task_id+'>'+charge_project.project_name+ '</label>'
            }
        });
        button=button + '</div>'
        return button
    }

    //タスクタイプ選択ボタン
    function taskTypeChoiceBotton(task_type_array,task,charge_task_type_array){
        var button ='<div class="btn-group" data-toggle="buttons" name="task_type_choice" id=task_type_choice_' + task.task_id +'>タイプ選択:<br>'
        $.each(task_type_array, function(i,task_type){
            if ($.inArray(task_type.task_type_id,charge_task_type_array) != -1){
                if (task.task_type_id == task_type.task_type_id){
                    button = button + '<label class="btn btn-default active"><input type="radio" autocomplete="off" value="'+task_type.task_type_id+'" name="task_type_id" checked>'+task_type.type_name+ '</label>'
                }else{
                    button = button + '<label class="btn btn-default"><input type="radio" autocomplete="off" value="'+task_type.task_type_id+'" name="task_type_id">'+task_type.type_name+ '</label>'
                }
            }
        });
        button=button + '</div>'
        return button
    }
    //メンバー一覧フォーム
    function memberListForm(team_id,team_name,user_id){
        return '\
        <form action="/member_teams.json" class="js-submit" id= "' + team_id + '" method="get"><input id="team_id" name="team_id" type="hidden" value="' + team_id + '" />\
        <input class="btn btn-default btn-team-size" name="commit" type="submit" value="' +team_name +'" />\
        <input name="user_id" type="hidden" value=' + user_id+'>\
        </form>'
    }

    //チーム詳細チュートリアルボタン
    function teamDetailTutorial(){
        return '\
        <br><a id="team_detail_tutorial">チーム詳細チュートリアル</a>'
    }


//htmlくみ上げ
    //完了タスク
    function doneTask(task){
        return '<div id='+ task.task_id +' class="task_cade task_done_collor"><strong>' + task.task_name + '</strong><br>予定:<span class="plan_time">'  +task.plan_time + '</span>h　実績:<span class="result_time">' +task.result_time + '</span>h<br></div>';
    }

    //自分のスケジュール済みタスク
    function ownScaduledTask(task,user_id,date,charge_project){
        console.log(task)
        console.log(user_id)
        console.log(date)
        console.log(charge_project)
        return activeTask(task)+doneBotton() +'</div>'+ taskDoneForm(task) + modifyTask(task,user_id,date,charge_project)
    }

    //自分の未スケジュールタスク
    function ownNotScaduledTask(task,user_id,date,charge_project){
        return activeTask(task)　+'</div>'+　taskDoneForm(task) + modifyTask(task,user_id,date,charge_project)
    }

    //メンバーのタスク
    function memberTask(task,user_id,date,charge_project){
        return activeTask(task)　+'</div>'+　taskDoneForm(task) + modifyTask(task,user_id,date,charge_project)
    }

    //タスク追加フォーム
    function addTask(user_id,date,j,k,charge_project){
        return createTaskForm(user_id,date,charge_project) + taskAddBotton(j,k)
    }