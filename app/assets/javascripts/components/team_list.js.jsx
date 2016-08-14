var TeagetGraphSelecter = React.createClass({
  getInitialState: function() {
    return {teams: [],team_members: [] };
},
componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(result) {
        this.setState({teams: result.team});
    }.bind(this),
    error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
    }.bind(this)
});

},
memberGet: function(param){
    this.setState({team_id: param.target.id});
    this.setState({team_member_id: ""});

    $.ajax({
      url: "member_teams.json?team_id=" +param.target.id,
      dataType: 'json',
      success: function(result,e, param) {
        var team_members=result.belong_users
        team_members.push({id: "all",user_name: "全員"})
        this.setState({team_members: team_members});
    }.bind(this),
    error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
    }.bind(this)
});
},
graphParamGet: function(param){
    $.ajax({
      url: "analyze_tasks.json?team_id=" +this.state.team_id + "&team_member_id="+param.target.id,
      dataType: 'json',
      success: function(result,e, param) {
        this.setState({task_type_result_list: result.task_type_result_list});
        this.setState({plan_result_list: result.plan_result_list});
        this.setState({month_list: result.month_list});
        //グラフパラメータが反映されないので。
        this.setState({tmp: "aaaaaaaaaaaa"});

    }.bind(this)
});
},


render: function() {
    return (
      <div id="container">
      <div id="teagetGraphSelecter">
      グラフを表示したいチームを選択してください。
      <TeamList teams={this.state.teams} click={this.memberGet}/>
      <TeamMember team_members={this.state.team_members} team_id={this.state.team_id} click={this.graphParamGet}/>
      </div>
      <TaskResultGraph month_list={this.state.month_list} plan_result_list={this.state.plan_result_list} task_type_result_list={this.state.task_type_result_list}/>
      </div>
      );
}
});

var TeamList = React.createClass({
    render: function() {
        var Teams = this.props.teams.map(function (team) {
            return (
                <button id={team.team_id} type="button" className="btn btn-default" onClick={this.props.click}>{team.team_name}</button>
                );
        },this);
        return (
            <div className="graph_param_button">
            {Teams}
            </div>
            );
    },
});

var TeamMember = React.createClass({
    render: function() {
        var TeamMembers = this.props.team_members.map(function (team_member) {
            return (
                <button id={team_member.id} type="button" data-team_id={this.props.team_id} className="btn btn-default" onClick={this.props.click}>{team_member.user_name}</button>
                );
        },this);
        return (
            <div className="graph_param_button">
            {TeamMembers}
            </div>
            );
    }
});
