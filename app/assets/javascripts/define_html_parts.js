//部品
    //完了登録用フォーム
    function taskDoneForm(task){
        return '<div id="task_done_task_' +task.task_id+'" style="display:none;">\
        <form action="/tasks/'+task.task_id+'.json" method="patch" class="js-submit" >\
        <input name="task_id" type="hidden" value="' + task.task_id + '">\
        <input name="complete_flag" type="hidden" value=1><br>作業時間実績:<br>\
        <div class="btn-group" data-toggle="buttons" name="result_time"><label class="btn btn-default">\
        <input type="radio" autocomplete="off" value="0.5" name="result_time">0.5</label><label class="btn btn-default">\
        <input type="radio" autocomplete="off" value=1 name="result_time">1</label><label class="btn btn-default">\
        <input type="radio" autocomplete="off" value=2 name="result_time">2</label><label class="btn btn-default">\
        <input type="radio" autocomplete="off" value=3 name="result_time">3</label><label class="btn btn-default">\
        <input type="radio" autocomplete="off" value=4 name="result_time">4</label>\
        </div>\'<input class="btn btn-primary" name="commit" type="submit" value="送信">\
        </form>\
        </div>'
    }

    //タスク修正フォーム
    function modifyTask(task,user_id,date){
        return '<div id="upd_task_'+task.task_id+'"style="display:none;">\
        <form action="/tasks/'+task.task_id+'.json" method="patch" class="js-submit" >\
        タスク名:<br><input id="upd_task_name_'+task.task_id+'" name="task_name" type="text" value="' + task.task_name + '">\
        <br>予定作業時間:<br><div class="btn-group" data-toggle="buttons" name="plan_time">\
        <label class="btn btn-default">\
        <input type="radio" autocomplete="off" value="0.5" name="plan_time">0.5</label><label class="btn btn-default">\
        <input type="radio" autocomplete="off" value=1 name="plan_time">1</label><label class="btn btn-default">\
        <input type="radio" autocomplete="off" value=2 name="plan_time">2</label><label class="btn btn-default">\
        <input type="radio" autocomplete="off" value=3 name="plan_time">3</label><label class="btn btn-default">\
        <input type="radio" autocomplete="off" value=4 name="plan_time">4</label></div>\
        <input class="btn btn-primary" name="commit" type="submit" value="送信">\
        </form>\
        </div>'
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

    //タスク追加フォーム
    function createTaskForm(user_id,date){
        return '<td><div class="add-task js-form">\
        <form action="/tasks.json" method="post" class="js-submit none" id=add-task-form">\
        タスク名:<br><input id="task-input" name="task_name" type="text"><input name="user_id" type="hidden" value="' + user_id + '">\
        <input name="date" type="hidden" value="' + date + '"><br>予定作業時間:<br><div class="btn-group" data-toggle="buttons" name="plan_time">\
        <label class="btn btn-default">\
        <input type="radio" autocomplete="off" value="0.5" name="plan_time">0.5</label><label class="btn btn-default">\
        <input type="radio" autocomplete="off" value=1 name="plan_time">1</label><label class="btn btn-default">\
        <input type="radio" autocomplete="off" value=2 name="plan_time">2</label><label class="btn btn-default">\
        <input type="radio" autocomplete="off" value=3 name="plan_time">3</label><label class="btn btn-default">\
        <input type="radio" autocomplete="off" value=4 name="plan_time">4</label></div>\
        <input class="btn btn-primary add-task-child" name="commit" type="submit" value="送信">\
        </form>'
    }

    function taskAddBotton(j,k){
        return '<div class="add-task-tmp"><a class="add-task-child btn btn-default ' + j + k +'" >タスクを追加</a></div></div></td>'
    }
//htmlくみ上げ
    //完了タスク
    function doneTask(task){
        return '<div id='+ task.task_id +' class="task_cade task_done_collor"><strong>' + task.task_name + '</strong><br>予定:<span class="plan_time">'  +task.plan_time + '</span>h　実績:<span class="result_time">' +task.result_time + '</span>h<br></div>';
    }

    //自分のスケジュール済みタスク
    function ownScaduledTask(task,user_id,date){
//        return taskDoneForm(task) + modifyTask(task,user_id,date) + activeTask(task)+doneBotton()
return activeTask(task)+doneBotton() +'</div>'+ taskDoneForm(task) + modifyTask(task,user_id,date)
}

    //自分の未スケジュールタスク
    function ownNotScaduledTask(task,user_id,date){
        return activeTask(task)　+'</div>'+　taskDoneForm(task) + modifyTask(task,user_id,date)
    }

    //メンバーのタスク
    function memberTask(task,user_id,date){
        return activeTask(task)　+'</div>'+　taskDoneForm(task) + modifyTask(task,user_id,date)
    }

    //タスク追加フォーム
    function addTask(user_id,date,j,k){
        return createTaskForm(user_id,date) + taskAddBotton(j,k)
    }