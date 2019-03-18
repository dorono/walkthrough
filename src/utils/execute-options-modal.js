/*
  Allows triggering of the settings-popup component from any component which imports executeModalTrigger
*/
let modalTriggerFunc;

export const setModalTrigger = (importedFunc) => { modalTriggerFunc = importedFunc; };

export const executeModalTrigger = (err) => modalTriggerFunc(err);
