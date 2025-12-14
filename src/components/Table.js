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

export function Table({data, getDataFunc, removeDataFunc}) {
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
        tableOverflowContainer.current.scrollTop = tableColumnsContainer.current.scrollTop;
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
                                <>
                                    {
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
                                    }
                                    {
                                        dayindex !== data.weekDays.length - 1 ? 
                                        (<tr><td colspan='3' style={{height: '30px'}}></td></tr>) : null
                                    }
                                </>
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
                                id => <Column data={data.columnData[id]} key={id} id={id} />
                            )
                        }
                    </SortableContext>
                </DndContext>
            </div>
            
            <button class='table-add-column-button' onClick={addColumn}>+добавить</button>
        </div>
    );
}
