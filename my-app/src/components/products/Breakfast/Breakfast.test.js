import React from 'react';
import {screen, render} from '@testing-library/react';
import Breakfast from './Breakfast.jsx';
import userEvent from '@testing-library/user-event';
import { enableFetchMocks } from 'jest-fetch-mock'

enableFetchMocks()

describe ('Breakfast', ()=>{
  
    it('should show products from an API', async()=>{
        const products = [
            {"id": 1,"name": "Café americano", "type": "desayuno"},
            {"id": 2,"name": "Café con leche","type": "desayuno"},
            {"id": 3,"name": "Sandwich de jamón y queso","type": "desayuno"},
            {"id": 4,"name": "Jugo de frutas natural","type": "desayuno"},
        ];
        fetch.mockResponseOnce(JSON.stringify(products))

        render (<Breakfast/>);
        //await userEvent.click(screen.getByRole('button'));
        // const items = await screen.findAllByRole('listitem');
        expect(fetch.mock.calls.length).toEqual(1)
        //await getProducts()
    });
}); 