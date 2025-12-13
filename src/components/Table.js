import {useState} from 'react';
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



export function Table({data}) {
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

    return (
        <DndContext sensors={sensors} collisionDetection={rectIntersection} onDragEnd={handleDragEnd}>
            <div class='table-container'>
                <table>
                    <tr>
                        <th class='table-time-slot-title' colspan='2'>Учебный час</th>
                        <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
                            {
                                columns.map(
                                    id => 
                                        <th rowspan={data.weekDays.length * data.timeSlots.length + 1}>
                                            <Column key={id} id={id} />
                                        </th>
                                )
                            }
                        </SortableContext>
                        <th>
                            <div class='table-add-column-button-container'>
                                <button onClick={addColumn}>+добавить</button>
                            </div>
                        </th>
                    </tr>
                    {
                        data.weekDays.map(
                            weekDay => (
                                data.timeSlots.map(
                                    (timeSlot, index) => (
                                        <tr>
                                            {
                                                index === 0 ?
                                                (
                                                    <th rowspan={data.timeSlots.length}>
                                                        <h1 class='table-week-day'>{weekDay}</h1>
                                                    </th>
                                                ) : null
                                            }
                                            <th class='table-time-slot-th'>{timeSlot}</th>
                                        </tr>
                                    )
                                ) 
                            )
                        )
                    }
                </table>
            </div>
        </DndContext>
    );
}
