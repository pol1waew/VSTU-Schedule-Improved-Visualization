import '../styles/Calendar.css';

export function Calendar(data) {
    return (
        <table class='calendar-table'>
            <thead>
                <tr>
                    {
                        data.months.map(
                            month => <th class='calendar-month-name'>{month}</th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.days.map(
                        row => (
                            <tr>
                                {
                                    row.map(
                                        day => <td>{day}</td>
                                    )
                                }
                            </tr>
                        )
                    )
                }
            </tbody>
        </table>
    );
}