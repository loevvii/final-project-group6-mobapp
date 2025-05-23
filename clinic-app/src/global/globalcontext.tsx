// globalcontext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import uuid from 'react-native-uuid';

interface Account {
    id: string;
    username: string;
    password: string;
}

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

interface GlobalContextProps {
    accounts: Account[];
    storedAccounts: Account[];
    addAccount: (username: string, password: string) => void;
    storeAccount: (account: Account) => void;
    removeAccount: (accountId: string) => void;
    usernameExists: (username: string) => boolean;

    // Reservation context
    reservations: Reservation[];
    addReservation: (reservation: Omit<Reservation, 'id' | 'status'>) => void;
    approveReservation: (id: string) => void;
    rejectReservation: (id: string) => void;
    cancelReservation: (id: string) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    // Accounts
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [storedAccounts, setStoredAccounts] = useState<Account[]>([]);

    const addAccount = (username: string, password: string) => {
        const newAccount: Account = {
            id: uuid.v4() as string,
            username,
            password,
        };
        setAccounts((prev) => [...prev, newAccount]);
    };

    const storeAccount = (account: Account) => {
        setStoredAccounts((prev) =>
            prev.some((a) => a.id === account.id) ? prev : [...prev, account]
        );
    };

    const removeAccount = (accountId: string) => {
        setStoredAccounts((prev) => prev.filter((a) => a.id !== accountId));
    };

    const usernameExists = (username: string) => {
        return accounts.some((a) => a.username === username);
    };

    // Reservations
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
        <GlobalContext.Provider
            value={{
                accounts,
                storedAccounts,
                addAccount,
                storeAccount,
                removeAccount,
                usernameExists,
                reservations,
                addReservation,
                approveReservation,
                rejectReservation,
                cancelReservation,
            }}
        >
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
