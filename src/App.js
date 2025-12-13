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
        '1 неделя, Понедельник',
        '1 неделя, Вторник',
        '1 неделя, Среда'
    ]
    const monthNames = [
        'Февраль',
        'Март',
        'Апрель'
    ]
    const monthDays = {
        0: [
            ['1', '3', '2'],
            ['8', '10', '9'],
            ['', '17', '16'],
            ['', '24', '']
        ],
        1: [
            ['2', '4', '3'],
            ['9', '11', '10'],
            ['', '18', '17'],
            ['', '25', '']
        ],
        2: [
            ['3', '5', '4'],
            ['9', '12', '11'],
            ['', '19', '18'],
            ['', '26', '']
        ]
    }

    const data = {
        weekDays: weekDays,
        monthDays: monthDays,
        monthNames: monthNames,
        timeSlots: timeSlots
    }

    return (
        <div class='main-container'>
            <Filters />

            <Table data={data} />

            <FunctionalPanel />
        </div>
    );    
}
