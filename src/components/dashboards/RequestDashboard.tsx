import React from 'react';

const RequestDashboard = props => {
    // получаем актуальные данные из контейнерного компонента
    const { data } = props;

    // сортируем данные по возрастанию id (мне было удобнее так проверять себя, возможно, лишнее :) )
    // data.sort((item1, item2) => item1.id - item2.id);

    // для удобства создаём отдельную функцию, рендерящую блок
    // каждый такой блок одинаков по вёрстке и отличается только данными,
    // что делает удобной правку со сторону верстальщика

    const renderBlock = (item, key) => {
        return (
            <div className= {`data-block ${item.id === '' ? 'background' : ''}`}>
                {item.id !== '' ? (
                    <img className="item-icon" title={`${item.id}: ${item.name}`} src={`${item.icon}`}></img>
                ) : (
                    ''
                )}
                {
                    <div key={key} className="text">
                        <span>{`${item.id}${item.id !== '' ? ':' : ''} ${item.name}`}</span>
                    </div>
                }
            </div>
        );
    };

    // проходимся по массиву данных, для каждой единицы данных
    // рендерим свой блок и возвращаем массив блоков

    return <div className="page-container">{data.map((item, idx) => renderBlock(item, idx))}</div>;
};

export default RequestDashboard;
