import {useState, useRef} from 'react';
import {
    DndContext, 
    rectIntersection,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    horizontalListSortingStrategy
} from '@dnd-kit/sortable';
import {Column} from './Column';
import {Calendar} from './Calendar';
import '../styles/Table.css';

export function Table({data}) {
    const tableOverflowContainer = useRef(null);
    const tableColumnsContainer = useRef(null);
    const [lastIdNumber, setIdNumber] = useState(0);
    const [columns, setColumns] = useState([]);
    const sensors = useSensors(
        useSensor(
            PointerSensor
            /*,
            {
                activationConstraint: {
                    delay: 200,
                    tolerance: 5
                }
            }*/
        )
    );
    
    const addColumn = () => {
        setColumns([
            ...columns, 
           `column-${lastIdNumber}`
        ]);

        // updates with one iteration delay
        setIdNumber(lastIdNumber + 1);
    };

    const removeColumn = (id) => {
        setColumns(
            columns.filter(column => column !== id)
        );
    };

    const handleDragEnd = (event) => {
        const {active, over} = event;

        if (!over) {
            removeColumn(active.id);

            return;
        }
        
        if (active.id !== over.id) {
            const oldColumn = columns.indexOf(active.id);
            const newColumn = columns.indexOf(over.id);

            setColumns(arrayMove(columns, oldColumn, newColumn));
        }
    }

    const syncScroll = () => {
        tableOverflowContainer.current.scrollTop = tableColumnsContainer.current.scrollTop;
    }



    const columnRefData = [
        {
            subject: null,
            holdsOnDate: null,
            kind: null,
            leftData: null,
            rightData: null
        },
        {},
        {
            subject: 'ОСНОВЫ ПРОГРАММИРОВАНИЯ',
            holdsOnDate: '12 декабря 2025 г.',
            kind: 'Лабораторная работа',
            leftData: ['Гилка В.В.', 'Литовкин Д.В.'],
            rightData: ['В 902а', 'В 902б']
        },
        {
            subject: 'СУПЕР ПУПЕР ДЛИННОЕ НАЗВАНИЕ ПРЕДМЕТА ДЛЯ ТЕСТИРОВАНИЯ ТОГО, КАК ТЕКСТ УМЕЩАЕТСЯ ВНУТРИ КЛЕТОЧКИ',
            holdsOnDate: '12 декабря 2025 г.',
            kind: 'Лабораторная работа',
            leftData: ['Гилка В.В.', 'Литовкин Д.В.', 'Литовкин Д.В.', 'Литовкин Д.В.', 'Литовкин Д.В.'],
            rightData: ['В 908', 'В 902б']
        },
        {
            subject: 'НИР',
            holdsOnDate: null,
            kind: 'Лабораторная работа',
            leftData: ['Гилка В.В.', 'Литовкин Д.В.'],
            rightData: ['В 902а', 'В 902б', 'В 902б', 'В 902б', 'В 902б']
        },
        {
            subject: 'БАЗЫ ДАННЫХ',
            holdsOnDate: null,
            kind: null,
            leftData: ['Гилка В.В.', 'Литовкин Д.В.'],
            rightData: ['А 301', 'Б 21']
        },
        {
            subject: 'ХИМИЯ',
            holdsOnDate: '12 декабря 2025 г.',
            kind: null,
            leftData: ['Гилка В.В.', 'Литовкин Д.В.'],
            rightData: ['В 902а', 'В 902б']
        },
        {
            subject: 'НАЧ. ГРАФИКА',
            holdsOnDate: '12 декабря 2025 г.',
            kind: 'Лабораторная работа',
            leftData: ['Литовкин Д.В.'],
            rightData: ['В 908', 'В 902а', 'В 902б']
        },
        {
            subject: 'МАТ. АН.',
            holdsOnDate: '12 декабря 2025 г.',
            kind: 'Лабораторная работа',
            leftData: ['Гилка В.В.', 'Литовкин Д.В.'],
            rightData: ['ГУК 100']
        }
    ]

    function createData() {
        let newData = [];

        while (newData.length < data.weekDays.length * data.timeSlots.length) {
            newData.push(columnRefData[Math.floor(Math.random() * columnRefData.length)]);
        }

        return newData;
    }

    
    



    return (
        <div class='table-container'>
            <div class='table-overflow-container' ref={tableOverflowContainer}>
                <table>
                    <tr class='table-titles-container'>
                        <th class='table-week-day-title'>День недели</th>
                        <th class='table-calendar-title'>Календарь</th>
                        <th class='table-time-slot-title'>Уч. час</th>
                    </tr>
                    {
                        data.weekDays.map(
                            (weekDay, dayindex) => (
                                data.timeSlots.map(
                                    (timeSlot, timeSlotIndex) => (
                                        <tr>
                                            {
                                                timeSlotIndex === 0 ?
                                                (
                                                    <th rowspan={data.timeSlots.length}>
                                                        <h1 class='table-week-day'>{weekDay}</h1>
                                                    </th>
                                                ) : null
                                            }
                                            {
                                                timeSlotIndex === 0 ?
                                                (
                                                    <th rowspan={data.timeSlots.length}>
                                                        <Calendar months={data.monthNames} days={data.monthDays[dayindex]} />
                                                    </th>
                                                ) : null
                                            }
                                            <th class='table-time-slot'>{timeSlot}</th>
                                        </tr>
                                    )
                                ) 
                            )
                        )
                    }
                </table>
            </div>

            <div class='table-columns-container' ref={tableColumnsContainer} onScroll={syncScroll}>
                <DndContext autoScroll={false} sensors={sensors} collisionDetection={rectIntersection} onDragEnd={handleDragEnd}>
                    <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
                        {
                            columns.map(
                                id => <Column data={createData()} key={id} id={id} />
                            )
                        }
                    </SortableContext>
                </DndContext>
            </div>
            
            <button class='table-add-column-button' onClick={addColumn}>+добавить</button>
        </div>
    );
}
