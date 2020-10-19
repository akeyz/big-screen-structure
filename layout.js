init();

function init() {
    fetchLayout()
        .then(res => {
            genHtmlLayout(res);
        })
        .then(() => {
            console.log($('#grid-1').html());
        });
}

function fetchLayout() {
    return fetch('./layout.json')
        .then(res => {
            return res.json();
        });
}

function genHtmlLayout(data) {
    if (!data) return false;

    let layoutHtml = '';
    let screenWidth = data.screen.width,
        screenHeight = data.screen.height,
        screenCols = data.screen.cols,
        screenRows = data.screen.rows;
    layoutHtml += `<div style="width: ${screenWidth}px; height: ${screenHeight}px; position: relative;">`;
    let colGap = data.screen.gap;
    let colWidth = ((screenWidth - colGap) / screenCols) - colGap;
    let colHeight = ((screenHeight - colGap) / screenRows) - colGap;

    let layout = data.layout;
    for (let i = 0; i < layout.length; i++) {
        layoutHtml += `<div id="grid-${i}" class="grid" style="top: ${(colGap + colHeight) * layout[i].y + colGap}px; left: ${(colGap + colWidth) * layout[i].x + colGap}px; width: ${(colGap + colWidth) * layout[i].cols - colGap}px; height: ${(colGap + colHeight) * layout[i].rows - colGap}px">${i}</div>`;
    }
    layoutHtml += `</div>`;

    document.getElementById('wrapper').innerHTML = layoutHtml;
}