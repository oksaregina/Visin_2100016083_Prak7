google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(getSpreadsheetData);

function getSpreadsheetData() {
    var spreadsheetId = '1_5P8UdtKSloujROEfWw-bszUUrxlD9-YYh3HaAxvAV4';

    var range1 = 'Tabulasi_silang!A1:E5';
    var query1 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/gviz/tq?gid=0&range=' + range1);
    query1.send(function(response) {
        handleQueryResponse(response, 'chart1');
    });

    var range2 = 'Tabulasi_silang!A8:B11';
    var query2 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/gviz/tq?gid=0&range=' + range2);
    query2.send(function(response) {
        handleQueryResponse(response, 'chart2');
    });
}

function handleQueryResponse(response, chartId) {
    if (response.isError()) {
        console.error('Error: ' + response.getMessage());
        return;
    }

    var data = response.getDataTable();
    drawChart(data, chartId);
}

function drawChart(data, chartId) {
    var options = {
        width: 450,
        height: 250
    };

    if (chartId === 'chart1') {
        options.title = 'Penjualan Produk Berdasarkan Kota';
        var chart = new google.visualization.ColumnChart(document.getElementById(chartId));
        chart.draw(data, options);
    } else if (chartId === 'chart2') {
        options.title = 'Total Penjualan Berdasarkan Category';
        var chart = new google.visualization.PieChart(document.getElementById(chartId));
        chart.draw(data, options);
    }
}
