import '../styles/ColumnFilter.css'

export function ColumnFilters({rect}) {
    const style = {
        marginTop: rect.height,
        marginLeft: rect.width / 2
    };

    return (
        <div style={style} class='column-filter-container'>
            <select class='type'>
                <option value='student_groups'>Группы студентов</option>
                <option value='teachers'>Преподаватели</option>
                <option value='subjects'>Занятия</option>
            </select>

            <select class='department'>
                <option value='1'>ФЭВТ</option>
                <option value='2'>ПОАС</option>
                <option value='3'>ФТПП</option>
                <option value='4'>ХТФ</option>
            </select>

            <select class='name'>
                <option value='1'>Прин-166</option>
                <option value='2'>Прин-266</option>
                <option value='3'>Прин-366</option>
                <option value='4'>Прин-466</option>
            </select>
        </div>
    );
}