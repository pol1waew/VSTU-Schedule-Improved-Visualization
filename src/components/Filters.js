import '../styles/Filters.css'

export function Filters() {
    return (
        <div class='filters-container'>
            <label>Фильтры</label>
            
            <select class='filters-date'>
                <option value='1'>На сегодня</option>
                <option value='2'>На завтра</option>
                <option value='3'>На эту неделю</option>
                <option value='4'>На следующую неделю</option>
                <option value='5'>На дату</option>
                <option value='6'>На диапазон дат</option>
                <option value='7'>На день недели</option>
            </select>

            <select class='filters-subject'>
                <option value='1'>НИР</option>
                <option value='2'>Базы данных</option>
                <option value='3'>Основы ООП</option>
            </select>

            <select class='filters-subject-kind'>
                <option value='1'>Лекция</option>
                <option value='2'>Лабораторная</option>
                <option value='3'>Практика</option>
            </select>

            <label>
                <input type='checkbox' />
                Показывать календарь
            </label>
            
            <button>Сбросить фильтры</button>

            <button>Показать</button>
        </div>
    );
}
