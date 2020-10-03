import { dataValueType } from '../dataTypes/dataTypes';

// редуктор, меняющий store
// switch-конструкция для наглядности - если бы у нас было много различных actions
// в данном случае можно было бы обойтись простым if

const reducer = (state: { data: object[] } = { data: [] }, action: { type: string; value: dataValueType }) => {
    // редуктор должен быть чистой функцией, поэтому создаём новый объект с помощью spread-оператора

    // для каждого типа action меняем данные соответствующим образом
    // здесь при регистрации действия с типом DATA_RECORDING (запись данных)
    // происходит перемещение данных из action.value в store

    switch (action.type) {
        case 'DATA_RECORDING':
            return { data: [...state.data, { ...action.value }] };
        default:
            return { ...state };
    }
};

export default reducer;
