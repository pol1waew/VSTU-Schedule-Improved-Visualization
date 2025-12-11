import {Table} from './components/Table';

function App() {
    const timeSlots = [
        '1-2',
        '3-4',
        '5-6',
        '7-8',
        '9-10',
        '11-12',
        '13-14'
    ]

    return (
        <div>
            <Table timeSlots={ timeSlots }/>
            <Table timeSlots={ timeSlots }/>
        </div>
    );    
}

export default App;
