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

interface GlobalContextProps {
    // User context
    user: Account | null;
    login: (userData: Account) => void;
    logout: () => void;

    // Account context
    accounts: Account[];
    storedAccounts: Account[];
    addAccount: (username: string, email:string, password: string) => void;
    storeAccount: (account: Account) => void;
    removeAccount: (accountId: string) => void;
    usernameExists: (username: string) => boolean;
    emailExists: (email: string) => boolean;

    // Reservation context
    reservations: Reservation[];
    addReservation: (reservation: Omit<Reservation, 'id' | 'status'>, accountId: string) => void;
    approveReservation: (id: string) => void;
    rejectReservation: (id: string) => void;
    cancelReservation: (id: string) => void;
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

    useEffect(() => {
        addAccount("Doctor", "doctor@gmail.com", "admin123");   // this makes a admin :3
        /*
        addAccount("User", "user@gmail.com", "user123");   // this makes a user for mari :3
        const user = accounts.find((a) => (a.email === "user@gmail.com" || a.username == "user@gmail.com") && a.password === "user123");
        login(user);
        */
    });    
    
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

    return (
        <GlobalContext.Provider
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
