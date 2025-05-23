// just a basic setup of the global context, replace table with whatever we need stuff for
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import uuid from 'react-native-uuid';
/*
interface Table {
    id: string;
}
*/

interface Account {
    id: string;
    username: string;
    password: string;
}
interface GlobalContextProps {
    /*
    tables: Table[];
    savedTables: Table[];
    saveTable: (table: Table) => void;
    removeTable: (tableId: string) => void;
    */
    accounts: Account[];
    storedAccounts: Account[];
    addAccount: (username: string, password: string) => void;
    storeAccount: (account: Account) => void;   // we're just storing a function thats why it says () => void, with void being its data type honestly dont think too much about it
    removeAccount: (accountId: string) => void;   // also the thing in () is just the parameter u put inside the global provider, ull find it similar
    usernameExists: (username: string) => boolean; // returns true or false

    // Added for reservations
    reservations: Reservation[];
    addReservation: (reservation: Omit<Reservation, 'id' | 'status'>) => void;
    approveReservation: (id: string) => void;
    rejectReservation: (id: string) => void;
    cancelReservation: (id: string) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    /* placeholder format for adding new stuff
    const [tables, setTable] = useState<Table[]>([]);
    const [savedTables, setSavedTables] = useState<Table[]>([]);
    const saveTable = (table: Table) => {
        setSavedTables((previousTables) => {
            if (previousTables.some((savedTable) => savedTable.id === table.id)) return previousTables;
            return [...previousTables, table];
        });
    };

    const removeTable = (tableId: string) => {
        setSavedTables((prevJobs) => prevJobs.filter((table) => table.id !== tableId));
    };
    */

    // LOGIN
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [storedAccounts, setStoredAccounts] = useState<Account[]>([]);

    const addAccount = (username: string, password: string) => {
        const newAccount: Account = {
            id: uuid.v4() as string,
            username: username,
            password: password,
        };
        setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
    };

    const storeAccount = (account: Account) => {
        setStoredAccounts((previousAccounts) => {
            if (previousAccounts.some((savedAccount) => savedAccount.id === account.id)) return previousAccounts;
            return [...previousAccounts, account];
        });
    };

    const removeAccount = (accountId: string) => {
        setStoredAccounts((prevAccounts) => prevAccounts.filter((account) => account.id !== accountId));
    };

    const usernameExists = (username: string): boolean => {
        return accounts.some((account) => account.username === username);
    };

    // RESERVATIONS
        interface Reservation {
        id: string;
        name: string;
        age: string;
        email: string;
        contact: string;
        reason: string;
        date: string;
        time: string;
        status: 'pending' | 'approved' | 'rejected' | 'cancelled';
        }

    const [reservations, setReservations] = useState<Reservation[]>([]);

    const addReservation = (reservation: Omit<Reservation, 'id' | 'status'>) => {
        const newReservation: Reservation = {
            ...reservation,
            id: uuid.v4() as string,
            status: 'pending',
        };
        setReservations((prev) => [...prev, newReservation]);
    };

    const updateReservationStatus = (id: string, status: Reservation['status']) => {
        setReservations((prev) =>
            prev.map((res) => (res.id === id ? { ...res, status } : res))
        );
    };

    const approveReservation = (id: string) => updateReservationStatus(id, 'approved');
    const rejectReservation = (id: string) => updateReservationStatus(id, 'rejected');
    const cancelReservation = (id: string) => updateReservationStatus(id, 'cancelled');

    return (
        <GlobalContext.Provider value={{
            accounts,
            storedAccounts,
            addAccount,
            storeAccount,
            removeAccount,
            usernameExists,

            // Reservations
            reservations,
            addReservation,
            approveReservation,
            rejectReservation,
            cancelReservation,
        }}>
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
