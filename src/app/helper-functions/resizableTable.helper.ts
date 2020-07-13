export function resizableGrid(table) {
    const row = table.getElementsByTagName('tr')[0];
    const cols = row ? row.children : undefined;
    if (!cols) { return; }

    table.style.overflow = 'hidden';

    const tableHeight = table.offsetHeight;

    for (const col of cols) {
        const div = createDiv(tableHeight);
        col.appendChild(div);
        col.style.position = 'relative';
        setListeners(div);
    }

    function setListeners(div){
        // tslint:disable-next-line: one-variable-per-declaration
        let pageX, curCol, nxtCol, curColWidth, nxtColWidth;

        div.addEventListener('mousedown', (e) => {
            curCol = e.target.parentElement;
            nxtCol = curCol.nextElementSibling;
            pageX = e.pageX;

            const padding = paddingDiff(curCol);

            curColWidth = curCol.offsetWidth - padding;
            if (nxtCol) {
                nxtColWidth = nxtCol.offsetWidth - padding;
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (curCol) {
                const diffX = e.pageX - pageX;

                if (nxtCol) {
                    nxtCol.style.width = (nxtColWidth - (diffX)) + 'px';
                }

                curCol.style.width = (curColWidth + diffX) + 'px';
            }
        });

        document.addEventListener('mouseup', (e) => {
            curCol = undefined;
            nxtCol = undefined;
            pageX = undefined;
            nxtColWidth = undefined;
            curColWidth = undefined;
        });
    }

    function createDiv(height) {
        const div = document.createElement('div');
        div.style.top = '0';
        div.style.right = '0';
        div.style.width = '5px';
        div.style.position = 'absolute';
        div.style.cursor = 'col-resize';
        div.style.userSelect = 'none';
        div.style.height = height + 'px';
        return div;
    }

    function paddingDiff(col) {

        if (getStyleVal(col, 'box-sizing') === 'border-box') {
            return 0;
        }

        const padLeft = getStyleVal(col, 'padding-left');
        const padRight = getStyleVal(col, 'padding-right');
        // tslint:disable-next-line: radix
        return (parseInt(padLeft) + parseInt(padRight));

    }

    function getStyleVal(elm, css) {
        return (window.getComputedStyle(elm, null).getPropertyValue(css));
    }
}
