import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import server from '../../../backend/mock-server'
import { resetTodos } from '../../../backend/helpers'
import Todo from '../Todo'

jest.setTimeout(750)
const waitForOptions = { timeout: 100 }
const queryOptions = { exact: false }

const renderApp = ui => {
  window.localStorage.clear()
  window.history.pushState({}, 'Test page', '/')
  return render(ui)
}

beforeAll(() => { server.listen() })
afterAll(() => { server.close() })
beforeEach(() => {
  resetTodos()
  renderApp(<Todo />)
})
afterEach(() => {
  server.resetHandlers()
})

describe('Todo component', () => {
  test('can grab todos using fetch', async () => {
    await waitFor(() => {
      expect(screen.getByText(/laundry/, queryOptions)).toBeVisible()
      expect(screen.getByText(/dishes/, queryOptions)).toBeVisible()
      expect(screen.getByText(/groceries/, queryOptions)).toBeVisible()
    }, waitForOptions)
  })

  test('Can mark todo complete using fetch', async () => {
    const user = userEvent.setup()
    await user.click(await screen.findByText(/laundry/, queryOptions, waitForOptions))
    expect(await screen.findByText('laundry ✔️', queryOptions, waitForOptions)).toBeVisible()
  })
})
