$(function() {
//$('.js-submit').submit(function(event) {
//$('.js-form').on('submit','.js-submit',function(){
    $(document).on('submit','.js-submit',function(){
        // HTMLでの送信をキャンセル
        event.preventDefault();
        // 操作対象のフォーム要素を取得
        var $form = $(this);
        // 送信ボタンを取得
        // （後で使う: 二重送信を防止する。）
        var $button = $form.find('button');
        // 送信
        $.ajax({
            url: $form.attr('action'),
            type: $form.attr('method'),
            data: $form.serialize(),
            timeout: 10000,

            // 送信前
            beforeSend: function(xhr, settings) {
                // ボタンを無効化し、二重送信を防止
                $button.attr('disabled', true);
            },
            // 応答後
            complete: function(xhr, textStatus) {
                // ボタンを有効化し、再送信を許可
                $button.attr('disabled', false);
            },

            // 通信成功時の処理
            success: function(result, textStatus, xhr) {
                    //エラーチェック
                    if (result.success==true){
                        console.log("aaaaaa ")
                        //teamsのcreate呼び出しの場合
                        if ($form.attr('action')=='/teams.json'&& $form.attr('method')=='post'){
                        // 入力値を初期化
                        $form[0].reset();
                        searchTeamName();
                        //メソッド事に処理ふり和江家
                        //member一覧表示後/////////////////////////////////////////////////
                    }else if ($form.attr('action')=='/member_teams.json'&& $form.attr('method')=='get'){
                        memberListAdd($form.attr('id'),result.belong_users,$("#user_id").attr("value"));
                        projectListAdd($form.attr('id'),result.belong_projects,$("#user_id").attr("value"));
                        //タスク更新,作成の場合////////////////////////////////////////////////////
                    }else if (($form.attr('action')=='/tasks.json' && $form.attr('method')=='post')||($form.attr('action')=='/tasks/'+result.task.task_id+'.json' && $form.attr('method')=='patch')){
                        $('div#' + result.task.task_id).remove();
                        if (result.task.complete_flag==1){
                                //タスク完了の場合
                                $('td#' + result.task.user_id + '_' + result.task.date).append(doneTask(result.task));
                            }else{
                            //日付チェック
                            var date=result.task.date
                            if (result.task.date=="notset" || (!result.task.date) ){
                                date = "notset";
                            }
                            //日付が無ければ未スケジュールに描画
                            if (date!="notset" ){
                                $('td#' + result.task.user_id + '_' + date).append(ownScaduledTask(result.task,$('#user_id').val(),date))
                            }else{
                                 //未スケジュールの場合
                                 $('td#' + result.task.user_id + '_' + date).append(ownNotScaduledTask(result.task,$('#user_id').val(),date))
                             }
                         }
                     }
                 }
             },
            // 通信失敗時の処理
            error: function(xhr, textStatus, error) {}
        });
    });
});