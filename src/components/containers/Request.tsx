import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { dataRecordingMakeAction } from '../../actions/actions';
import RequestDashboard from '../dashboards/RequestDashboard';
import { dataValueType, stateType } from '../../dataTypes/dataTypes';

// контейнерная

const Request = (props: { url: string }) => {
    // получаем функцию диспатча из хука
    const dispatch = useDispatch();

    // при каждом вызове компонента в currentState будет содержаться часть store (data)
    // на момент вызова
    const currentState = useSelector((state: stateType) => state.data);

    // для большей гибкости передаём url как props компонента
    // (чтобы можно было легко создать другие такие же по функциональности компоненты с другими url)
    const { url } = props;

    // вызываем хук useEffect со вторым аргументом [], чтобы избежать бесконечной перерисовки
    // и ухода кода в бесконечный цикл
    // функция useEffect в нашем случае вызовется один раз - сразу после монтирования компонента,
    // и не будет вызываться при его обновлении
    useEffect(() => {
        // делаем get-запрос, используя библиотеку axios
        axios
            .get(url)
            .then(res => {
                // если id = null не имеют смысла, фильтруем их
                // return res.data.filter(i => i && i.id).map(i => ({ id: i.id }));
                // сейчас для id = null вместо данных выводятся пустые блоки

                // записываем в result массив id и передаём в следующий then
                return res.data.map(i => (i && i.id ? { id: i.id } : i));
            })
            .then(res => {
                // для каждого id из массива делаем ещё один get-запрос
                res.forEach(val => {
                    const idUrl = `https://api.guildwars2.com/v2/items/${val && val.id ? val.id : val}`;
                    axios
                        .get(idUrl)
                        .then(response => {
                            // извлекаем из ответа от сервера данные, которые нам нужны
                            const { id, name, icon } = response.data;
                            // создаём объект "единицы данных" и передаём его в следующий then
                            const dataObj = { id: id, name: name, icon: icon };
                            return dataObj;
                        })
                        .then(data => {
                            // вызываем функцию dispatch (пробовал и без таймаута, работало),
                            // инициируем срабатывание редуктора и изменение store
                            // каждый раз, когда store будет меняться, компонент будет обновляться,
                            // передавая обновлённые данные в презентационный компонент,
                            // который отрисовывает их
                            // при обновлениях это компонента не будет повторно
                            // вызываться useEffect и этот цикл
                            const delayedRecord = dispatch => {
                                setTimeout(() => {
                                    dispatch(
                                        dataRecordingMakeAction({ id: data.id, name: data.name, icon: data.icon }),
                                    );
                                }, 1);
                            };
                            delayedRecord(dispatch);
                            return res;
                        })
                        .catch(err => {
                            const delayedRecord = dispatch => {
                                setTimeout(() => {
                                    dispatch(dataRecordingMakeAction({ id: '', name: '', icon: '' }));
                                }, 1);
                            };
                            delayedRecord(dispatch);
                        }); // обработка ошибки в запросе
                });
                return res;
            })
            .catch(err => console.log(err)); // обработка ошибки в запросе
    }, []);
    // там есть элементы с одинаковыми id и name, но разными count (которые мы не выводим)
    // не знаю, надо ли их фильтровать, но сделать это можно,например, следующим образом
    let dataForRender: object[] = [];
    if (currentState && currentState.length > 0) {
        let filterIdsArray: object = {};
        dataForRender = currentState.filter((item: dataValueType) => {
            if (item.id !== '') {
                if (!filterIdsArray[item.id]) {
                    filterIdsArray[item.id] = true;
                    return item;
                }
            } else {
                return item;
            }
        });
    }

    // при каждом обновлении store и этого компонента, вызываем компонент отрисовки
    // и передаём ему актуальные данные

    return <RequestDashboard data={dataForRender} />;
};

export default Request;
