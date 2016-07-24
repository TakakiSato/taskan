//チーム追加フォーム
    $(function () {
      $('#create-team-form').toggle();
      $('#create-team').click(function(){
        $('#create-team-form').toggle(true);
        $('#create-team').click(function(){
          $('#create-team-form').toggle();
      });
    });
  });

//タスク追加フォーム
    $(function () {
        $(document).on('click','.add-task-child',function(){
          $(this).parent().parent().children().toggle();
      });
    });