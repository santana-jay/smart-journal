import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import HomePage from '../app/page'

vi.mock('@clerk/nextjs', () => {
    // Create an mockedFunctions object to match the functions we are importing from the @nextjs/clerk package in the ClerkComponent component.
    const mockedFunctions = {
        auth: () =>
            new Promise((resolve) =>
                resolve({ userId: 'user_12345654321' })
            ),
        ClerkProvider: ({ children }) => <div>{children}</div>,
        useUser: () => ({
            isSignedIn: true,
            user: {
                id: 'user_12345654321',
                fullName: 'Jay Santana',
            },
        }),
    }

    return mockedFunctions
})

vi.mock('next/font/google', () => {
    return {
        Inter: () => ({ className: 'inter' }),
    }
})

test(`Home`, async () => {
    render(await HomePage())
    expect(screen.getByText('The best Journal app, period.')).toBeTruthy()
})
