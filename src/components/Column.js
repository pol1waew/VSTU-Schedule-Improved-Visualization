import {useState, useRef} from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {ColumnFilter} from './ColumnFilter';
import {ColumnItem} from './ColumnItem';
import '../styles/Column.css';

export function Column(props) {
    const [filter, setFilter] = useState(null);
    const buttonRef = useRef();
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: props.id});
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    const testData = {
        0: {
            subject: 'НИР',
            holds_on_date: '12 декабря 2025 г.',
            kind: 'Лабораторная работа',
            left_data: ['Гилка В.В.', 'Литовкин Д.В.'],
            right_data: ['В 902а', 'В 902б']
        },
        1:{
            subject: 'СУПЕР ПУПЕР ДЛИННОЕ НАЗВАНИЕ ПРЕДМЕТА ДЛЯ ТЕСТИРОВАНИЯ ТОГО, КАК ТЕКСТ УМЕЩАЕТСЯ ВНУТРИ КЛЕТОЧКИ',
            holds_on_date: '12 декабря 2025 г.',
            kind: 'Лабораторная работа',
            left_data: ['Гилка В.В.', 'Литовкин Д.В.', 'Литовкин Д.В.', 'Литовкин Д.В.', 'Литовкин Д.В.'],
            right_data: ['В 902а', 'В 902б']
        },
        2:{
            subject: 'НИР',
            holds_on_date: null,
            kind: 'Лабораторная работа',
            left_data: ['Гилка В.В.', 'Литовкин Д.В.'],
            right_data: ['В 902а', 'В 902б', 'В 902б', 'В 902б', 'В 902б']
        },
        3:{
            subject: 'НИР',
            holds_on_date: null,
            kind: null,
            left_data: ['Гилка В.В.', 'Литовкин Д.В.'],
            right_data: ['В 902а', 'В 902б']
        },
        4:{
            subject: 'НИР',
            holds_on_date: '12 декабря 2025 г.',
            kind: null,
            left_data: ['Гилка В.В.', 'Литовкин Д.В.'],
            right_data: ['В 902а', 'В 902б']
        },
        5:{
            subject: 'НИР',
            holds_on_date: '12 декабря 2025 г.',
            kind: 'Лабораторная работа',
            left_data: ['Литовкин Д.В.'],
            right_data: ['В 902а', 'В 902б']
        },
        6:{
            subject: 'НИР',
            holds_on_date: '12 декабря 2025 г.',
            kind: 'Лабораторная работа',
            left_data: ['Гилка В.В.', 'Литовкин Д.В.'],
            right_data: ['В 902а']
        }
    }

    return (
        <table ref={setNodeRef} style={style}>
            <thead>
                <tr>
                    <th class='column-head'>
                        <button ref={buttonRef} onClick={createDestroyFilter}>
                            Литовкин Д.В.
                        </button>              

                        <button {...listeners} {...attributes}>
                            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrows-move' viewBox='0 0 16 16'>
                                <path fill-rule='evenodd' d='M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8'/>
                            </svg>
                        </button>

                        {filter ? filter : null}
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.entries(testData).map(
                        ([key, data]) => (
                            <tr id={`column-body-row-${key}`}>
                                <td><ColumnItem data={data} /></td>
                            </tr>
                        )
                    )
                }
                
            </tbody>
        </table>
    );

    function createDestroyFilter() {
        if (!filter) {
            setFilter(
                <ColumnFilter rect={buttonRef.current.getBoundingClientRect()}/>
            );
        }
        else {
            setFilter(
                null
            );
        }
    }
}
