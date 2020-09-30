// объявляем все нестандартные типы данных, использующиеся в проекте
// их можно подключать и использовать в любом файле проекта

export type dataValueType = { id: string; name: string; icon: any };
export type stateType = { data: dataValueType[] };
