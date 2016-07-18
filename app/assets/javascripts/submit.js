$(function() {
    //$('.js-submit').submit(function(event) {
        $('.js-form').on('submit','.js-submit',function(){
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
                    //teamsのcreate呼び出しの場合
                    if ($form.attr('action')=='/teams.json'&& $form.attr('method')=='post'){
                    // 入力値を初期化
                    $form[0].reset();
                    searchTeamName();
                    //member_teamsのindex呼び出しの場合
                }else if ($form.attr('action')=='/member_teams.json'&& $form.attr('method')=='get'){
                    console.log(result);
                    //teamID
                    console.log($form.attr("id"));
                    //userID
                    console.log($("#user_id").attr("value"));
                    //メンバー一覧表示
                    $('#team_' +$form.attr('id')+ '_member').empty();
                    $('#'+$form.attr('id')).after("<div id=team_"+$form.attr('id')+"_member></div>");
                    $('#team_' +$form.attr('id') + '_member').append("所属メンバー <br><ul>");
                    $.each(result.belong_users, function(i, item){
                        $('#team_' +$form.attr('id')+ '_member').append('<li>' + item.user_name +'</li>');
                    });
                    $('#team_' +$form.attr('id')+ '_member').append("</ul>");
                    //招待処理ボタン表示
                    $('#team_' +$form.attr('id')+ '_member').append('<div class="btn btn-default invite_start" id="' + $form.attr("id") + ' '+ $("#user_id").attr("value") + '" ><p class="fa fa-user-plus">メンバーを招待する</p></div>');
                }
            },
            // 通信失敗時の処理
            error: function(xhr, textStatus, error) {}
        });
    });
    });