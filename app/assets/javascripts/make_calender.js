$(function() {
 function getDateTime(format, add_day){
    if (format == null) format = null;
    if (add_day == null) add_day = 0;

    var obj = {};
    var dt = new Date();

    dt.setTime(dt.getTime() + add_day * 60*1000*60*24);
    var week_jp = ['日','月','火','水','木','金','土'];
    obj.Y = dt.getFullYear();
    obj.m = ('0'+(dt.getMonth() + 1)).slice(-2);
    obj.n = dt.getMonth() + 1;
    obj.d = ('0'+dt.getDate()).slice(-2);
    obj.j = dt.getDate();
    obj.H = ('0'+dt.getHours()).slice(-2);
    obj.G = dt.getHours();
    obj.i = ('0'+dt.getMinutes()).slice(-2);
    obj.s = ('0'+dt.getSeconds()).slice(-2);
    obj.w = dt.getDay();
    obj.w_jp = week_jp[dt.getDay()];
    if(format != null){
        var str = format;
        str = str.replace('w_jp', obj.w_jp);
        str = str.replace('Y', obj.Y);
        str = str.replace('m', obj.m);
        str = str.replace('n', obj.n);
        str = str.replace('d', obj.d);
        str = str.replace('j', obj.j);
        str = str.replace('H', obj.H);
        str = str.replace('G', obj.G);
        str = str.replace('i', obj.i);
        str = str.replace('s', obj.s);
        str = str.replace('w', obj.w);
        return str;
    }else{
        return obj;
    }
};

function weekDateGet(){
        // Dateオブジェクトを作成
        var today = new Date() ;
        var pastDay = -today.getDay();
        console.log(today)
        console.log(pastDay)
        //今週の経過日数取得
        var targetWeek = new Array( 7 );
        $.each(targetWeek,function(i,item){
            //targetWeek[i]=getDateTime('Y/m/d(w_jp)',pastDay+i);
            targetWeek[i]=getDateTime('Y-m-d',pastDay+i);
        });
        return targetWeek;
    }


    function createTable(task_lists,week){
        console.log(task_lists)
        //自分を先頭にソート
        $.each(task_lists, function(i, task_list){
            if ($('#user_id').val() == task_list.user_id){
                task_lists.unshift(task_list);
                task_lists.splice(i+1, 1);
            }
        });

        //table作成
        var table = $('<table>');
        //日付列作成
        var th = $('<tr><th class=name_col></th>')
        console.log(week);
        $.each(week,function(i,item){
            th.append('<th class=date_col>' + week[i] + '</th>');
        });
        table.append($('<thead>').append(th));
        var tbody = $('<tbody>');
        $.each(task_lists, function(j, usr_task_list){
            //名前表示
            if (j==0){
                var td = $('<tr><td rowspan=2>' + usr_task_list.user_name + '</td>')
            }else {
                var td = $('<tr><td>' + usr_task_list.user_name + '</td>')
            }
            //タスク表示
            $.each(weekDate, function(k, date){
                var tasktd = $('<td class="'+ date +'" id="'+usr_task_list.user_id+'_'+ date +'" ondrop="onDrop( event, this );"ondragover="onDragOver( event );">')
                $.each(usr_task_list.week_task_list, function(l, task_list){
                    if (task_list.date==date.replace( /\//g , "-" )){
                        $.each(task_list.task_list, function(m, task){
                            if (task.complete_flag == 1){
                                //完了タスクの場合
                                tasktd.append('<div id='+ task.task_id +' class="task_cade task_done_collor"><strong>' + task.task_name + '</strong><br>予:' +task.plan_time + '実:' +task.result_time + '<br></div>')
                            }else if(j==0){
                                //自分のタスクの場合
                                tasktd.append('<div class="add-task js-form"><form action="/tasks/'+task.task_id+'.json" method="patch" class="task_done none" id=add-task-form' + j + k +'"><input name="task_id" type="hidden" value="' + task.task_id + '"><input name="complete_flag" type="hidden" value=1><br>作業時間実績:<br><div class="btn-group" data-toggle="buttons" name="result_time"><label class="btn btn-default"><input type="radio" autocomplete="off" value="0.5" name="result_time">0.5</label><label class="btn btn-default"><input type="radio" autocomplete="off" value=1 name="result_time">1</label><label class="btn btn-default"><input type="radio" autocomplete="off" value=2 name="result_time">2</label><label class="btn btn-default"><input type="radio" autocomplete="off" value=3 name="result_time">3</label><label class="btn btn-default"><input type="radio" autocomplete="off" value=4 name="result_time">4</label></div><input class="btn btn-primary add-task-child" name="commit" type="submit" value="送信"></form><div id='+ task.task_id +' class="task_cade task_doing_collor" draggable="true" ondragstart="onDragStart( event );"><strong>' + task.task_name + '</strong><br>予:' +task.plan_time + '実<br><a class="add-task-child btn btn-default"' + j + k +'" >完了</a></div>')
                            }else{
                                //他人のタスクの場合
                                tasktd.append('<div class="add-task js-form"><form action="/tasks/'+task.task_id+'.json" method="patch" class="js-submit none" id=add-task-form' + j + k +'"><input name="task_id" type="hidden" value="' + task.task_id + '"><input name="complete_flag" type="hidden" value=1><br>作業時間実績:<br><div class="btn-group" data-toggle="buttons" name="result_time"><label class="btn btn-default"><input type="radio" autocomplete="off" value=0    .5 name="result_time">0.5</label><label class="btn btn-default"><input type="radio" autocomplete="off" value=1 name="result_time">1</label><label class="btn btn-default"><input type="radio" autocomplete="off" value=2 name="result_time">2</label><label class="btn btn-default"><input type="radio" autocomplete="off" value=3 name="result_time">3</label><label class="btn btn-default"><input type="radio" autocomplete="off" value=4 name="result_time">4</label></div><input class="btn btn-primary add-task-child" name="commit" type="submit" value="送信"></form><div id='+ task.task_id +' class="task_cade task_doing_collor" draggable="true" ondragstart="onDragStart( event );"><strong>' + task.task_name + '</strong><br>予:' +task.plan_time + '実<br>')
                            }
                        });
                    }
                });
                td.append(tasktd);
            });
            tbody.append(td);
            if (j==0){
                var comp_button_tr =$('<tr>');
                $.each(weekDate, function(k, date){
                    //タスク追加ボタン
                    comp_button_tr.append('<td><div class="add-task js-form"><form action="/tasks.json" method="post" class="make-task none" id=add-task-form' + j + k +'">タスク名:<br><input id="task-input"' +j + k +' name="task_name" type="text"><input name="user_id" type="hidden" value="' + $('#user_id').val() + '"><input name="date" type="hidden" value="' + week[k] + '"><br>予定作業時間:<br><div class="btn-group" data-toggle="buttons" name="plan_time"><label class="btn btn-default"><input type="radio" autocomplete="off" value="0.5" name="plan_time">0.5</label><label class="btn btn-default"><input type="radio" autocomplete="off" value=1 name="plan_time">1</label><label class="btn btn-default"><input type="radio" autocomplete="off" value=2 name="plan_time">2</label><label class="btn btn-default"><input type="radio" autocomplete="off" value=3 name="plan_time">3</label><label class="btn btn-default"><input type="radio" autocomplete="off" value=4 name="plan_time">4</label></div><input class="btn btn-primary add-task-child" name="commit" type="submit" value="送信"></form><div class="add-task-tmp"><a class="add-task-child btn btn-default"' + j + k +'" >タスクを追加</a></div></div></td>')
                });
                tbody.append(comp_button_tr);
            }
        });
        table.append(tbody);
        $("#calendar").append(table);
    }

    //main処理
    var day;
    //day=new Date("2005/4/17")
    weekDate=weekDateGet();
    console.log(weekDate);
    sendAjax(weekDate);

    $(document).on('click','.other-week',function(){
        sendAjax($(this.id));
    });



    function sendAjax(weekDate){
       // 送信
       $.ajax({
        url: '/tasks.json',
        type: 'get',
        data: {user_id: $('#user_id').val(),date: weekDate[0]},
        timeout: 10000,
            // 通信成功時の処理
            success: function(result, textStatus, xhr) {
            //console.log(result);
            console.log(result);
            createTable(result.task_list,weekDate);
        },
            // 通信失敗時の処理
            error: function(xhr, textStatus, error) {}
        });
   }
});


