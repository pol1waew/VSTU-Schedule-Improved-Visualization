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
import './Table.css';

export function Table({timeSlots}) {
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
            <table>
                <tr>
                    <th>Учебный час</th>
                    <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
                        {
                            columns.map(
                                id => 
                                    <th rowspan={timeSlots.length + 1}>
                                        <Column key={id} id={id} />
                                    </th>
                            )
                        }
                    </SortableContext>
                    <th rowspan={timeSlots.length + 1}>
                        <button onClick={addColumn}>+добавить</button>
                    </th>
                </tr>
                {
                    timeSlots.map(
                        (timeSlot) => (
                            <tr>
                                <th>{timeSlot}</th>
                            </tr>
                        )
                    )
                }
            </table>
        </DndContext>
    );
}
