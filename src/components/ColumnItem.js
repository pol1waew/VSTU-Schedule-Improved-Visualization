import '../styles/ColumnItem.css';

export function ColumnItem({data}) {
    let leftItem = null;
    let leftItemTitle = null;
    let rightItem = null;
    let rightItemTitle = null;

    if (data.leftData) {
        leftItem = (
            <>
                {data.leftData[0] ? data.leftData[0] : null} <br />
                {data.leftData[1] ? data.leftData[1] : null}{data.leftData[2] ? '...' : null}
            </>
        );
        leftItemTitle = data.leftData.map(
            data_ => (
                `\n${data_}`
            )
        );
    }

    if (data.rightData) {
        rightItem = (
            <>
                {data.rightData[0] ? data.rightData[0] : null} <br />
                {data.rightData[1] ? data.rightData[1] : null}{data.rightData[2] ? '...' : null}
            </>
        );
        rightItemTitle = data.rightData.map(
            data_ => (
                `\n${data_}`
            )
        );
    }

    return (
        <div class='column-item-container'>
            <div class='column-item-header-container'>
                <p class='column-item-subject' name='subject' title={data.subject}>{data.subject}</p>
                <i class='column-item-holds-on-date' name='holds-on-date'>
                    {
                        data.holdsOnDate ? 
                        (<>Только {data.holdsOnDate}</>) : 
                        (null)
                    }
                </i>
                <i class='column-item-subject-kind' name='subject-kind'>{data.kind}</i>
            </div>
            <div class='column-item-footer-container'>
                <p class='column-item-footer-left' name='footer-left' title={leftItemTitle}>{leftItem}</p>
                <p class='column-item-footer-right' name='footer-right' title={rightItemTitle}>{rightItem}</p>
            </div>
        </div>
    );
}