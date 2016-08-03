$(function () {
    $('#js__sideMenuBtn').on('click', function(){
        var $body = $('body');
        $body.toggleClass('side-open');
        searchTeamName();
    }
    );
});

function searchTeamName() {
    var $body = $('body');
    $.ajax({
        url: "/teams.json",
        type: "GET",
        data: {user_id: $('#user_id').val()},
        timeout: 10000,
            // 通信成功時の処理
            success: function(result, textStatus, xhr) {
                //チームの一覧を表示する。
                $('#belong_team').empty();
                $.each(result.belong_teams, function(i, item){
                    $('#belong_team').append(memberListForm(item.team_id,item.team_name,$('#user_id').val()))
                });
            },
                // 通信失敗時の処理
                error: function(xhr, textStatus, error) {}
            });
    $('#js__overlay').on('click', function () {
        $body.removeClass('side-open');
    });
}
