import { createContext, useContext, useState, type ReactNode } from 'react';

interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

interface ToastContextType {
    showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
        const id = Math.random().toString(36).substring(7);
        const newToast = { id, message, type };

        setToasts(prev => [...prev, newToast]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div style={{
                position: 'fixed',
                top: '80px',
                right: '20px',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                pointerEvents: 'none'
            }}>
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className="fade-in"
                        style={{
                            background: toast.type === 'success'
                                ? 'linear-gradient(135deg, #10b981, #059669)'
                                : toast.type === 'error'
                                    ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                                    : 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                            color: '#fff',
                            padding: '1rem 1.5rem',
                            borderRadius: '12px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                            minWidth: '300px',
                            maxWidth: '400px',
                            fontWeight: '500',
                            fontSize: '0.95rem',
                            pointerEvents: 'auto'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>
                                {toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}
                            </span>
                            <span>{toast.message}</span>
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
