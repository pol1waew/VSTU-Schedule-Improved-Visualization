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
    let columnData = {}


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

    const getData = id => {
        let weekData = [];

        for (let i = 0; i < weekDays.length; i++) {
            let dayData = [];

            for (let k = 0; k < timeSlots.length; k++) {
                dayData.push(columnRefData[Math.floor(Math.random() * columnRefData.length)]);
            }

            weekData.push(dayData);
        }

        columnData[id] = weekData;
    }

    const removeData = id => {
        delete columnData[id];
    }

    const data = {
        weekDays: weekDays,
        monthDays: monthDays,
        monthNames: monthNames,
        timeSlots: timeSlots,
        columnData: columnData
    }

    return (
        <div class='main-container'>
            <Filters />

            <Table data={data} getDataFunc={getData} removeDataFunc={removeData} />

            <FunctionalPanel />
        </div>
    );    
}
