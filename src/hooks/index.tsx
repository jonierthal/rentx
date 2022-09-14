import React, { ReactNode } from 'react';

import { AuthProvider} from './auth';

interface AppProvider{
    children: ReactNode
}

function AppProvider({ children }: AppProvider) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}

export { AppProvider }