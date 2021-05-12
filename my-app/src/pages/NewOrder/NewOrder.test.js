import React from 'react';
import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewOrder from './NewOrder.jsx';
import Breakfast from '../../components/Products/Breakfast.jsx';


//beforeEach(()=> render (<NewOrder/>));
describe ('NewOrder', ()=>{
    it('must to be Nombre in the document', ()=>{
        render (<NewOrder/>)
        expect(screen.queryByText(/nombre/i)).toBeInTheDocument();

    });
    
});
// jest.mock('fetch');

// describe ('Breakfast', ()=>{
//     it('should show products from an API', async()=>{
//         const products = [
//             {"id": 1,"name": "Café americano", "type": "desayuno"},
//             {"id": 2,"name": "Café con leche","type": "desayuno"},
//             {"id": 3,"name": "Sandwich de jamón y queso","type": "desayuno"},
//             {"id": 4,"name": "Jugo de frutas natural","type": "desayuno"},
//         ];
//         fetch.get.mockImplementation(() => Promise.resolve({ data: {hits: products}})
//         );
//         render (<Breakfast/>);
//         await userEvent.click(screen.getByRole('button'));
//         const items = await screen.findAllByRole('listitem');
//         expect(items).toHaveLength(4);
//         //await getProducts()
//     });
// });
