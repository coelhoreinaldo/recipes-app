import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithRouter from './helpers/renderWith';
import Provider from '../context/Provider';
import fetchMock from '../../cypress/mocks/fetch.js';
import App from '../App';

const searchTopBtnTestId = 'search-top-btn';
const searchInput = 'search-input';
const searchBtnTestId = 'exec-search-btn';

describe('searchBar component', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });
  it('should filter meals by name tag', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/meals'] },
    );

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    const searchIcon = screen.getByTestId(searchTopBtnTestId);

    expect(searchIcon).toBeInTheDocument();

    userEvent.click(searchIcon);

    const ingredientTag = await screen.findByText(/ingredient/i);
    const nameTag = screen.getByText(/name/i);
    const inputField = screen.getByTestId(searchInput);
    const searchBtn = await screen.findByTestId(searchBtnTestId);
    expect(ingredientTag).toBeInTheDocument();
    expect(nameTag).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    await userEvent.click(nameTag);
    await userEvent.type(inputField, 'soup');
    await userEvent.click(searchBtn);

    const snertImg = await screen.findByRole('img', { name: /snert/i });
    const snertTitle = await screen.findByRole('heading', { name: /snert/i });
    expect(snertImg).toBeInTheDocument();
    expect(snertTitle).toBeInTheDocument();
  });
  it('should filter drinks by ingredient tag', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/drinks'] },
    );

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    userEvent.click(searchIcon);

    const ingredientTag = await screen.findByText(/ingredient/i);
    const inputField = screen.getByTestId(searchInput);
    const searchBtn = await screen.findByTestId(searchBtnTestId);

    await userEvent.click(ingredientTag);
    await userEvent.type(inputField, 'Light rum');
    await userEvent.click(searchBtn);

    const lemonImg = await screen.findByRole('img', { name: /Florida/i });
    const lemonTitle = await screen.findByRole('heading', { name: /Florida/i });
    expect(lemonImg).toBeInTheDocument();
    expect(lemonTitle).toBeInTheDocument();
  });
  it('should not accept input with more than 2 letters with first letter tag', async () => {
    global.alert = vi.fn();
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/drinks'] },
    );

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    userEvent.click(searchIcon);

    const firstLetterTag = await screen.findByText(/first letter/i);
    const inputField = screen.getByTestId(searchInput);

    await userEvent.click(firstLetterTag);
    await userEvent.type(inputField, 'aa');

    expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
  it('should return an error if there are no recipes', async () => {
    global.alert = vi.fn();
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/drinks'] },
    );

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    userEvent.click(searchIcon);

    const ingredientTag = await screen.findByText(/ingredient/i);
    const nameTag = screen.getByText(/name/i);
    const inputField = screen.getByTestId(searchInput);
    const searchBtn = await screen.findByTestId(searchBtnTestId);
    expect(ingredientTag).toBeInTheDocument();
    expect(nameTag).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    await userEvent.click(nameTag);
    await userEvent.type(inputField, 'lalalalaalla');
    await userEvent.click(searchBtn);

    expect(window.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  });
  it('should redirect to details page if exist only one recipe', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/drinks'] },
    );

    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    userEvent.click(searchIcon);

    const ingredientTag = await screen.findByText(/ingredient/i);
    const nameTag = screen.getByText(/name/i);
    const inputField = screen.getByTestId(searchInput);
    const searchBtn = await screen.findByTestId(searchBtnTestId);
    expect(ingredientTag).toBeInTheDocument();
    expect(nameTag).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    await userEvent.click(nameTag);
    await userEvent.type(inputField, 'Aquamarine');
    await userEvent.click(searchBtn);

    expect(await screen.findByRole('heading', { name: /aquamarine/i }));
  });
});
