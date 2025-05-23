// globalcontext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import uuid from 'react-native-uuid';

interface Account {
    id: string;
    email: string;
    username: string;
    password: string;
}

interface Reservation {
    id: string;
    accId: string;
    name: string;
    age: string;
    email: string;
    contact: string;
    reason: string;
    date: string;
    time: string;
    status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'completed' | 'missed';
}

interface Availability {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
}

interface GlobalContextProps {
    // User context
    user: Account | null;
    login: (userData: Account) => void;
    logout: () => void;

    // Account context
    accounts: Account[];
    storedAccounts: Account[];
    addAccount: (username: string, email: string, password: string) => void;
    storeAccount: (account: Account) => void;
    removeAccount: (accountId: string) => void;
    usernameExists: (username: string) => boolean;
    emailExists: (email: string) => boolean;

    // Reservation context
    reservations: Reservation[];
    addReservation: (reservation: Omit<Reservation, 'id' | 'status'>, accountId: string) => void;
    updateReservation: (updatedReservation: Reservation) => void;
    approveReservation: (id: string) => void;
    completeReservation: (id: string) => void;
    rejectReservation: (id: string) => void;
    cancelReservation: (id: string) => void;

    // Availability context
    availability: Availability[];
    addAvailability: (date: string, startTime: string, endTime: string) => void;
    removeAvailability: (id: string) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    // Accounts
    const [user, setUser] = useState<Account | null>(null);
    const login = (userData: Account) => setUser(userData);
    const logout = () => setUser(null);

    const [accounts, setAccounts] = useState<Account[]>([]);
    const [storedAccounts, setStoredAccounts] = useState<Account[]>([]);

    const addAccount = (username: string, email: string, password: string) => {
        const newAccount: Account = {
            id: uuid.v4() as string,
            email,
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

    const emailExists = (email: string) => {
        return accounts.some((a) => a.email === email);
    };

    // Reservations
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const addReservation = (reservation: Omit<Reservation, 'id' | 'status'>, accountId: string | null) => {
        const newReservation: Reservation = {
            ...reservation,
            id: uuid.v4() as string,
            accId: accountId,
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
        const completeReservation = (id: string) => updateReservationStatus(id, 'completed');
    const updateReservation = (updatedReservation: Reservation) => {
        setReservations((prev) =>
            prev.map((res) =>
                res.id === updatedReservation.id ? { ...res, ...updatedReservation } : res
            )
        );
    };
    // Availability
    const [availability, setAvailability] = useState<Availability[]>([]);

    const addAvailability = (date: string, startTime: string, endTime: string) => {
        const newAvailability: Availability = {
            id: uuid.v4() as string,
            date,
            startTime,
            endTime,
        };
        setAvailability((prev) => [...prev, newAvailability]);
    };

    const removeAvailability = (id: string) => {
        setAvailability((prev) => prev.filter((a) => a.id !== id));
    };
    return (
        <GlobalContext.Provider // man whered all the global context go?  my global context shaped belly:
            value={{
                user,
                login,
                logout,
                accounts,
                storedAccounts,
                addAccount,
                storeAccount,
                removeAccount,
                usernameExists,
                emailExists,
                reservations,
                addReservation,
                updateReservation,
                approveReservation,
                rejectReservation,
                completeReservation,
                cancelReservation,
                availability,
                addAvailability,
                removeAvailability,
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
