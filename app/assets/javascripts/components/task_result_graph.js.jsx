var TaskResultGraph = React.createClass({
    render : function(){
        var date_obj = new Date();
        return (
            <div id="GraphZone">
            <div id="taskResultVerticalGraph">
            </div>
            <div id="taskResultPieGraph">
            </div>
            </div>
            )
    },
    componentWillReceiveProps : function(){
        makeGraph(this.props.month_list ,this.props.plan_result_list ,this.props.task_type_result_list)
    },
    //HTML描画 render() 後の処理
    componentDidMount: function () {
        makeGraph(this.props.month_list ,this.props.plan_result_list ,this.props.task_type_result_list)
    }
});

function makeGraph(month_list,plan_result_list,task_type_result_list){
   if (month_list && plan_result_list && task_type_result_list){
        $(function () {
          $('#taskResultVerticalGraph').highcharts({
            chart: {
            },
            title: {
                text: '予実グラフ',
                    //center
                    x: -20
                },
                xAxis: {
                    categories: month_list
                },
                yAxis: {
                    title: {
                        text: '作業時間(h)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: 'h'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: plan_result_list
            });

          $('#taskResultPieGraph').highcharts({
            title: {
                text: 'タスク割合'
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        formatter: function() {
                            return '<b>'+ this.point.name +'</b>:'+ Math.round(this.percentage*10)/10 + '%';
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: '',
                data: task_type_result_list
            }],
            tooltip: {
                formatter: function() {
                    return this.y +'h';},
                    enabled:true
                }
            });

      });
    }
}