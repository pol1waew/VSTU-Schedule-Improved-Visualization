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
import '../styles/Table.css';

export function Table({data, getDataFunc, removeDataFunc}) {
    const leftSideContainer = useRef(null);
    const columnsContainer = useRef(null);
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
        const newColumnId = `column-${lastIdNumber}`;

        setColumns([
            ...columns, 
           newColumnId
        ]);

        getDataFunc(newColumnId);
        
        // updates with one iteration delay
        setIdNumber(lastIdNumber + 1);
    };

    const removeColumn = (id) => {
        removeDataFunc(id);

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
        leftSideContainer.current.scrollTop = columnsContainer.current.scrollTop;
    }

    return (
        <div class='table-container'>
            <button class='table-add-column-button' onClick={addColumn}>+добавить</button>

            <div class='table-left-side-container' ref={leftSideContainer}>
                <div class='table-titles-container'>
                    <div class='table-calendar-title-container'>
                        {
                            data.monthNames.map(
                                month => <div class='table-cell table-calendar-month-name'><b>{month}</b></div>
                            )
                        }
                    </div>
                    <div class='table-cell table-time-slot-title'>Уч. час</div>
                </div>

                {
                    data.weekDays.map(
                        (weekDay, dayIndex) => (
                            <div class='table-left-side-content-container'>
                                <div class='table-week-day-container'>
                                    <b>{weekDay}</b>
                                </div>

                                <div class='table-calendar-time-slots-container'>
                                    <div class='table-calendar-container'>
                                        <table class='table-calendar'>
                                            {
                                                data.monthDays[dayIndex].map(
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
                                        </table>
                                    </div>

                                    <div class='table-time-slots-container'>
                                        {
                                            data.timeSlots[dayIndex].map(
                                                timeSlot => (
                                                    <div class='table-cell table-time-slot-container'>{timeSlot}</div>
                                                )
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
            </div>

            <div class='table-columns-container' ref={columnsContainer} onScroll={syncScroll}>
                <DndContext autoScroll={false} sensors={sensors} collisionDetection={rectIntersection} onDragEnd={handleDragEnd}>
                    <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
                        {
                            columns.map(
                                id => <Column data={data.columnData[id]} key={id} id={id} />
                            )
                        }
                    </SortableContext>
                </DndContext>
            </div>
        </div>

    );
}
