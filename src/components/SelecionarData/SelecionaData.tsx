import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DatePickerContextData {
    selectedDate: Date;
    currentMonth: Date;
    setSelectedDate(date: Date): void;
    setCurrentMounth(date: Date): void;
}

interface DatePickerProviderProps {
    children: ReactNode;
}

const DatePickerContext = createContext<DatePickerContextData>(
    {} as DatePickerContextData
);

export const DatePickerProvider: React.FC<DatePickerProviderProps> = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMounth] = useState(new Date());

    return (
        <DatePickerContext.Provider
            value={{ selectedDate, currentMonth, setSelectedDate, setCurrentMounth }}
        >
            {children}
        </DatePickerContext.Provider>
    );
};

export const useDatePicker = (): DatePickerContextData => {
    const context = useContext(DatePickerContext);

    return context;
};
