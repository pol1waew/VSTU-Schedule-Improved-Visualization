import '../styles/ColumnItem.css';

export function ColumnItem({data}) {
    const leftItem = (
        <>
            {data.left_data[0] ? data.left_data[0] : null} <br />
            {data.left_data[1] ? data.left_data[1] : null}{data.left_data[2] ? '...' : null}
        </>
    );
    const rightItem = (
        <>
            {data.right_data[0] ? data.right_data[0] : null} <br />
            {data.right_data[1] ? data.right_data[1] : null}{data.right_data[2] ? '...' : null}
        </>
    );
    const leftItemTitle = data.left_data.map(
        data_ => (
            `\n${data_}`
        )
    );
    const rightItemTitle = data.right_data.map(
        data_ => (
            `\n${data_}`
        )
    );

    return (
        <div class='column-item-container'>
            <div class='column-item-header-container'>
                <p class='column-item-subject' name='subject' title={data.subject}>{data.subject}</p>
                <i class='column-item-holds-on-date' name='holds-on-date'>
                    {
                    data.holds_on_date ? 
                    (<>Только {data.holds_on_date}</>) : 
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