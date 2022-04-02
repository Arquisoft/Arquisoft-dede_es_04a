import React, {useState, useEffect, createContext} from "react";



interface IMenu {
  menu: boolean;
  setMenu?: () => void;
}

const defaultState = {
  menu: true,
};

const DataContext = createContext<IMenu>(defaultState);


export default DataContext;
