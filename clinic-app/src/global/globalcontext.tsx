// just a basic setup of the global context, replace table with whatever we need stuff for
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
interface Table {
    id: string;
}
interface GlobalContextProps {
    tables: Table[];
    savedTables: Table[];
}
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [tables, setTable] = useState<Table[]>([]);
    const [savedTables, setSavedTables] = useState<Table[]>([]);
    const saveTables = (table: Table) => {
        setSavedTables((previousTables) => {
            if (previousTables.some((savedTable) => savedTable.id === table.id)) return previousTables;
            return [...previousTables, table];
        });
    };

    const removeTable = (tableId: string) => {
        setSavedTables((prevJobs) => prevJobs.filter((table) => table.id !== tableId));
    };
    
    return (
        <GlobalContext.Provider value={{ tables, savedTables }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};