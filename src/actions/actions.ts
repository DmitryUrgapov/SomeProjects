import { dataRecording } from './actionTypes';
import { dataValueType } from '../dataTypes/dataTypes';
// создаём функцию, которая задаёт данный тип action, принимая в качестве аргумента value
// здесь можно было бы обойтись и без этого, указав value непосредственно внутри dispatch,
// но при сложной логике экшна лучше создавать подобные функции
// наличие большого количества таких функций создания экшнов не удобно,
// эту проблему решает Redux Toolkit.
export const dataRecordingMakeAction = (value: dataValueType) => {
    return { type: dataRecording, value: value };
};
