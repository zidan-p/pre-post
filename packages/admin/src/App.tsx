import { Admin, ListGuesser, Resource} from 'react-admin';
import { prepostDataProvider } from './services/prepost-dataprovider';


const prepostURL = import.meta.env.VITE_PREPOST_URL;
console.log(prepostURL);
const mainDataProvider = prepostDataProvider(prepostURL);


export const App = () => (
    <Admin dataProvider={mainDataProvider} >
        <Resource name='posts' list={ListGuesser} />        
        <Resource name='users' list={ListGuesser} />        
    </Admin>
);

    