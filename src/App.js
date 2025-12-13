import {Filters} from './components/Filters';
import {Table} from './components/Table';
import {FunctionalPanel} from './components/FunctionalPanel';
import './styles/App.css'

export function App() {
    const timeSlots = [
        '1-2',
        '3-4',
        '5-6',
        '7-8',
        '9-10',
        '11-12',
        '13-14'
    ]
    const weekDays = [
        'Понедельник',
        'Вторник',
        'Среда'
    ]

    const data = {
        timeSlots: timeSlots,
        weekDays: weekDays
    }

    return (
        <div class='main-container'>
            <Filters />

            <Table data={data} />

            <FunctionalPanel />
        </div>
    );    
}
