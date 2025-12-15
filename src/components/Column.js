import {useState, useRef} from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {ColumnFilters} from './ColumnFilters';
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

    
    return (
        <div class='column-container' ref={setNodeRef} style={style}>
            <div class='column-header-container'>
                <button ref={buttonRef} onClick={createDestroyFilter}>
                    Литовкин Д.В.
                </button>              

                <button {...listeners} {...attributes}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrows-move' viewBox='0 0 16 16'>
                        <path fill-rule='evenodd' d='M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8'/>
                    </svg>
                </button>

                {filter ? filter : null}
            </div>

            <div class='column-content-container'>
                {
                    props.data.map(
                        (week, outerIndex) => (
                            week.map(
                                (day, innerIndex) => (
                                    <div class='column-row-container' style={
                                            innerIndex === 0 ? ({marginTop: '30px'}) : null
                                        }>
                                        <ColumnItem data={day} id={`column-row-${outerIndex * innerIndex}`} />
                                    </div>
                                )
                            )
                        )
                    )
                }
            </div>
        </div>
    );

    function createDestroyFilter() {
        if (!filter) {
            setFilter(
                <ColumnFilters rect={buttonRef.current.getBoundingClientRect()}/>
            );
        }
        else {
            setFilter(
                null
            );
        }
    }
}
